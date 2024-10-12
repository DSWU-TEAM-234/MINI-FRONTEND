import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './components/Home';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';

import Chat from './components/Chat';

import Write from './components/Write'; //이미지,제목,카테고리,가격,설명,거래방식,작성시각
// import Post from './components/Post';  글수정?
// import PostDetail from './components/PostDetail';  //거래상태,찜개수
// import PostList from './components/PostList';

import MyPage from './components/MyPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';  //사진,닉네임,대학뱃지
import Wishlist from './components/Wishlist';
import TransactionHistory from './components/TransactionHistory';
// import  MyPostList from './components/MyPostList';  //

// import  from './components/';

import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // 헤더를 숨길 경로 목록
    const hideHeaderPaths = ['/chat','/write', '/mypage'];
    
    // 현재 경로가 동적 경로인지 확인
    const isPostDetail = location.pathname.startsWith('/posts/') && location.pathname.split('/').length === 3;

    setHideHeader(hideHeaderPaths.includes(location.pathname) || isPostDetail);
    setHideFooter(isPostDetail); // PostDetail 페이지에서 푸터 숨기기
  }, [location]);

  return (
    <div className="App">
      {/* 헤더가 숨겨질 경로인지 확인 */}
      {!hideHeader && <Header openSidebar={openSidebar} />}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} /> 

        <Route path="/chat" element={<Chat />} />

        <Route path="/write" element={<Write />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />        
        <Route path="/profile" element={<Profile />} />        
        <Route path="/wishlist" element={<Wishlist />} />        
        <Route path="/ransactionHistory" element={<TransactionHistory />} />        
      </Routes>
      
      {/* 푸터가 숨겨질 경로인지 확인 */}
      {!hideFooter && <Footer />}
    </div>
  );
}

// Router를 App 컴포넌트의 최상위에서 사용할 수 있도록 수정
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
