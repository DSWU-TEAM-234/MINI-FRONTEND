import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate 가져오기
import Footer from './Footer'; // Footer를 추가
import './CategoryDetail.css';
import Posts from './Posts';
import axios from 'axios';  // axios import





const categoryTranslations = {
  dolls: '인형',
  clothes: '의류',
  stationery: '문구류',
  'household-items': '생활소품',
  souvenirs: '기념소품',
};

function CategoryDetail({postType, selectedUniversity, postData ,setPostData}) {
  const navigate = useNavigate(); // 이전 페이지로 돌아가는 함수


  const { categoryName } = useParams(); // URL에서 카테고리 이름을 가져옴
  const translatedCategory = categoryTranslations[categoryName] || categoryName;

  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/posts_by_category/${selectedUniversity}/${categoryName}`)
      .then(response => {
        setPostData([]);
        setPostData(response.data.posts);  // 서버에서 받은 데이터를 상태로 저장
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
        setIsLoading(false);
      });
  }, []);

  //게시물 종류 구분
  const posts = postData.length > 0 
  ? postData.filter(post => post.post_type === postType)
  : [];

  

  return (
    
    <div className="category-detail">
      {/* 돌아가기 버튼 */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &lt;
      </button>

      <h2 className="D_category-name" >{translatedCategory} 카테고리 상세 페이지</h2>
    <>
      {isLoading ? (
        <div className="loading_text">Loading...</div>  // 로딩 중일 때 보여줄 내용
      ) : (
      <Posts postData = {posts}/>)}
    </>
    {/* Footer 추가 */}
    <Footer />
    </div>
  );
}

export default CategoryDetail;
