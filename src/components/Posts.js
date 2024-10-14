import React from 'react';
import { Link } from 'react-router-dom'; // 리액트 라우터 사용
import './Posts.css';



const items = [
  { id: 1, image: 'https://via.placeholder.com/150', title: '중고 아이폰 11', price: '₩500,000' },
  { id: 2, image: 'https://via.placeholder.com/150', title: '중고 노트북', price: '₩800,000' },
  { id: 3, image: 'https://via.placeholder.com/150', title: '중고 자전거', price: '₩150,000' },
  { id: 4, image: 'https://via.placeholder.com/150', title: '중고 책상', price: '₩30,000' },
  { id: 5, image: 'https://via.placeholder.com/150', title: '중고 의자', price: '₩40,000' },
  { id: 6, image: 'https://via.placeholder.com/150', title: '중고 가방', price: '₩60,000' },
  { id: 6, image: 'https://via.placeholder.com/150', title: '중고 가방', price: '₩60,000' },
  { id: 6, image: 'https://via.placeholder.com/150', title: '중고 가방', price: '₩60,000' },
  { id: 6, image: 'https://via.placeholder.com/150', title: '중고 가방', price: '₩60,000' }
];

function Posts({postData}) {

  if (!postData || postData.length === 0) {
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


