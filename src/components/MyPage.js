import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css';
import Profile from './Profile';

function MyPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout'); // 로그아웃 요청
      localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 삭제
      navigate('/login'); // 로그인 페이지로 리다이렉션
      alert('로그아웃되었습니다.'); // 로그아웃 알림
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.'); // 오류 알림
    }
  };

  return (
    <div className="mypage-container">
      <div className="button-container">
        {user ? (
          <>
            {/* 로그인된 경우 프로필 컴포넌트를 보여줍니다. */}
            <Profile user={user} />
            <button onClick={handleLogout} className="mypage-button">로그아웃</button>
          </>
        ) : (
          // 로그인되지 않은 경우 로그인/회원가입 버튼을 보여줍니다.
          <Link to="/login" className="mypage-button">로그인/회원가입</Link>
        )}
        <Link to="/wishlist" className="mypage-button">찜목록</Link>
        <Link to="/order-history" className="mypage-button">거래내역</Link>
        <Link to="/myposts" className="mypage-button">내가 쓴 글</Link>
      </div>
    </div>
  );
}

export default MyPage;
