import React, { useState,useEffect } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Categories from './Categories';
import './Home.css';
import Posts from './Posts';
import duksungBanner from './image/duksung_banner.jpg'
import yeonUniBanner from './image/yonsei_university_banner.jpg'
import axios from 'axios';

function Home({mainPageColor,selectedUniversity,postData,setPostData, setSelectedUniversity}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [bannerImage, setBannerImage] = useState(duksungBanner); // 기본 배너 이미지

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  

useEffect(() => {
  setIsLoading(true);
  axios.get(`http://localhost:5000/posts_by_university_name/${selectedUniversity}`)
      .then(response => {
        setPostData([]);
        console.log('Response Data:', response.data.posts);  // 응답 데이터 확인
        setPostData(response.data.posts)
      })
      .catch(error => {
        console.error('Error fetching universities:', error);  // 오류 메시지 확인
        console.error(error.response);  // 추가적인 응답 정보 확인
        setIsLoading(false);
    });
  },[selectedUniversity]);



/*
  axios.get(`http://localhost:5000/`)
    .then(response => {
      console.log('Response Data:', response.data);
      setPostData(response.data.posts);
      setSelectedUniversity(response.data.university_name)
    })
    .catch(error => {
      console.error('Error fetching universities:', error);  // 오류 메시지 확인
      console.error(error.response);  // 추가적인 응답 정보 확인
  });
  */

  const updateBannerImage = (universityName) => {
    let newBannerImage = duksungBanner; // 기본 이미지
    switch (universityName) {
      case '연세대학교':
        newBannerImage = yeonUniBanner;
        break;
      default:
        newBannerImage = duksungBanner;
        break;
    }
    // 동일한 이미지로 변경되지 않도록 조건 추가
    if (newBannerImage !== bannerImage) {
      setBannerImage(newBannerImage);
    }
  };


  return (
    <div className="Home">  
          {/* Header는 App.js에서 렌더링되므로 제거 */}
          <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} mainPageColor={mainPageColor} />
          
          <div className="banner">
            <img className='banner_image' src={bannerImage} alt="Banner" />
          </div>
          
          <Categories />
          <h3 style={{ padding: '20px' }}>인기글</h3>
          <Posts postData={postData} />
          
          {/* Footer는 유지 */}
          <Footer />
        </div>
  );
}

export default Home;
