from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 접근을 허용

# 데이터베이스 연결 및 API 정의 부분은 그대로 유지



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

@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({"message": "CORS is working!"})

if __name__ == '__main__':
    app.run(port=5001)

