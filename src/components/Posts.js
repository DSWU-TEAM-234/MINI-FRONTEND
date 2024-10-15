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
      {postData.map(post => {
        // 각 postData의 image를 서버의 도메인과 함께 절대 경로로 변환
        const imageUrl = `http://localhost:5000/static/${post.image}`;

        return (
          <Link to={`/posts/${post.id}`} key={post.id} className="post-link">
            <div className="post-card">
              {/* 동적으로 생성된 imageUrl을 사용하여 이미지 표시 */}
              <img src={imageUrl} alt={post.title} className="post-image" />
              <h3 className="post-title">{post.title}</h3>
              <p className="post-price">{post.price}</p>
            </div>
          </Link>
        );
      })}
</div>
  );
}

export default Posts;


