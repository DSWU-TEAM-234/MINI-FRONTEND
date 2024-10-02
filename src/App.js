import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PopularPosts from './components/PopularPosts'; // PopularPosts 컴포넌트 불러오기
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      <Header openSidebar={openSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="banner">
        <h2>배너</h2>
      </div>
      <div className="category">
        <h3>카테고리</h3>
      </div>
      <PopularPosts /> {/* 인기글 섹션 추가 */}
      <Footer />
    </div>
  );
}

export default App;
