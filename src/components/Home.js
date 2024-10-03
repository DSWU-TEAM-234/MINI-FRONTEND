import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Categories from './Categories';
import './Home.css';
import PopularPosts from './PopularPosts';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="Home">
      {/* Header는 App.js에서 렌더링되므로 제거 */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="banner">
        <h2>배너</h2>
      </div>
      <Categories />
      <PopularPosts />
      {/* Footer는 유지 */}
      <Footer />
    </div>
  );
}

export default Home;
