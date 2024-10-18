import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css';
import Profile from './Profile';
import { useAuth } from '../context/AuthContext';

function MyPage() {
  const navigate = useNavigate();
  const { user, handleLogout: contextHandleLogout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [proxyPurchasePosts, setProxyPurchasePosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 각 게시글 목록의 보이기/숨기기 상태를 관리
  const [showPosts, setShowPosts] = useState({
    posts: false,
    proxyPurchasePosts: false,
    bookmarkedPosts: false,
  });

  const handleLogoutClick = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      contextHandleLogout();
      navigate('/login');
      alert('로그아웃되었습니다.');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/MyPage', { withCredentials: true });
        setPosts(response.data.posts);
        setProxyPurchasePosts(response.data.ProxyPurchase_posts);
        setBookmarkedPosts(response.data.bookmarked_post_data);
      } catch (err) {
        setError('마이페이지 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyPageData();
    }
  }, [user]);

  const togglePosts = (section) => {
    setShowPosts((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="mypage-container">
      <div className="mypage-button-container">
            <Profile user={user} />           
      </div>
      <h4 className="mypage-section-title" onClick={() => togglePosts('posts')}>
        중고거래 게시글 {showPosts.posts ? '▲' : '▼'}
      </h4>
      {showPosts.posts && (
        <ul className="mypage-post-list">
          {posts.map(post => (
            <li key={post.id} className="mypage-post-item">
              <Link to={`/post_detail/${post.id}`} className="mypage-post-link">{post.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <h4 className="mypage-section-title" onClick={() => togglePosts('proxyPurchasePosts')}>
        대리구매 게시글 {showPosts.proxyPurchasePosts ? '▲' : '▼'}
      </h4>
      {showPosts.proxyPurchasePosts && (
        <ul className="mypage-post-list">
          {proxyPurchasePosts.map(post => (
            <li key={post.id} className="mypage-post-item">
              <Link to={`/post_detail/${post.id}`} className="mypage-post-link">{post.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <h4 className="mypage-section-title" onClick={() => togglePosts('bookmarkedPosts')}>
        찜한 게시글 {showPosts.bookmarkedPosts ? '▲' : '▼'}
      </h4>
      {showPosts.bookmarkedPosts && (
        <ul className="mypage-post-list">
          {bookmarkedPosts.map(post => (
            <li key={post.id} className="mypage-post-item">
              <Link to={`/post_detail/${post.id}`} className="mypage-post-link">{post.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {user && (
        <button onClick={handleLogoutClick} className="mypage-logout-button">로그아웃</button>
      )}
    </div>
  );
}

export default MyPage;
