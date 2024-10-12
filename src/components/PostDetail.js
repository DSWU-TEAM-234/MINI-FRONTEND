import React from 'react';
import { useParams } from 'react-router-dom';

const items = [
  { id: 1, image: 'https://via.placeholder.com/150', title: '중고 아이폰 11', price: '₩500,000' },
  { id: 2, image: 'https://via.placeholder.com/150', title: '중고 노트북', price: '₩800,000' },
  { id: 3, image: 'https://via.placeholder.com/150', title: '중고 자전거', price: '₩150,000' },
  { id: 4, image: 'https://via.placeholder.com/150', title: '중고 책상', price: '₩30,000' },
  { id: 5, image: 'https://via.placeholder.com/150', title: '중고 의자', price: '₩40,000' },
  { id: 6, image: 'https://via.placeholder.com/150', title: '중고 가방', price: '₩60,000' }
];

function PostDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 추출
  const post = items.find(item => item.id === parseInt(id));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <img src={post.image} alt={post.title} />
      <p>가격: {post.price}</p>
      <p>게시글 상세 내용이 여기에 표시됩니다...</p>
    </div>
  );
}

export default PostDetail;
