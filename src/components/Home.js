import React, { useState,useEffect } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Categories from './Categories';
import './Home.css';
import Posts from './Posts';
import duksae from './image/duksae05.jpg'
import axios from 'axios';

function Home({mainPageColor,selectedUniversity,postData,setPostData, setSelectedUniversity}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

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
        setIsLoading(false);
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



  return (
    
    <>
      {isLoading ? (
        <div>Loading...</div>  // 로딩 중일 때 보여줄 내용
      ) : (
        <div className="Home">  
          {/* Header는 App.js에서 렌더링되므로 제거 */}
          <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} mainPageColor={mainPageColor} />
          
          <div className="banner">
            <img src={duksae} alt="Banner" />
          </div>
          
          <Categories />
          <h3 style={{ padding: '20px' }}>인기글</h3>
          <Posts postData={postData} />
          
          {/* Footer는 유지 */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
