import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="App-footer">
      <Link to="/" className="footer-menu">홈</Link>
      <Link to="/chat" className="footer-menu">채팅</Link>
      <Link to="/write" className="footer-menu">글쓰기</Link>
      <Link to="/mypage" className="footer-menu">마이페이지</Link>
    </footer>
  );
}

export default Footer;
