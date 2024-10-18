import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // useAuth 훅 사용
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProxyPurchasePage from './components/ProxyPurchasePage';
import CategoryDetail from './components/CategoryDetail';
import ChatPage from './components/ChatPage';
import WritePage from './components/WritePage';
import MyPage from './components/MyPage';
import ChatRoom from './components/ChatRoom';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import DressUpGame from './components/DressUpGame';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
// import MyBookmarkedPosts from './components/MyBookmarkedPosts';
import TransactionHistory from './components/TransactionHistory';
import MyPosts from './components/MyPosts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useAuth(); // useAuth 훅 사용
  const [selectedUniversity, setSelectedUniversity] = useState('덕성여자대학교');
  const [mainPageColor, setMainPageColor] = useState('#8b2842');
  const [postData, setPostData] = useState([]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const hideFooter = location.pathname.startsWith('/chat/') || location.pathname === '/dress-up-game' || location.pathname.startsWith('/post_detail/');

  return (
    <div className="App">
      {(location.pathname === '/' || location.pathname === '/ProxyPurchase') && (
        <>
          <Header openSidebar={openSidebar} university={selectedUniversity} mainPageColor={mainPageColor} />
          <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} setSelectedUniversity={setSelectedUniversity} setMainPageColor={setMainPageColor} setPostData={setPostData} />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home mainPageColor={mainPageColor} selectedUniversity={selectedUniversity} postData={postData} setPostData={setPostData} setSelectedUniversity={setSelectedUniversity} />} />
        <Route path="/ProxyPurchase" element={<ProxyPurchasePage selectedUniversity={selectedUniversity} postData={postData} setPostData={setPostData} />} />
        <Route path="/ProxyPurchase/category/:categoryName" element={<CategoryDetail postType={"대리구매"} selectedUniversity={selectedUniversity} postData={postData} setPostData={setPostData} />} />
        <Route path="/category/:categoryName" element={<CategoryDetail postType={"중고거래"} selectedUniversity={selectedUniversity} postData={postData} setPostData={setPostData} />} />
        <Route path="/chat" element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/writepage" element={isLoggedIn ? <WritePage /> : <Navigate to="/login" />} />
        <Route path="/mypage" element={isLoggedIn ? <MyPage handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/chat/:chatRoomId" element={isLoggedIn ? <ChatRoom /> : <Navigate to="/login" />} />
        <Route path="/posts" element={<Posts postData={postData} />} />
        <Route path="/post_detail/:id" element={<PostDetail />} />
        <Route path="/dress-up-game" element={<DressUpGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        {/* <Route path="/bookmarked_posts" element={isLoggedIn ? <MyBookmarkedPosts /> : <Navigate to="/login" />} /> */}
        <Route path="/myposts" element={isLoggedIn ? <MyPosts /> : <Navigate to="/login" />} />
        <Route path="/transactionHistory" element={isLoggedIn ? <TransactionHistory /> : <Navigate to="/login" />} />
      </Routes>

      {!hideFooter && <Footer mainPageColor={mainPageColor} />}
    </div>
  );
}

export default App;
