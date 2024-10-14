import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import LikeButton from './LikeButton';
import Profile from './Profile'; // Profile 컴포넌트 임포트
import './PostDetail.css';

const postsData = {
  1: {
    title: '중고 아이폰 11',
    category: '전자기기',
    description: '좋은 상태의 중고 아이폰 11입니다. 배터리 교체 완료.',
    price: '300,000원',
    image: 'https://via.placeholder.com/400',
    user: {
      profileImage: 'https://via.placeholder.com/50',
      nickname: '사용자123',
    },
  },
  2: {
    title: '중고 노트북',
    category: '전자기기',
    description: '상태 좋은 중고 노트북입니다.',
    price: '500,000원',
    image: 'https://via.placeholder.com/400',
    user: {
      profileImage: 'https://via.placeholder.com/50',
      nickname: '사용자456',
    },
  },
  // 다른 포스트 데이터 추가...
};




function PostDetail() {
  const { id } = useParams();
  const postDetails = postsData[id]; // ID에 따라 데이터 가져오기
  const [isLiked, setIsLiked] = useState(false); // 찜하기 상태 관리

  if (!postDetails) {
    return <div>포스트를 찾을 수 없습니다.</div>; // 포스트가 없는 경우 처리
  }

  const handleLike = () => {
    setIsLiked(!isLiked); // 찜하기 상태 토글
  };

  return (
    <div className="post-detail-container">
      <BackButton />
      <img src={postDetails.image} alt={postDetails.title} className="post-image" />
      
      {/* Profile 컴포넌트 추가 */}
      <Profile user={postDetails.user} setUser={() => {}} />

      <h2 className="post-title">{postDetails.title}</h2>
      <p className="post-category">카테고리: {postDetails.category}</p>
      <p className="post-description">{postDetails.description}</p>

      <div className="footer">
        <LikeButton isLiked={isLiked} handleLike={handleLike} />
        <span className="price">{postDetails.price}</span>
        <button className="chat-button">채팅하기</button>
      </div>
    </div>
  );
}

export default PostDetail;
