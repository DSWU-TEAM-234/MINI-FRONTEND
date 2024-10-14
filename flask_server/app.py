from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
import time
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 접근을 허용
app.secret_key = "your_secret_key_here"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def mainHome():
    """
    메인 홈페이지를 렌더링합니다.

    Returns:
        str: 렌더링된 mainHome.html 템플릿
    """
    return render_template("mainHome.html")


@socketio.on("connect")
def handle_connect():
    """
    클라이언트 연결 시 호출되는 이벤트 핸들러입니다.
    """
    print("Client connected")


@socketio.on("disconnect")
def handle_disconnect():
    """
    클라이언트 연결 해제 시 호출되는 이벤트 핸들러입니다.
    """
    print("Client disconnected")


@socketio.on("join")
def on_join(data):
    """
    클라이언트가 채팅방에 참여할 때 호출되는 이벤트 핸들러입니다.

    Args:
        data (dict): 클라이언트로부터 받은 데이터. 'room' 키를 포함해야 합니다.
    """
    room = data["room"]
    join_room(room)
    emit("status", {"msg": f"User has joined the room: {room}"}, room=room)


@socketio.on("leave")
def on_leave(data):
    """
    클라이언트가 채팅방을 나갈 때 호출되는 이벤트 핸들러입니다.

    Args:
        data (dict): 클라이언트로부터 받은 데이터. 'room' 키를 포함해야 합니다.
    """
    room = data["room"]
    leave_room(room)
    emit("status", {"msg": f"User has left the room: {room}"}, room=room)


@socketio.on("chat")
def handle_chat(data):
    """
    채팅 메시지를 처리하는 이벤트 핸들러입니다.

    Args:
        data (dict): 클라이언트로부터 받은 데이터. 'room', 'message', 'from' 키를 포함해야 합니다.
    """
    room = data["room"]
    message = data["message"]
    from_id = data["from"]
    emit("chat", {"type": "chat", "message": message, "from": from_id}, room=room)
    print(data)


@socketio.on("location")
def handle_location(data):
    """
    위치 정보를 처리하는 이벤트 핸들러입니다.

    Args:
        data (dict): 클라이언트로부터 받은 데이터. 'room', 'location', 'from' 키를 포함해야 합니다.
    """
    room = data["room"]
    location = data["location"]
    from_id = data["from"]
    emit(
        "location",
        {"type": "location", "location": location, "from": from_id},
        room=room,
    )


@socketio.on("real_time_location")
def handle_real_time_location(data):
    """
    실시간 위치 정보를 처리하는 이벤트 핸들러입니다.

    Args:
        data (dict): 클라이언트로부터 받은 데이터. 'room', 'location', 'from' 키를 포함해야 합니다.
    """
    room = data["room"]
    location = data["location"]
    from_id = data["from"]
    timestamp = int(time.time() * 1000)  # 현재 시간을 밀리초로 변환
    emit(
        "real_time_location",
        {
            "type": "real_time_location",
            "location": location,
            "from": from_id,
            "timestamp": timestamp,
        },
        room=room,
        include_self=False,  # 자신을 제외한 다른 클라이언트에게만 전송
    )




# 데이터베이스 연결 설정
def get_db_connection():
    connection = mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='root',
        database='miniProject'
    )
    return connection

# 대학 목록을 가져오는 API
@app.route('/api/universities', methods=['GET'])
def get_universities():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT university_classification FROM users")
    universities = cursor.fetchall()  # 데이터 가져오기
    print(universities)  # 터미널에 출력하여 데이터 확인
    print(f"Fetched universities: {universities}")
    cursor.close()
    connection.close()
    return jsonify([univ[0] for univ in universities])  # JSON 응답으로 반환


if __name__ == "__main__":
    socketio.run(app, port=5000, debug=True)

