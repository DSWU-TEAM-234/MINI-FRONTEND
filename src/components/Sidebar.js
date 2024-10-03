import React from 'react';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, closeSidebar }) {
  // 사이드바 외부 클릭 시 닫기
  const handleClickOutside = (e) => {
    if (e.target.className === 'sidebar-background') {
      closeSidebar(); // 사이드바 닫기
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-background" onClick={handleClickOutside}>
          <div className="sidebar">
            <div className="sidebar-header">
              <input type="text" placeholder="대학교 검색" className="search-input" />
              <div className="close-icon" onClick={closeSidebar}>X</div>
            </div>
            <ul className="sidebar-menu">
              <li>서울대학교</li>
              <li>연세대학교</li>
              <li>고려대학교</li>
              <li>한양대학교</li>
              <li>서강대학교</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;