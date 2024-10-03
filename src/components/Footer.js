import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 가져오기
import './Footer.css';

function Footer() {
  return (
    <footer className="App-footer">
      {/* Link를 사용하여 홈 버튼을 메인 홈으로 연결 */}
      <Link to="/" className="footer-menu">홈</Link>
      <div className="footer-menu">채팅</div>
      <div className="footer-menu">글쓰기</div>
      <div className="footer-menu">마이페이지</div>
    </footer>
  );
}

export default Footer;
