import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css';
import Profile from './Profile';
import { useAuth } from '../context/AuthContext'; // AuthContext 사용

function MyPage() {
  const navigate = useNavigate();
  const { user, handleLogout: contextHandleLogout } = useAuth(); // Context에서 사용자 정보와 로그아웃 함수 가져오기

  const handleLogoutClick = async () => {
    try {
      // await axios.post('http://localhost:5000/logout'); // 로그아웃 요청
      // localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 삭제
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true }); // 로그아웃 요청
      contextHandleLogout(); // Context의 로그아웃 함수 호출
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
            <button onClick={handleLogoutClick} className="mypage-button">로그아웃</button>
          </>
        ) : (
          // 로그인되지 않은 경우 로그인/회원가입 버튼을 보여줍니다.
          <Link to="/login" className="mypage-button">로그인/회원가입</Link>
        )}
        <Link to="/order-history" className="mypage-button">거래내역</Link>
        <Link to="/myposts" className="mypage-button">내가 쓴 글</Link>
      </div>
    </div>
  );
}

export default MyPage;

