import React from 'react';

function Sidebar({ isSidebarOpen, closeSidebar }) {
  return (
    <>
      {isSidebarOpen && (
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
      )}
    </>
  );
}

export default Sidebar;

