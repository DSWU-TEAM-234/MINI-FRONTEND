import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import

function Header({ openSidebar }) {
  const [activeTab, setActiveTab] = useState('중고'); // 기본값을 '중고'로 설정

  const handleClick = (tab) => {
    setActiveTab(tab); // 클릭된 버튼을 active로 설정
  };

  return (
    <header className="App-header">
      <div className="navbar">
        <div className="menu-icon" onClick={openSidebar}>☰</div>
        <div className="app-name">앱 이름</div>
        <div className="search-icon" aria-label="검색">🔍</div>
      </div>
      <div className="links">
        {/* 중고 버튼 클릭 시 홈 화면으로 이동 */}
        <Link to="/" className={activeTab === '중고' ? 'active' : ''} onClick={() => handleClick('중고')}>
          중고
        </Link>
        {/* 대리 버튼 클릭 시 대리구매 페이지로 이동 */}
        <Link to="/대리구매" className={activeTab === '대리' ? 'active' : ''} onClick={() => handleClick('대리')}>
          대리
        </Link>
        {/* 00대학교 오른쪽으로 이동 */}
        <div className="right-section">
          <span>00대학교</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
