import React from 'react';
import './ProxyPurchasePage.css';
import Categories from './Categories'; // 카테고리 컴포넌트
import Posts from './Posts'; // 최신 글 또는 인기 글 컴포넌트

const ProxyPurchasePage = () => {
  const items = [
    { id: 1, name: '물건 1', price: '₩10,000', image: 'image-url-1' },
    { id: 2, name: '물건 2', price: '₩15,000', image: 'image-url-2' },
    { id: 3, name: '물건 3', price: '₩20,000', image: 'image-url-3' },
    { id: 4, name: '물건 4', price: '₩25,000', image: 'image-url-4' },
    { id: 5, name: '물건 5', price: '₩30,000', image: 'image-url-5' }
  ];

  return (
    <div className="proxy-purchase-page">

      {/* 물건 정보 섹션 */}
      <div className="section item-scroll-container">
        {items.map((item) => (
          <div key={item.id} className="item-block">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-name">{item.name}</div>
            <div className="item-price">{item.price}</div>
          </div>
        ))}
      </div>

      {/* 카테고리 섹션 */}
      <div className="section">
        <Categories />
      </div>

      {/* 최신글 섹션 */}
      <div className="section">
        <Posts />
      </div>
    </div>
  );
};

export default ProxyPurchasePage;
