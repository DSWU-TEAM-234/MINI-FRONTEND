import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home'; // 메인 페이지
import AgencyPage from './components/AgencyPage'; // 대리 페이지
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryDetail from './components/CategoryDetail';

function Layout() {
  const location = useLocation(); // 현재 경로를 확인
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      {/* 헤더는 메인 페이지와 대리 페이지에서만 표시 */}
      {(location.pathname === '/' || location.pathname === '/agency') && <Header openSidebar={openSidebar} />}
      
      {/* 사이드바 추가 (메인 페이지와 대리 페이지에서도 표시됨) */}
      {(location.pathname === '/' || location.pathname === '/agency') && (
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        )}


      <Routes>
        {/* 메인 홈 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 대리 페이지 */}
        <Route path="/agency" element={<AgencyPage />} />
        <Route path="/category/:categoryName" element={<CategoryDetail />} /> {/* 카테고리 상세 페이지 경로 */}
      </Routes>
      
      {/* 푸터는 모든 페이지에 표시 */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
