import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ openSidebar, university,mainPageColor }) {  // props로 openSidebar 함수 받음
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState('중고'); // 기본값을 '중고'로 설정

  const handleClick = (tab) => {
    setActiveTab(tab); // 클릭된 버튼을 active로 설정
  };


//eslint-disable-line no-unused-vars
  return (
    <header className="App-header"  style={{ backgroundColor: mainPageColor }}>
      <div className="navbar">
        <div className="menu-icon" onClick={openSidebar}>☰</div> {/* props로 받은 openSidebar 사용 */}
        <div className="app-name"> 유니굿즈</div>
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
          <span>{university}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
