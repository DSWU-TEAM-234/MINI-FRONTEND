// CategoryButtons.js
import React from 'react';

const CategoryButtons = ({ handleCategoryClick }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button
        onClick={() => handleCategoryClick('hair')}
        style={{
          padding: '10px 20px',
          width: '150px',  // 모든 버튼의 가로 길이를 동일하게
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #ccc',  // 얇은 테두리
          borderRadius: '8px',  // 둥근 직사각형 모양
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#000';
        }}
      >
        머리
      </button>

      <button
        onClick={() => handleCategoryClick('top')}
        style={{
          padding: '10px 20px',
          width: '150px',  // 모든 버튼의 가로 길이를 동일하게
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #ccc',  // 얇은 테두리
          borderRadius: '8px',  // 둥근 직사각형 모양
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#000';
        }}
      >
        상의
      </button>

      <button
        onClick={() => handleCategoryClick('bottom')}
        style={{
          padding: '10px 20px',
          width: '150px',
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#000';
        }}
      >
        하의
      </button>

      <button
        onClick={() => handleCategoryClick('overcoat')}
        style={{
          padding: '10px 20px',
          width: '150px',
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#000';
        }}
      >
        외투
      </button>

      <button
        onClick={() => handleCategoryClick('shoes')}
        style={{
          padding: '10px 20px',
          width: '150px',
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#000';
        }}
      >
        신발
      </button>

      <button
        onClick={() => handleCategoryClick('accessories')}
        style={{
          padding: '10px 20px',
          width: '150px',
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#000';
        }}
      >
        악세사리
      </button>
    </div>

  );
};

export default CategoryButtons;

