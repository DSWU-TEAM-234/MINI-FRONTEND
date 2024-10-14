import React from 'react';
import { Link } from 'react-router-dom'; // 리액트 라우터 사용
import './Posts.css';


function Posts({postData}) {

  if (!postData || postData.length === 0) {
    return <p>게시물이 없습니다.</p>;
  }

  if (!Array.isArray(postData)) {
    console.error('postData is not an array:', postData);
    return <p>게시물이 없습니다.</p>;
  }

  return (
    <div className="posts-container">
      {postData.map(postData => (
        <Link to={`/posts/${postData.id}`} key={postData.id} className="post-link">
          <div className="post-card">
            <img src={postData.image} alt={postData.title} className="post-image" />
            <h3 className="post-title">{postData.title}</h3>
            <p className="post-price">{postData.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;


