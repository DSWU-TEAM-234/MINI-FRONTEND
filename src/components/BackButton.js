import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; // 필요한 스타일 파일

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ←
    </button>
  );
}

export default BackButton;
