import React from 'react';
import './Character.css';

function Character({ selectedOptions }) {
  return (
    <div className="character">
      <img 
        src={`/assets/hair_${selectedOptions.hair}.png`} 
        alt="헤어스타일" 
        style={{ filter: `hue-rotate(${selectedOptions.color}deg)` }} // 선택된 색상 적용
      />
      <img 
        src={`/assets/outfit_${selectedOptions.outfit}.png`} 
        alt="의상" 
        style={{ filter: `hue-rotate(${selectedOptions.color}deg)` }} // 선택된 색상 적용
      />
      {selectedOptions.accessory !== 'none' && (
        <img 
          src={`/assets/accessory_${selectedOptions.accessory}.png`} 
          alt="액세서리" 
          style={{ filter: `hue-rotate(${selectedOptions.color}deg)` }} // 선택된 색상 적용
        />
      )}
    </div>
  );
}

export default Character;

