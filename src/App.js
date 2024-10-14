import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './global.css';
import Home from './components/Home'; // 메인 페이지
import ProxyPurchasePage from './components/ProxyPurchasePage'; // 대리 페이지
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryDetail from './components/CategoryDetail';
import ChatPage from './components/ChatPage'; // 채팅 상세 페이지
import WritePage from './components/WritePage'; // 글쓰기 상세 페이지
import MyPage from './components/MyPage'; // 마이페이지 상세 페이지
import ChatRoom from './components/ChatRoom'; // 이전 ChatDetailPage를 ChatRoom으로 수정
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import DressUpGame from './components/DressUpGame';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import TransactionHistory from './components/TransactionHistory';
// import  MyPostList from './components/MyPostList';  

function Layout() {
  const location = useLocation(); // 현재 경로를 확인
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

   // 푸터를 숨겨야 하는 조건 (채팅방 상세 페이지 또는 DressUpGame 페이지)
  const hideFooter = location.pathname.startsWith('/chat/') || location.pathname === '/dress-up-game';

  const [selectedUniversity, setSelectedUniversity] = useState('덕성여자대학교');  // 선택된 대학
  const [mainPageColor, setMainPageColor] = useState('#8b2842');  // 메인 페이지 색상




  return (
    <div className="App">
      {/* 헤더는 메인 페이지와 대리 페이지에서만 표시 */}
      {(location.pathname === '/' || location.pathname === '/ProxyPurchase') && <Header openSidebar={openSidebar} university={selectedUniversity} mainPageColor={mainPageColor} />}
      
      {/* 사이드바 (메인 페이지와 대리 페이지에서도 표시됨) */}
      {(location.pathname === '/' || location.pathname === '/ProxyPurchase') && (
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} setSelectedUniversity={setSelectedUniversity} setMainPageColor={setMainPageColor}/>
        )}


      <Routes>
        {/* 메인 홈 페이지 */}
        <Route path="/" element={<Home mainPageColor={mainPageColor} selectedUniversity={selectedUniversity}/>} />
        {/* 대리 페이지 */}
        <Route path="/ProxyPurchase" element={<ProxyPurchasePage />} />

        <Route path="ProxyPurchase/category/:categoryName" element={<CategoryDetail postType={"대리구매"}/>} /> {/* 카테고리 상세 페이지 경로 */}
        <Route path="/category/:categoryName" element={<CategoryDetail postType={"중고거래"} />} /> {/* 카테고리 상세 페이지 경로 */}
        <Route path="/chat" element={<ChatPage />} /> {/* 채팅 상세 페이지 경로 */}
        <Route path="/write" element={<WritePage />} /> {/* 글쓰기 상세 페이지 경로 */}
        <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 상세 페이지 경로 */}

        <Route path="/chat/:chatRoomId" element={<ChatRoom />} /> {/* 채팅방 상세 페이지 경로 */}
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} /> {/* 게시글 상세 페이지 */}
        <Route path="/dress-up-game" element={<DressUpGame />} /> {/* DressUpGame 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />        
        <Route path="/profile" element={<Profile />} />        
        <Route path="/wishlist" element={<Wishlist />} />        
        <Route path="/ransactionHistory" element={<TransactionHistory />} />
      </Routes>
      
      {/* 채팅방 상세 페이지에서는 푸터 숨김 */}
      {!hideFooter && <Footer mainPageColor={mainPageColor} />}
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
