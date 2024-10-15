import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DressUpGame.css';
import Character from './Character';

function DressUpGame() {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    outfit: 'casual',
    hair: 'short',
    accessory: 'none',
    color: '#000000'
  });
  const [currentCategory, setCurrentCategory] = useState('hair');

  const handleOptionChange = (category, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: option
    }));
  };

  const handleColorChange = (color) => {
    setSelectedOptions((prev) => ({
      ...prev,
      color: color
    }));
  };

  return (
    <div className="dress-up-game">
      <button className="back-button" onClick={() => navigate(-1)}>
        &lt; 돌아가기
      </button>

      <h1>Dress Up Game</h1>

      <div className="game-container">
        <Character selectedOptions={selectedOptions} />
      </div>

      {/* 색상 선택창 */}
      <div className="color-picker">
        <label>색상 선택: </label>
        <input 
          type="color" 
          value={selectedOptions.color} 
          onChange={(e) => handleColorChange(e.target.value)} 
        />
      </div>

      {/* 옷, 헤어스타일 선택창 */}
      <div className="options-container">
        <div className="category-buttons">
          <button onClick={() => setCurrentCategory('hair')}>헤어스타일</button>
          <button onClick={() => setCurrentCategory('outfit')}>의상</button>
          <button onClick={() => setCurrentCategory('accessory')}>액세서리</button>
        </div>

        <div className="options">
          {currentCategory === 'hair' && (
            <>
              <button onClick={() => handleOptionChange('hair', 'short')}>
                <img src="/assets/hair_short.png" alt="단발" />
              </button>
              <button onClick={() => handleOptionChange('hair', 'long')}>
                <img src="/assets/hair_long.png" alt="긴 머리" />
              </button>
            </>
          )}
          {currentCategory === 'outfit' && (
            <>
              <button onClick={() => handleOptionChange('outfit', 'casual')}>
                <img src="/assets/outfit_casual.png" alt="캐주얼" />
              </button>
              <button onClick={() => handleOptionChange('outfit', 'formal')}>
                <img src="/assets/outfit_formal.png" alt="정장" />
              </button>
            </>
          )}
          {currentCategory === 'accessory' && (
            <>
              <button onClick={() => handleOptionChange('accessory', 'none')}>
                없음
              </button>
              <button onClick={() => handleOptionChange('accessory', 'hat')}>
                <img src="/assets/accessory_hat.png" alt="모자" />
              </button>
            </>
          )}
        </div>
      </div>

      <button className="complete-button">완성</button>
    </div>
  );
}

export default DressUpGame;
