from flask import Flask, request, render_template, redirect, url_for, session, jsonify, g, send_from_directory
import pymysql
from datetime import timedelta
import os
import uuid
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from datetime import datetime
import gevent
import gevent.monkey

gevent.monkey.patch_all()


app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
app.secret_key = 'your_secret_key_here'
socketio = SocketIO(app, cors_allowed_origins="*")

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)  # 세션 지속 시간 설정

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# 파일 이름에 점('.')이 있고, 확장자가 허용된 확장자 목록(ALLOWED_EXTENSIONS)에 포함되는지 확인하는 함수
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def connect_to_db():
    return psycopg2.connect(
        host='127.0.0.1',
        user='postgres',
        password='postgres',
        database='miniProjects',
        cursor_factory=RealDictCursor
    )


# 요청이 시작될 때 DB 연결 설정
@app.before_request
def before_request():
    if 'db_connection' not in g:
        g.db_connection = connect_to_db()
        print("데이터베이스 연결에 성공했습니다.")



# 요청이 끝날 때 DB 연결 종료
@app.teardown_request
def teardown_request(exception):
    db_connection = getattr(g, 'db_connection', None)
    if db_connection is not None:
        db_connection.close()
        print("DB 연결 종료")

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)


# 처음으로 로드될 중고거래 홈 라우트
@app.route('/', methods=['GET', 'POST'])
def view_mainHome():
    print("------------------------------")
    print("중고거래 홈 라우트 실행")
    
    # 세션에서 university_name 가져오기
    university_name = session.get('university_name')
    
    # 세션에 university_name이 없거나 "외부인"일 경우, 덕성여자대학교 관련 게시글 정보를 넘기기위해 "덕성여자대학교"로 지정함
    if not university_name or university_name == "외부인":
        university_name = "덕성여자대학교"
    
    try:
        
        with g.db_connection.cursor() as cursor:
            # users 테이블과 posts 테이블을 조인하여 해당 대학교의 사용자들이 작성한 중고거래 게시글 가져오기
            sql = """
                SELECT posts.*
                FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE users.university_classification = %s
        AND posts.post_type = '중고거래'
    """
            cursor.execute(sql, (university_name,))
            posts = cursor.fetchall()
            
            print("-----------------------------")
            print(university_name)
            print(posts)            

            # 게시글 정보를 반환
            # university_name(메인홈에 로드할 대학교 이름), posts(해당 대학교 회원이 작성한 게시글 정보)
            # university_name과 posts 데이터를 JSON 형식으로 반환
            return jsonify({
            'university_name': university_name,
            'posts': posts
            })

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 처음으로 로드될 대리구매 홈 라우트
@app.route('/ProxyPurchasePage', methods=['GET', 'POST'])
def ProxyPurchasePage():
    print("------------------------------")
    print("대리구매 홈 라우트 실행")
    
    # 세션에서 university_name 가져오기
    university_name = session.get('university_name')
    
    # 세션에 university_name이 없거나 "외부인"일 경우, 덕성여자대학교 관련 게시글 정보를 넘기기위해 "덕성여자대학교"로 지정함
    if not university_name or university_name == "외부인":
        university_name = "덕성여자대학교"
    
    try:
        with g.db_connection.cursor() as cursor:
            # users 테이블과 posts 테이블을 조인하여 해당 대학교의 사용자들이 작성한 중고거래 게시글 가져오기
            sql = """
                SELECT posts.*
                FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE users.university_classification = %s
        AND posts.post_type = '대리구매'
    """
            cursor.execute(sql, (university_name,))
            posts = cursor.fetchall()
            
            print("-----------------------------")
            print(university_name)
            print(posts)            

            # 게시글 정보를 반환
            # university_name(메인홈에 로드할 대학교 이름), posts(해당 대학교 회원이 작성한 게시글 정보)
            # university_name과 posts 데이터를 JSON 형식으로 반환
            return jsonify({
            'university_name': university_name,
            'posts': posts
            })

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 메인 홈의 대학교 선택 필터에 DB에 등록된 대학 목록을 띄우기 위해 university_name 정보를 가져오기
@app.route('/get_university_list', methods=['GET', 'POST'])
def get_university_list():
    try:
        with g.db_connection.cursor() as cursor:
            sql_get_university_name = """
            SELECT university_name FROM university_and_logo
        """
            cursor.execute(sql_get_university_name)
            university_names_list = cursor.fetchall()  # 결과를 가져옴
            
            # university_name 필드만 추출하여 리스트로 변환
            university_names = [row['university_name'] for row in university_names_list]
        
            print(university_names)
            
            return jsonify({
            'university_names': university_names
            })
                
    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "정보를 가져오는 중 오류가 발생했습니다."}), 500



# 회원가입 라우트
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    print("------------------------------")
    print("회원가입 라우트 실행")
    
    if request.method == 'POST':
        # 폼 데이터 가져오기
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        nick_name = request.form['nick_name']
        university_classification = request.form['university_classification']
        
        # 필수 필드에 대한 None 체크
        if not name or not email or not password or not nick_name:
            error_message = "필수 입력 필드가 누락되었습니다. 모든 필드를 입력해주세요."
            return render_template('signup.html', error_message=error_message)
        
        # 비밀번호 해싱 처리
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        profile_image = request.files.get('profile_image')  # 한 장의 프로필 이미지 파일
        
        # 프로필 이미지 파일 저장
        if profile_image and allowed_file(profile_image.filename):
            # 고유한 파일 이름 생성
            unique_filename = f"{uuid.uuid4().hex}_{profile_image.filename}"
            img_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            profile_image.save(img_path)
            profile_image_path = img_path
        else:
            profile_image_path = None
        
        # 데이터베이스에 회원 정보 저장
        try:
            # 데이터베이스 연결이 없는 경우 예외 처리
            with g.db_connection.cursor() as cursor:
                # 이메일 중복 확인
                sql_check_email = "SELECT * FROM users WHERE email = %s"
                cursor.execute(sql_check_email, (email,))
                email_exists = cursor.fetchone()

                # 닉네임 중복 확인
                sql_check_nick_name = "SELECT * FROM users WHERE nick_name = %s"
                cursor.execute(sql_check_nick_name, (nick_name,))
                nick_name_exists = cursor.fetchone()
                
                # 중복된 이메일 또는 닉네임이 있을 경우
                if email_exists:
                    message = "이미 등록된 이메일입니다."
                    return jsonify({
                'message': message
                })
                elif nick_name_exists:
                    message = "이미 사용 중인 닉네임입니다."
                    return jsonify({
                'message': message
                })
                
                # university_classification이 None이 아닐 경우에만 university_and_logo 테이블에 중복 확인 및 저장
                if university_classification:
                    sql_check_university = "SELECT university_name FROM university_and_logo WHERE university_name = %s"
                    cursor.execute(sql_check_university, (university_classification,))
                    university_exists = cursor.fetchone()

                    # 존재하지 않으면 university_and_logo 테이블에 대학교 이름 저장
                    if not university_exists:
                        sql_insert_university_name = """
                            INSERT INTO university_and_logo (university_name) VALUES (%s)
                        """
                        cursor.execute(sql_insert_university_name, (university_classification,))
                        g.db_connection.commit()  # 변경 사항 저장
                
                # 데이터 삽입 SQL 쿼리 (중복이 없는 경우)
                sql_insert_user = """
                    INSERT INTO users (name, email, password, nick_name, university_classification, profile_image)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql_insert_user, (name, email, hashed_password, nick_name, university_classification, profile_image_path))
                g.db_connection.commit()  # 변경 사항 저장
                
                # 회원가입 성공 시 홈 페이지로 리다이렉트하며 플래그 전달
                return jsonify({"message": "회원가입 성공"}), 201
    
        except pymysql.MySQLError as e:
            print(f"Error: {e}")
            return jsonify({"message": "회원가입 실패"}), 500

# 로그인 라우트
@app.route('/login', methods=['GET', 'POST'])
def login():
    print("------------------------------")
    print("로그인 라우트 실행")
    
    if request.method == 'POST':
        # JSON 형식으로 데이터 가져오기
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "이메일과 비밀번호를 입력하세요."}), 400
        
        try:
            with g.db_connection.cursor() as cursor:
                # 사용자가 입력한 이메일이 DB에 존재하는지 확인
                sql = "SELECT * FROM users WHERE email = %s"
                cursor.execute(sql, (email,))
                user = cursor.fetchone()
                print(user)  # 해당 이메일로 등록된 사용자 정보 가져오기

                if not user:
                    return jsonify({"message": "등록된 사용자 정보가 없습니다."}), 404
                
                # 비밀번호 해싱 비교
                if bcrypt.check_password_hash(user['password'], password):
                    # 로그인 성공
                    session['user_id'] = user['id']
                    session['user_nickName'] = user['nick_name']
                    session['profile_image'] = user['profile_image']
                    # session['is_accepted'] = user['university_classification'] if user['isAccepted'] == "인증" else "외부인"
                    session['university_name'] = user['university_classification']

                    # 로그인 성공 시
                    return jsonify({
                        'message': "로그인 성공",
                        'user_id': session['user_id'],
                        'user_nickName': session['user_nickName'],
                        'profile_image': session['profile_image'],
                        'university_name': session['university_name'],
                    }), 200
                    
                else:
                    return jsonify({"message": "비밀번호가 틀렸습니다. 다시 입력해주세요."}), 400

        except pymysql.MySQLError as e:
            print(f"Error: {e}")
            return jsonify({"message": "로그인 중 오류가 발생했습니다."}), 500

    return jsonify({"message": "로그인 페이지에 오신 것을 환영합니다."}), 200

# 로그아웃 라우트
@app.route('/logout', methods=['POST'])
def logout():
    print("------------------------------")
    print("로그아웃 라우트 실행")
    
    # 세션 정보 삭제
    session.pop('user_id', None)
    session.pop('user_nickName', None)
    session.pop('university_name', None)
    session.pop('university_logo', None)
    
    # 로그아웃 완료 메시지 반환
    return jsonify({"message": "로그아웃되었습니다."})

##

# 글 작성 처리 라우트 (공통 라우트)
@app.route('/write_post', methods=['GET', 'POST'])
def write_post():
        print("------------------------------")
        print("글 작성 라우트 실행")
        # 세션에서 user_id 및 user_nickName 정보 가져오기
        user_id = session.get('user_id')
        user_nickName = session.get('user_nickName')

        print(user_id)
        print(user_nickName)

        # 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
        if not user_id or not user_nickName:
            return jsonify({"message": "로그인 후 이용 가능합니다."})

        # 폼 데이터 가져오기
        post_type = request.form.get('post_type')
        title = request.form.get('title')
        category = request.form.get('category')
        price = request.form.get('price')
        content = request.form.get('content')
        deal_method = request.form.get('deal_method')
        image = request.files.getlist('image')  # 이미지 파일 목록
        
        # 필수 필드에 대한 None 체크
        if not post_type or not title or not category or not price or not deal_method or not image:
            error_message = "필수 입력 필드가 누락되었습니다. 모든 필드를 입력해주세요."
            return render_template('signup.html', error_message=error_message)
    
        # 이미지 파일 저장
        image_paths = []
        for img in image:
            if img and allowed_file(img.filename):
                print(img.filename)
                unique_filename = f"{uuid.uuid4().hex}_{img.filename}"
                img_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
                img.save(img_path)
                image_paths.append(img_path)
            else:
                print("허용되지 않는 파일 형식입니다.")

        image_str = ','.join(image_paths) if image_paths else None
        print(image_str)
    
        # 데이터베이스에 게시글 저장
        try:
            with g.db_connection.cursor() as cursor:
                # 데이터 삽입 SQL 쿼리
                # 이미지 파일 이름을 문자열로 변환
                sql = """
                    INSERT INTO posts (user_nickName, title, category, content, deal_method, price, image, post_type, user_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (user_nickName, title, category, content, deal_method, price, image_str, post_type, user_id))
                g.db_connection.commit()  # 변경 사항 저장
                
                print("저장완료")
                
                # 방금 작성한 게시글의 id 가져오기
                post_id = cursor.lastrowid  
                return jsonify({"message": "게시글 작성 완료!", "post_id": post_id}), 201
                
  
                
        except pymysql.MySQLError as e:
            print(f"Error: {e}")
            return jsonify({"message": "게시글 등록 실패"}), 500


# 게시글 수정 처리 라우트
@app.route('/update_post/<int:post_id>', methods=['GET', 'POST'])
def update_post(post_id):
        print("------------------------------")
        print("글 수정 라우트 실행")
        
        # 세션에서 user_id 가져오기
        user_id = session.get('user_id')
        
        # 세션에 user_id가 없으면 로그인 페이지로 리다이렉트
        if not user_id:
            return jsonify({"message": "로그인 후 이용 가능합니다."})
        
        # 폼 데이터 가져오기
        title = request.form.get('title')
        category = request.form.get('category')
        price = request.form.get('price')
        content = request.form.get('content')
        deal_method = request.form.get('deal_method')
        new_images = request.files.getlist('image')  # 이미지 파일 목록
        
        try:
            with g.db_connection.cursor() as cursor:
                # 기존 이미지 경로 가져오기
                sql = "SELECT image FROM posts WHERE id = %s AND user_id = %s"
                cursor.execute(sql, (post_id, user_id))
                result = cursor.fetchone()

                if result:
                    # 기존 이미지 경로를 리스트로 분리
                    existing_image_paths = result['image'].split(',') if result['image'] else []

                    # 기존 이미지 파일 삭제
                    for img_path in existing_image_paths:
                        if os.path.exists(img_path):
                            os.remove(img_path)

                    # 새로운 이미지 저장
                    new_image_paths = []
                    for img in new_images:
                        if img:
                            # 고유한 파일 이름 생성
                            unique_filename = f"{uuid.uuid4().hex}_{img.filename}"
                            img_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
                            img.save(img_path)
                            new_image_paths.append(img_path)
                        
                    # 새 이미지 경로를 문자열로 변환
                    image_str = ','.join(new_image_paths) if new_image_paths else None

                    # 데이터베이스 업데이트
                    update_sql = """
                        UPDATE posts SET title = %s, category = %s, content = %s,
                        deal_method = %s, price = %s, image = %s
                        WHERE id = %s AND user_id = %s
                    """
                    cursor.execute(update_sql, (title, category, content, deal_method, price, image_str, post_id, user_id))
                    g.db_connection.commit()
                    
                    # 수정 완료 후 해당 게시글 상세 페이지로 리다이렉트
                    return redirect(url_for('post_detail', post_id=post_id))
                        
        except pymysql.MySQLError as e:
            print(f"Error: {e}")
            return jsonify({"message": "게시글 수정 실패"}), 500


# 게시글 삭제 처리 라우트
@app.route('/delete_post/<int:post_id>', methods=['GET', 'POST'])
def delete_post(post_id):
    print("------------------------------")
    print("글 삭제 라우트 실행")
    
    # 세션이 없으면 로그인 페이지로 리다이렉트
    if not session:
        return jsonify({"message": "로그인 후 이용 가능합니다."})

    try:
        with g.db_connection.cursor() as cursor:
            # 삭제할 게시글의 이미지 경로 가져오기
            sql_select = "SELECT image FROM posts WHERE id = %s"
            cursor.execute(sql_select, (post_id,))
            result = cursor.fetchone()

            if result and result['image']:
                # 이미지 경로 문자열을 리스트로 변환
                image_paths = result['image'].split(',')

                # 서버에서 이미지 파일 삭제
                for img_path in image_paths:
                    if os.path.exists(img_path):
                        os.remove(img_path)
                        print(f"{img_path} 삭제 완료")
                    else:
                        print(f"{img_path} 파일을 찾을 수 없습니다.")
        
            # 데이터베이스에서 게시글 삭제
            sql_delete = "DELETE FROM posts WHERE id = %s"
            cursor.execute(sql_delete, (post_id,))
            g.db_connection.commit()  # 변경 사항 저장
            print(f"게시글 {post_id} 삭제 완료")
            
            # 삭제 완료 후 메인 페이지로 리다이렉트
            return jsonify({"message": "게시글 삭제 성공"}), 201
            
    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글 삭제 실패"}), 500


# 게시글 상세 보기 처리 라우트
@app.route('/post_detail/<int:post_id>', methods=['GET', 'POST'])
def post_detail(post_id):
    print("------------------------------")
    print("게시글 상세 보기 라우트 실행")

    try:
        with g.db_connection.cursor() as cursor:
            # post 테이블에서 특정 post_id에 따른 게시글 정보 가져오기
            sql = "SELECT * FROM posts WHERE id = %s"
            cursor.execute(sql, (post_id,))
            post = cursor.fetchone()
            
            print(post)
            print("\n")

            # 게시글 정보를 post_detail.html로 전달하여 렌더링
            return jsonify({
            'post': post
            })

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 중고거래 홈에서 특정 학교 필터 선택 시 해당 학교 관련 중고거래 게시글 정보 넘겨주는 라우트
@app.route('/posts_by_university_name/<string:university_name>', methods=['GET', 'POST'])
def posts_by_university_name(university_name):
    print("------------------------------")
    print("중고거래 홈에서 특정 학교 기반 중고거래 게시글 정보 전달 라우트 실행")
    
    try:
        with g.db_connection.cursor() as cursor:
            # users 테이블과 posts 테이블을 조인하여 해당 대학교의 사용자들이 작성한 게시글 가져오기
            sql = """
                SELECT posts.*
                FROM posts
                JOIN users ON posts.user_id = users.id
                WHERE users.university_classification = %s
                AND posts.post_type = '중고거래'
            """
            cursor.execute(sql, (university_name,))
            posts = cursor.fetchall()
            
            print("-----------------------------")
            print(posts)
            print("\n")

            # 게시글 정보를 반환
            return jsonify({
            'posts': posts
            })

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500
    

# 대리구매 홈에서 특정 학교 필터 선택 시 해당 학교 관련 대리구매 게시글 정보 넘겨주는 라우트
@app.route('/ProxyPurchase_posts_by_university_name/<string:university_name>', methods=['GET', 'POST'])
def ProxyPurchase_posts_by_university_name(university_name):
    print("------------------------------")
    print("대리구매 홈에서 특정 학교 기반 대리구매 게시글 정보 전달 라우트 실행")
    
    try:
        with g.db_connection.cursor() as cursor:
            # users 테이블과 posts 테이블을 조인하여 해당 대학교의 사용자들이 작성한 게시글 가져오기
            sql = """
                SELECT posts.*
                FROM posts
                JOIN users ON posts.user_id = users.id
                WHERE users.university_classification = %s
                AND posts.post_type = '대리구매'
            """
            cursor.execute(sql, (university_name,))
            posts = cursor.fetchall()
            
            print("-----------------------------")
            print(posts)
            print("\n")

            # 게시글 정보를 반환
            return jsonify({
            'posts': posts
            })

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 특정 카테고리 선택 시 해당 카테고리 및 대학 관련 게시글 정보 넘겨주는 라우트
@app.route('/posts_by_category/<string:university_name>/<string:category>', methods=['GET', 'POST'])
def posts_by_category(university_name, category):
    print("------------------------------")
    print("특정 카테고리 및 대학교 기반 게시글 정보 전달 라우트 실행")
    
    try:
        with g.db_connection.cursor() as cursor:
            # users 테이블과 posts 테이블을 조인하여, 특정 대학교의 사용자들이 작성한 특정 카테고리의 게시글 가져오기
            sql = """
                SELECT posts.*
                FROM posts
                JOIN users ON posts.user_id = users.id
                WHERE users.university_classification = %s AND posts.category = %s
            """
            cursor.execute(sql, (university_name, category))
            posts = cursor.fetchall()
            print(posts)

            # 게시글 정보를 반환
            return jsonify(posts=posts), 200

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 마이페이지 이동 시 로그인 된 사용자의 중고거래 및 대리구매 글, 찜한 게시글 정보 넘기는 라우트
@app.route('/MyPage', methods=['GET', 'POST'])
def MyPage():
    print("------------------------------")
    print("마이페이지 라우트 실행")
    
    # 세션에서 user_id 정보 가져오기
    user_id = session.get('user_id')
    
    # 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    if not user_id:
        return jsonify({"message": "로그인 후 이용 가능합니다."})

    try:
        with g.db_connection.cursor() as cursor:
            # posts 테이블에서 user_id에 따른 모든 중고거래 게시글 가져오기
            sql = "SELECT * FROM posts WHERE user_id = %s AND post_type = '중고거래'"
            cursor.execute(sql, (user_id,))
            posts = cursor.fetchall()
            
            # posts 테이블에서 user_id에 따른 모든 대리구매 게시글 가져오기
            sql = "SELECT * FROM posts WHERE user_id = %s AND post_type = '대리구매'"
            cursor.execute(sql, (user_id,))
            ProxyPurchase_posts = cursor.fetchall()
            
            # users 테이블에서 user_id에 따른 bookmarked_posts 필드 가져오기
            sql = "SELECT bookmarked_posts FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchone()
            
            # bookmarked_posts 필드에서 찜한 게시글의 ID 목록을 가져와 posts 테이블에서 해당 게시글들 조회
            bookmarked_posts = result['bookmarked_posts'] if result else None
            bookmarked_post_data = []
            if bookmarked_posts:
                post_ids = bookmarked_posts.split(',')  # 찜한 게시글 ID들을 리스트로 변환
                if post_ids:
                    # 찜한 게시글의 ID들을 이용해 posts 테이블에서 해당 게시글들 가져오기
                    sql = "SELECT * FROM posts WHERE id IN (%s)" % ','.join(['%s'] * len(post_ids))
                    cursor.execute(sql, post_ids)
                    bookmarked_post_data = cursor.fetchall()
            
            # 결과 출력 (디버깅 용도)
            print("-----------------------------")
            print("Posts:", posts)
            print("\n")
            print("-----------------------------")
            print("ProxyPurchase_posts:", ProxyPurchase_posts)
            print("\n")
            print("-----------------------------")
            print("Bookmarked Posts:", bookmarked_post_data)
            print("\n")

            # 마이페이지로 작성한 글과 찜한 글 정보를 넘김
            return jsonify({
            'posts': posts,
            'ProxyPurchase_posts' : ProxyPurchase_posts,
            'bookmarked_post_data' : bookmarked_post_data
            })
            
    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중에 오류가 발생했습니다."}), 500


# 자신이 작성한 중고거래 또는 대리구매 글 자세히 보기 페이지 이동 시 로그인 된 사용자의 중고거래 및 대리구매 정보 넘기는 라우트
@app.route('/MyPosts/<string:post_type>', methods=['GET', 'POST'])
def MyPosts(post_type):
    print("------------------------------")
    print("자신이 작성한 중고거래 또는 대리구매 글 정보 전달 라우트 실행")
    
    # 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    if not session:
        return jsonify({"message": "로그인 후 이용 가능합니다."})
        
    try:
        with g.db_connection.cursor() as cursor:
            # posts 테이블에서 post_type 따른 모든 게시글(중고거래 및 대리구매) 가져오기
            sql = "SELECT * FROM posts WHERE post_type = %s"
            cursor.execute(sql, (post_type,))
            created_posts = cursor.fetchall()
            
            # 결과 출력 (디버깅 용도)
            print("-----------------------------")
            print("Created Posts:", created_posts)
            print("\n")

            # 중고거래 및 대리구매 상세 페이지로 작성한 글과 찜한 글 정보를 넘김
            return jsonify(created_posts = created_posts)

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 로그인 된 사용자가 찜한 게시글 정보 넘기는 라우트
@app.route('/My_bookmarked_posts', methods=['GET', 'POST'])
def My_bookmarked_posts():
    print("------------------------------")
    print("로그인 된 사용자가 찜한 게시글 정보 넘기는 라우트 실행")
    
    # 세션에서 user_id 정보 가져오기
    user_id = session.get('user_id')
    
    # 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    if not user_id:
        return jsonify({"message": "로그인 후 이용 가능합니다."})
    
    try:
        with g.db_connection.cursor() as cursor:
            # users 테이블에서 user_id에 따른 bookmarked_posts 필드 가져오기
            sql = "SELECT bookmarked_posts FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchone()
            
            # bookmarked_posts 필드에서 찜한 게시글의 ID 목록을 가져와 posts 테이블에서 해당 게시글들 조회
            bookmarked_posts = result['bookmarked_posts'] if result else None
            bookmarked_post_data = []
            if bookmarked_posts:
                post_ids = bookmarked_posts.split(',')  # 찜한 게시글 ID들을 리스트로 변환
                if post_ids:
                    # 찜한 게시글의 ID들을 이용해 posts 테이블에서 해당 게시글들 가져오기
                    sql = "SELECT * FROM posts WHERE id IN (%s)" % ','.join(['%s'] * len(post_ids))
                    cursor.execute(sql, post_ids)
                    bookmarked_post_data = cursor.fetchall()
            
            # 결과 출력 (디버깅 용도)
            print("-----------------------------")
            print("Bookmarked Posts:", bookmarked_post_data)
            print("\n")

            # 마이페이지로 작성한 글과 찜한 글 정보를 넘김
            return jsonify(bookmarked_posts=bookmarked_post_data)

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "게시글을 가져오는 중 오류가 발생했습니다."}), 500


# 찜 처리 라우트
@app.route('/bookmark/<int:post_id>', methods=['GET', 'POST'])
def bookmark(post_id):
    print("------------------------------")
    print("찜 처리 라우트 실행")
    
    # 세션에서 user_id 가져오기
    user_id = session.get('user_id')
    
    # 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    if not user_id:
        return jsonify({"message": "로그인 후 이용 가능합니다."})
    
    try:
        with g.db_connection.cursor() as cursor:
            # 1. users 테이블에서 user_id에 따른 bookmarked_posts 정보 가져오기
            sql_get_bookmarked_posts = "SELECT bookmarked_posts FROM users WHERE id = %s"
            cursor.execute(sql_get_bookmarked_posts, (user_id,))
            result = cursor.fetchone()
            if result:
                bookmarked_posts = result['bookmarked_posts']
                
                # 2. bookmarked_posts에 현재 post_id가 이미 있는지 확인
                if bookmarked_posts and str(post_id) in bookmarked_posts.split(','):
                    return jsonify(message = "이미 찜 한 게시글입니다.")
                
                # 3. 찜하지 않은 경우 post_id를 bookmarked_posts에 추가
                if bookmarked_posts:
                    updated_bookmarked_posts = f"{bookmarked_posts},{post_id}"
                else:
                    updated_bookmarked_posts = str(post_id)
                
                # users 테이블의 bookmarked_posts 업데이트
                sql_update_bookmarked_posts = "UPDATE users SET bookmarked_posts = %s WHERE id = %s"
                cursor.execute(sql_update_bookmarked_posts, (updated_bookmarked_posts, user_id))

                # 4. posts 테이블에서 해당 post_id의 bookmarked_count 필드 값 증가
                sql_update_bookmark_count = "UPDATE posts SET bookmarked_count = bookmarked_count + 1 WHERE id = %s"
                cursor.execute(sql_update_bookmark_count, (post_id,))
                g.db_connection.commit()
                return jsonify(message = "찜 되었습니다.")
            else:
                return jsonify(message = "사용자를 찾을 수 없습니다.")

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "찜 처리에 실패했습니다."}), 500

# 찜 취소 처리 라우트
@app.route('/cancle_bookmark/<int:post_id>', methods=['GET', 'POST'])
def cancle_bookmark(post_id):
    print("------------------------------")
    print("찜 취소 라우트 실행")
    
    # 세션에서 user_id 가져오기
    user_id = session.get('user_id')
    
    # 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    if not user_id:
        return jsonify({"message": "로그인 후 이용 가능합니다."})
    
    try:
        with g.db_connection.cursor() as cursor:
            # 1. users 테이블에서 user_id에 따른 bookmarked_posts 정보 가져오기
            sql_get_bookmarked_posts = "SELECT bookmarked_posts FROM users WHERE id = %s"
            cursor.execute(sql_get_bookmarked_posts, (user_id,))
            result = cursor.fetchone()
            
            if result:
                bookmarked_posts = result['bookmarked_posts']
                
                # 2. bookmarked_posts에 현재 post_id가 있는지 확인 (찜한 게시물인지)
                if bookmarked_posts and str(post_id) in bookmarked_posts.split(','):
                    # 3. post_id를 bookmarked_posts에서 제거
                    updated_bookmarked_posts = ','.join([p for p in bookmarked_posts.split(',') if p != str(post_id)])
                    
                    # users 테이블의 bookmarked_posts 업데이트
                    sql_update_bookmarked_posts = "UPDATE users SET bookmarked_posts = %s WHERE id = %s"
                    cursor.execute(sql_update_bookmarked_posts, (updated_bookmarked_posts, user_id))

                    # 4. posts 테이블에서 해당 post_id의 bookmarked_count 필드 값 감소
                    sql_update_bookmark_count = "UPDATE posts SET bookmarked_count = bookmarked_count - 1 WHERE id = %s"
                    cursor.execute(sql_update_bookmark_count, (post_id,))
                    
                    g.db_connection.commit()
                    return jsonify({"message": "찜 취소 성공"}), 201
            else:
                return jsonify({"message": "사용자를 찾을 수 없습니다."}), 400

    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "찜 취소를 실패했습니다."}), 500


# 대학별 굿즈 정보 가져오는 라우트
@app.route('/get_goods_by_university/<string:university_name>', methods=['GET', 'POST'])
def get_goods_by_university(university_name):
    print("------------------------------")
    print("대학별 굿즈 정보 가져오는 라우트 실행")
    
    try:
        with g.db_connection.cursor() as cursor:
            # goods 테이블에서 university_name에 따른 굿즈 정보 가져오기
            sql_get_goods = "SELECT * FROM goods WHERE university = %s"
            cursor.execute(sql_get_goods, (university_name,))
            goods_list = cursor.fetchall()
            return jsonify(goods_list=goods_list)
            
    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return jsonify({"message": "굿즈 정보를 가져올 수 없습니다."}), 500

# 특정 채팅방의 메시지 가져오기 API
# 용도: 특정 채팅방 눌렀을 때 해당 채팅방의 대화내역 불러옴. 
@app.route('/<int:chat_id>', methods=['GET'])
def get_messages(chat_id):
    db_connection = connect_to_db()
    cursor = db_connection.cursor()
    
    # messages = Messages.query.filter_by(chat_id=chat_id).all()

    # result = [{
    #     'id': msg.id,
    #     'sender_id': msg.sender_id,
    #     'message_text': msg.message_text,
    #     'message_type': msg.message_type,
    #     'created_at': msg.created_at,
    #     'is_read': msg.is_read
    # } for msg in messages]

    # return jsonify(result), 200
    query = "SELECT * FROM messages WHERE chat_id = %s"
    cursor.execute(query, (chat_id,))
    messages = cursor.fetchall()

    result = [{
        'id': msg['id'],
        'sender_id': msg['sender_id'],
        'message_text': msg['message_text'],
        'message_type': msg['message_type'],
        'created_at': msg['created_at'],
        'is_read': msg['is_read']
    } for msg in messages]

    db_connection.close()

    return jsonify(result), 200


# 사용자가 포함되어있는 채팅방 불러오는 API 
# 용도: [글쓰기] 메뉴탭 클릭 시 채팅방 사용자가 포함되어있는 채팅방 목록 보여야된다. 
@app.route('/chat/list/<int:user_id>', methods=['GET'])
def get_chattingRooms(user_id):
    # # 해당 유저가 속한 채팅방 목록 조회
    # chat_including_member = ChatMember.query.filter_by(user_id=user_id).all()
    
    # # 채팅방 id 뽑아내기
    # chat_rooms = []
    # for member in chat_including_member:
    #   chat_room = ChatRoom.query.get(member.chat_id)
    #   if chat_room:
    #     chat_rooms.append({
    #       'chat_id': chat_room.id,
    #       'name': chat_room.name,
    #     })

    # return jsonify(chat_rooms), 200

    # 데이터베이스 연결
    db_connection = connect_to_db()
    cursor = db_connection.cursor()

    # SQL 쿼리문 작성 (user_id가 포함된 채팅방 조회)
    query = """
        SELECT chat_room.id AS chat_id, chat_room.name AS chat_name, users.id AS user_id, users.nick_name
        FROM chat_member
        JOIN chat_room ON chat_member.chat_id = chat_room.id
        JOIN users ON chat_member.user_id = users.id
        WHERE chat_member.chat_id IN (
            SELECT chat_id 
            FROM chat_member 
            WHERE user_id = %s
        ) AND users.id != %s
    """
    
    # 메세지를 보내기 전까지는 채팅방 생성을 하먄 안되는거같은디..
    # [채팅하기] 버튼 클릭
    # 이때는 DB에 저장을 하지는 말고
    # 메세지를 보내면 chat_room
    # 쿼리 실행
    cursor.execute(query, (user_id, user_id))
    
    # 결과 가져오기
    chat_rooms = cursor.fetchall()

    cursor.close()
    db_connection.close()
    
    # JSON 응답 생성
    result = []
    for chat_room in chat_rooms:
        result.append({
            'chat_id': chat_room['chat_id'],
            'name': chat_room['chat_name'],
            'included_user_id': chat_room['user_id'],
            'included_nickname': chat_room['nick_name']
        })

    return jsonify(result), 200

# @app.route('/chat_members/<int:chat_id>', methods=['GET'])
# def get_chat_members(chat_id):
#     # 데이터베이스 연결
#     db_connection = connect_to_db()
#     cursor = db_connection.cursor()

#     # SQL 쿼리문 작성
#     query = """
#         SELECT 
#             users.id AS user_id, 
#             users.nick_name, 
#             chat_room.name AS chat_room_name
#         FROM chat_member
#         JOIN users ON chat_member.user_id = users.id
#         JOIN chat_room ON chat_member.chat_id = chat_room.id
#         WHERE chat_member.chat_id = %s
#     """
    
#     # 쿼리 실행
#     cursor.execute(query, (chat_id))
    
#     # 결과 가져오기
#     members = cursor.fetchall()

#     cursor.close()
#     db_connection.close()

#     # JSON 응답 생성
#     result = []
#     for member in members:
#         result.append({
#             'user_id': member['user_id'],
#             'user_nickName': member['nick_name'],
#             'chat_room_name': member['chat_room_name']  # 추가: 채팅방 이름
#         })

#     return jsonify(result), 200

      
@socketio.on("connect")
def handle_connect():
    """
    클라이언트 연결 시 호출
    """
    print("Client connected")
    emit('ping', {'data': 'ping'}, broadcast=True)

@socketio.on('pong')
def handle_pong():
    print("Pong received from client")

@socketio.on("disconnect")
def handle_disconnect():
    """
    클라이언트 연결 해제 시 호출
    """
    print("Client disconnected")

# [채팅하기] 버튼 클릭
# 일단 채팅방 생성 API 호출
# ChatRoom 으로 넘어가기 + join 호출로 방 생성. 
# 해당 글의 사용자 userId를 가지고 들어가야한다. 
# room_name을 그 글쓴이 이름으로 들고 들거야될듯
# 자동으로 채팅방에 join 되어야할 듯


@socketio.on("join")
def on_join(data):
    room_name = data["room"]
    user_id = data["user_id"]

    print("join 때 들어온 값 확인", room_name, user_id)

    # TODO: user_id 나중에 토큰(?)에 저장된 값으로 불러오게 변경. 
    # user_id = session.get('user_id')
    # user_id = 3

    # # 1. 채팅방이 존재하는지 확인
    # chat_room = ChatRoom.query.filter_by(name=room_name).first()

    # # 2. 채팅방이 없으면 새로 생성
    # if not chat_room:
    #     chat_room = ChatRoom(name=room_name)  # 필요에 따라 is_group 설정
    #     db.session.add(chat_room)
    #     db.session.commit()

    # # 3. 사용자가 이미 이 방에 참여했는지 확인
    # chat_member = ChatMember.query.filter_by(chat_id=chat_room.id, user_id=1).first()

    # # 4. 참여X -> ChatMember 테이블에 추가
    # if not chat_member:
    #     chat_member = ChatMember(chat_id=chat_room.id, user_id=user_id)
    #     db.session.add(chat_member)
    #     db.session.commit()

    # # 5. 클라이언트를 소켓 채팅방에 참여시킴
    # join_room(room_name)

    # # 6. 클라이언트에게 알림 전송
    # # TODO: user_id -> 로그인된 유저 id OR 닉네임 불러오기
    # emit("status", {"msg": f"User {user_id} has joined the room: {room_name}"}, room=room_name)
    # 데이터베이스 연결
    db_connection = connect_to_db()
    cursor = db_connection.cursor()

    # 1. 채팅방이 존재하는지 확인
    check_chat_room_query = """
        SELECT id FROM chat_room WHERE name = %s
    """
    cursor.execute(check_chat_room_query, (room_name,))
    chat_room = cursor.fetchone()

    # 2. 채팅방이 없으면 새로 생성
    if not chat_room:
        create_chat_room_query = """
            INSERT INTO chat_room (name) VALUES (%s) RETURNING id
        """
        cursor.execute(create_chat_room_query, (room_name,))
        db_connection.commit()
        chat_room = cursor.fetchone()

    chat_room_id = chat_room['id']

    # 3. 사용자가 이미 이 방에 참여했는지 확인
    check_chat_member_query = """
        SELECT id FROM chat_member WHERE chat_id = %s AND user_id = %s
    """
    cursor.execute(check_chat_member_query, (chat_room_id, user_id))
    chat_member = cursor.fetchone()

    # 4. 참여하지 않았으면 ChatMember 테이블에 추가
    if not chat_member:
        insert_chat_member_query = """
            INSERT INTO chat_member (chat_id, user_id) VALUES (%s, %s)
        """
        cursor.execute(insert_chat_member_query, (chat_room_id, user_id))
        db_connection.commit()

    # 5. 클라이언트를 소켓 채팅방에 참여시킴
    join_room(room_name)

    # 6. 클라이언트에게 알림 전송
    emit("status", {"msg": f"User {user_id} has joined the room: {room_name}"}, room=room_name)

    # 데이터베이스 연결 해제
    cursor.close()
    db_connection.close()



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
    # TODO: 항목 수정 필요
    # TODO: 나중에 로그인까지 합쳐서 senderid 알아서 저장되게 해야될 듯. 
    # data["from"]은.. 소켓 아이디..? 있어야하나?

    # user_id = session.get('user_id')
    # if user_id is None:
    #   print("User ID is not found in the session")
    #   return  # 또는 적절한 에러 처리
    # user_id = 3

    room_name = data["room"]  # 클라이언트로부터 받은 room (이름)
    message = data["message"]
    user_id = data.get("from")

    print("chat 소켓 값 확인: ", room_name)
    print("user_id 값 확인: ", user_id)

    # # 채팅방 이름(room_name)을 바탕으로 DB에서 chat_id 조회
    # chat_room = ChatRoom.query.filter_by(name=room_name).first()

    # if chat_room:
    #     chat_id = chat_room.id  # chat_id를 얻음
    # else:
    #     # 해당 room이 없을 경우 처리 (예: 에러 메시지 반환)
    #     print("채팅방을 찾을 수 없습니다.")
    #     return

    # # 메시지를 DB에 저장
    # message = Messages(
    #     # TODO: 채팅방 id, 발신자 id 나중에 자동으로 불러와지게 해야됨.
    #     chat_id=chat_id,
    #     sender_id=user_id,
    #     message_text=message,
    #     message_type='text',  # 메시지 유형 (예: 텍스트)
    #     created_at=datetime.now()
    # )
    # db.session.add(message)
    # db.session.commit()

    # # json 타입으로 직렬화하기 
    # message_data = {
    #     "type": "chat",
    #     "message": message.message_text,  
    #     "from": from_id,
    #     "created_at": message.created_at.strftime('%Y-%m-%d %H:%M:%S') 
    # }

    # # 클라이언트로 메시지 전송
    # emit("chat", message_data, room=room_name)
    # print(data)
    # 데이터베이스 연결
    db_connection = connect_to_db()
    cursor = db_connection.cursor()

    # 채팅방 이름(room_name)을 바탕으로 DB에서 chat_id 조회
    check_chat_room_query = """
        SELECT id FROM chat_room WHERE name = %s
    """
    cursor.execute(check_chat_room_query, (room_name,))
    chat_room = cursor.fetchone()

    if chat_room:
        chat_id = chat_room['id']  # chat_id를 얻음
    else:
        # 해당 room이 없을 경우 처리 (예: 에러 메시지 반환)
        print("채팅방을 찾을 수 없습니다.")
        cursor.close()
        db_connection.close()
        return

    # 메시지를 DB에 저장
    insert_message_query = """
        INSERT INTO messages (chat_id, sender_id, message_text, message_type, created_at)
        VALUES (%s, %s, %s, %s, %s) RETURNING id
    """
    cursor.execute(insert_message_query, (chat_id, user_id, message, 'text', datetime.now()))
    db_connection.commit()
    
    # 새로 저장된 메시지 ID 가져오기
    message_id= cursor.fetchone()['id']

    # json 타입으로 직렬화하기 
    message_data = {
        "type": "chat",
        "message": message,
        "from": user_id,
        "created_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),  # 현재 시간
        "message_id": message_id  # 메시지 ID 추가
    }

    # 클라이언트로 메시지 전송
    emit("chat", message_data, room=room_name)
    print(data)

    # 데이터베이스 연결 해제
    cursor.close()
    db_connection.close()

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
    print(f"Received real_time_location from {from_id} with location {location}")

    if not from_id:
        print("Error: 'from' field is missing in data")
        return
        
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

# 아바타 뿌려주는 웹소켓 작성해야하겠지?
# 그냥 따로 여기다가 만들어주는게 나을 듯
@socketio.on("send_avatar_custom")
def handle_send_avatar_custom(data):
    """
    아바타 이미지 보내는 이벤트 핸들러입니다.

    Args:
        data (dict): 클라이언트로부터 받은 데이터. 'room', 'location', 'from' 키를 포함해야 합니다.
    """

    room = data['room']
    image_data = data['imageData']
    sender = data['from']  # 보낸 사람 정보

    emit(
        "send_avatar_custom",
        {
          'imageData': image_data,
          'from': sender,
          'type': 'avatar',  # type 필드 추가
        },
        room=room,
        # include_self=False,  # 자신을 제외한 다른 클라이언트에게만 전송
    )
    print(data)
  

if __name__ == "__main__":
    socketio.run(app, debug=True)
    app.run(debug=True)