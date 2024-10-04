import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate 가져오기
import Footer from './Footer'; // Footer를 추가
import './CategoryDetail.css';

const categoryTranslations = {
  dolls: '인형',
  clothes: '의류',
  stationery: '문구류',
  'household-items': '생활소품',
  souvenirs: '기념소품',
};

function CategoryDetail() {
  const navigate = useNavigate(); // 이전 페이지로 돌아가는 함수

  const { categoryName } = useParams(); // URL에서 카테고리 이름을 가져옴
  const translatedCategory = categoryTranslations[categoryName] || categoryName;

  return (
    <div className="category-detail">
      {/* 돌아가기 버튼 */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &lt;
      </button>

      <h2 className="category-name" >{translatedCategory} 카테고리 상세 페이지</h2>
      <p>여기에 {translatedCategory}에 대한 상세 정보가 표시됩니다.</p>

      {/* Footer 추가 */}
      <Footer />
    </div>
  );
}

export default CategoryDetail;
