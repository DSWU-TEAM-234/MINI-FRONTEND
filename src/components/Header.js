import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ openSidebar }) {  // props로 openSidebar 함수 받음
  const [activeTab, setActiveTab] = useState('중고'); // 기본값을 '중고'로 설정

  const handleClick = (tab) => {
    setActiveTab(tab); // 클릭된 버튼을 active로 설정
  };

  return (
    <header className="App-header">
      <div className="navbar">
        <div className="menu-icon" onClick={openSidebar}>☰</div> {/* props로 받은 openSidebar 사용 */}
        <div className="app-name">앱 이름</div>
        <div className="search-icon">🔍</div>
      </div>
      <div className="links">
        <Link
          to="/"
          className={activeTab === '중고' ? 'active' : ''}
          onClick={() => handleClick('중고')}
        >
          중고
        </Link>

        <Link
          to="/ProxyPurchase"
          className={activeTab === '대리' ? 'active' : ''}
          onClick={() => handleClick('대리')}
        >
          대리
        </Link>

        <div className="right-section">
          <span>00대학교</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
