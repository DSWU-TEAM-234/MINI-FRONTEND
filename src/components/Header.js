import React, { useState } from 'react';

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
        <div className="search-icon">🔍</div>
      </div>
      <div className="links">
        {/* 중고 버튼 기본적으로 밑줄 표시 */}
        <span
          className={activeTab === '중고' ? 'active' : ''}
          onClick={() => handleClick('중고')}
        >
          중고
        </span>
        {/* 대리 버튼 클릭 시 밑줄 표시 */}
        <span
          className={activeTab === '대리' ? 'active' : ''}
          onClick={() => handleClick('대리')}
        >
          대리
        </span>
        {/* 00대학교 오른쪽으로 이동 */}
        <div className="right-section">
          <span>00대학교</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
