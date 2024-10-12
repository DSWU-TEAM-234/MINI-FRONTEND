import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import axios from 'axios'; // axios를 사용하여 API 호출

// 한글 초성 추출 함수
const getInitial = (str) => {
  const initial = str[0].charAt(0);
  if (initial >= '가' && initial <= '힣') {
    const initials = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const code = initial.charCodeAt(0) - 44032;
    return initials[Math.floor(code / 588)];
  }
  return initial.toUpperCase(); // 한글이 아닌 경우 영문 첫 글자
};

function Sidebar({ setSelectedUniversity, isSidebarOpen, closeSidebar, setMainPageColor}) {
  // 사이드바 외부 클릭 시 닫기
  const handleClickOutside = (e) => {
    if (e.target.className === 'sidebar-background') {
      closeSidebar(); // 사이드바 닫기
    }
  };

  const [universities, setUniversities] = useState([]);

  // 데이터베이스에서 대학 목록 가져오기
    useEffect(() => {
      axios.get('http://localhost:5001/api/universities')
    .then(response => {
      console.log('Response Data:', response.data);  // 응답 데이터 확인
      setUniversities(response.data);
    })
    .catch(error => {
      console.error('Error fetching universities:', error);  // 오류 메시지 확인
      console.error(error.response);  // 추가적인 응답 정보 확인
  });

    }, []);
    
    /*
    useEffect(() => {
      axios.get('http://localhost:5001/api/test')  // 이 경로는 테스트 엔드포인트
        .then(response => {
          console.log('Response:', response.data);  // 응답이 제대로 오는지 확인
        })
        .catch(error => {
          console.error('Error fetching data:', error);  // 오류 메시지를 확인
        });
    }, []);*/

   

  // 대학 목록을 ㄱ ㄴ ㄷ 순으로 정렬
  const sortedUniversities = universities.sort((a, b) => a.localeCompare(b, 'ko'));

  // 초성별로 그룹화
  const groupedUniversities = sortedUniversities.reduce((acc, university) => {
    const initial = getInitial(university); // 대학교 이름의 초성 추출
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(university);
    return acc;
  }, {});


  const universityColors = {
    '서울대학교': '#003380',
    '연세대학교': '#003876',
    '고려대학교': '#8b0029',
    '한양대학교': '#0e4a84',
    '서강대학교': '#b60005',
    '덕성여자대학교' : '#8b2842'
  };
  
  

  //사이드바 필터에서 대학 클릭을 감지했을 때 작동
  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
    // 메인 페이지 색상 변경 (예: 대학에 따라 다르게 설정)
    const newColor = universityColors[university] || '#282c34';
    setMainPageColor(newColor);
  }

  //검색창 데이터
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-background" onClick={handleClickOutside}>
          <div className="sidebar">
          <div className="sidebar-header">
            {/*검색창에 입력하면 입력된 데이터가 searchTerm에 저장*/}
            <input type="text" placeholder="대학교 검색" className="search-input"
             onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
            <div className="close-icon" onClick={closeSidebar}>X</div>
          </div>
          <ul className="sidebar-menu">
            {Object.keys(groupedUniversities).map((initial) => (
              <div key={initial}>
                <li className="initial">{initial}</li> {/* 초성 표시 */}
                {/*필터함수로 검색기능 구현*/}
                {groupedUniversities[initial].filter((university)=>{
                  if(searchTerm === ""){
                    return university
                  }else if(searchTerm.includes(university)){
                    return university
                  }
                }).map((university, index) => (
                  <li key={index} className="university-name" onClick={()=>handleUniversityClick(university)}>{university}</li>
                ))}
              </div>
            ))}
          </ul>
        </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;