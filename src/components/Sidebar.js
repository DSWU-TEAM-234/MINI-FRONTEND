import React from 'react';
import './Sidebar.css';

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

function Sidebar({ isSidebarOpen, closeSidebar }) {
  // 사이드바 외부 클릭 시 닫기
  const handleClickOutside = (e) => {
    if (e.target.className === 'sidebar-background') {
      closeSidebar(); // 사이드바 닫기
    }
  };

  const universities = [
    '가천대학교',
    '고려대학교',
    '경희대학교',
    '서울대학교',
    '성균관대학교',
    '연세대학교',
    '중앙대학교',
    '한양대학교'
  ];

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

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-background" onClick={handleClickOutside}>
          <div className="sidebar">
          <div className="sidebar-header">
            <input type="text" placeholder="대학교 검색" className="search-input" />
            <div className="close-icon" onClick={closeSidebar}>X</div>
          </div>
          <ul className="sidebar-menu">
            {Object.keys(groupedUniversities).map((initial) => (
              <div key={initial}>
                <li className="initial">{initial}</li> {/* 초성 표시 */}
                {groupedUniversities[initial].map((university, index) => (
                  <li key={index} className="university-name">{university}</li>
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