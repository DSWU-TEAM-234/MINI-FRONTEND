import React, { useRef ,useEffect, useState } from 'react';
import './ProxyPurchasePage.css';
import Categories from './Categories';
import Posts from './Posts';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProxyPurchasePage = ({selectedUniversity, setPostData, postData}) => {
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너 참조

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

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/ProxyPurchase_posts_by_university_name/${selectedUniversity}`)
      .then(response => {
        console.log('Response Data:', response.data.posts);  // 응답 데이터 확인
        setPostData(response.data.posts)
      })
      .catch(error => {
        console.error('Error fetching universities:', error);  // 오류 메시지 확인
        console.error(error.response);  // 추가적인 응답 정보 확인
    });
}, [selectedUniversity]);


useEffect(() => {
  setPostData([]);
  axios.get(`http://localhost:5000/get_goods_by_university/${selectedUniversity}`)
    .then(response => {
      console.log('Response Data:', response.data.goods_list);  // 응답 데이터 확인
      setItemData(response.data.goods_list)
    })
    .catch(error => {
      console.error('Error fetching universities:', error);  // 오류 메시지 확인
      console.error(error.response);  // 추가적인 응답 정보 확인
  });
}, [selectedUniversity]);



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
        {itemData && itemData.length > 0 ? (
          itemData.map((item) => {
            // 이미지 경로를 절대 경로로 변환
            const imageUrl = `http://localhost:5000/static/${item.image}`; // 서버의 도메인 추가

            return (
              <div key={item.id} className="item-block">
                <img className="item-name" src={imageUrl} alt={item.item_name} className="item-image" />
                <div className="item-name">{item.item_name}</div>
                <div className="item-price">{item.price}</div>
              </div>
            );
          })
        ) : (
          <div className="item-block no-data">
            <div className="no-data-text">정보 없음</div>
          </div>
        )}
      </div>

      {/* 카테고리 섹션 */}
      <Categories post_type={"ProxyPurchase"} />

      <h3 style={{ padding: '20px' }}>최신글</h3>
      {/* 최신글 섹션 */}
      <Posts postData={postData} />
    </div>
  );
};

export default ProxyPurchasePage;

