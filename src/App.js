import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CategoryDetail from './components/CategoryDetail'; // 카테고리 상세 페이지 컴포넌트

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 홈 페이지 */}
        <Route path="/" element={<Home />} />
        
        {/* 카테고리 상세 페이지 */}
        <Route path="/category/:categoryName" element={<CategoryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
