// import React from 'react';
// import { Link } from 'react-router-dom'; // 리액트 라우터 사용
// import './Posts.css';


// function Posts({postData}) {

//   if (!postData || postData.length === 0) {
//     return <p>게시물이 없습니다.</p>;
//   }

//   if (!Array.isArray(postData)) {
//     console.error('postData is not an array:', postData);
//     return <p>게시물이 없습니다.</p>;
//   }

//   return (
//     <div className="posts-container">
//       {postData.map(post => {
//         // 각 postData의 image를 서버의 도메인과 함께 절대 경로로 변환
//         const imageUrl = `http://localhost:5000/static/${post.image}`;

//         return (
//           <Link to={`/posts/${post.id}`} key={post.id} className="post-link">
//             <div className="post-card">
//               {/* 동적으로 생성된 imageUrl을 사용하여 이미지 표시 */}
//               <img src={imageUrl} alt={post.title} className="post-image" />
//               <h3 className="post-title">{post.title}</h3>
//               <p className="post-price">{post.price}</p>
//             </div>
//           </Link>
//         );
//       })}
// </div>
//   );
// }

// export default Posts;

import React from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

function Posts({ postData }) {
    if (!postData || postData.length === 0) {
      return <p>게시물이 없습니다.</p>;
    }
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


