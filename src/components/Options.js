import React from 'react';
import './Options.css';

function Options({ selectedOptions, onOptionChange }) {
  return (
    <div className="options">
      <h2>헤어스타일 선택</h2>
      <button onClick={() => onOptionChange('hair', 'short')}>단발</button>
      <button onClick={() => onOptionChange('hair', 'long')}>긴 머리</button>

      <h2>의상 선택</h2>
      <button onClick={() => onOptionChange('outfit', 'casual')}>캐주얼</button>
      <button onClick={() => onOptionChange('outfit', 'formal')}>정장</button>

      <h2>액세서리 선택</h2>
      <button onClick={() => onOptionChange('accessory', 'none')}>없음</button>
      <button onClick={() => onOptionChange('accessory', 'hat')}>모자</button>
    </div>
  );
}

export default Options;

