import React from 'react';
import './LikeButton.css'; // 필요한 스타일 파일

function LikeButton({ isLiked, handleLike }) {
  return (
    <button className="like-button" onClick={handleLike}>
      {isLiked ? '❤️' : '🤍'}
    </button>
  );
}

export default LikeButton;
