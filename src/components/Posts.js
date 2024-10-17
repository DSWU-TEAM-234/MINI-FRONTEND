import React from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

function Posts({ postData }) {
    // 게시물이 없거나 데이터가 유효하지 않은 경우 처리
    if (!Array.isArray(postData) || postData.length === 0) {
        return <p>현재 게시물이 없습니다. 나중에 다시 확인해주세요!</p>;
    }

    return (
        <div className="posts-container">
            {postData.map(post => (
                <Link to={`/post_detail/${post.id}`} key={post.id} className="post-link">
                    <div className="post-card">
                        <img 
                            src={post.image || 'https://via.placeholder.com/150'} 
                            alt={post.title || '게시물 이미지'} 
                            className="post-image" 
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // 이미지 로딩 오류 처리
                        />
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-price">{post.price.toLocaleString()} 원</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Posts;
