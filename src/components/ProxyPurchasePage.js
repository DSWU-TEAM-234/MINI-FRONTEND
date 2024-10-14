import React, { useRef } from 'react';
import './ProxyPurchasePage.css';
import Categories from './Categories';
import Posts from './Posts';
import { Link } from 'react-router-dom';

const ProxyPurchasePage = () => {
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너 참조

  const items = [
    { id: 1, name: '물건 1', price: '₩10,000', image: 'image-url-1' },
    { id: 2, name: '물건 2', price: '₩15,000', image: 'image-url-2' },
    { id: 3, name: '물건 3', price: '₩20,000', image: 'image-url-3' },
    { id: 4, name: '물건 4', price: '₩25,000', image: 'image-url-4' },
    { id: 5, name: '물건 5', price: '₩30,000', image: 'image-url-5' }
  ];

  // 드래그로 스크롤
  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    container.isDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeft = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const container = scrollContainerRef.current;
    if (!container.isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 2; // 스크롤 속도 조정
    container.scrollLeft = container.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    const container = scrollContainerRef.current;
    container.isDown = false;
  };

  return (
    <div className="proxy-purchase-page">

      {/* 물건 정보 섹션 */}
      <div
        className="item-scroll-container"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map((item) => (
          
          <div key={item.id} className="item-block">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-name">{item.name}</div>
            <div className="item-price">{item.price}</div>
          </div>
          
        ))}
      </div>

      {/* 카테고리 섹션 */}
      <Categories post_type={"ProxyPurchase"} />

      <h3 style={{ padding: '20px' }}>최신글</h3>
      {/* 최신글 섹션 */}
      <Posts />
    </div>
  );
};

export default ProxyPurchasePage;

