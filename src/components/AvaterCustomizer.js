import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryButtons from "./CategoryButton"; // 불러오기
import html2canvas from "html2canvas";
import useWebSocket from "../hooks/useWebSocket"
import {
  topOptions,
  bottomOptions,
  overcoatOptions,
  shoesOptions,
  accessoriesOptions,
  frontHairOptions,
  backHairOptions,
} from './AllclothingOption';


const AvatarCustomizer = ({ onShareAvatar }) => {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedOvercoat, setSelectedOvercoat] = useState(null);
  const [selectedShoes, setSelectedShoes] = useState(null);
  const [selectedAccessories, setSelectedAccessories] = useState(null);
  const [selectedFrontHair, setSelectedFrontHair] = useState(null);
  const [selectedBackHair, setSelectedBackHair] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hairPart, setHairPart] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  // const {
  //   sendAvatarImage,
  //   messages,
  //   realTimeLocation,
  //   // 추가적으로 필요한 다른 함수들...
  // } = useWebSocket(room); // 방 정보를 전달


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // 카테고리가 변경될 때 hairPart를 초기화
    if (category !== "hair") {
      setHairPart(null)
    }
  };

  const handleTopChange = (id) => {
    setSelectedTop(id);
  };

  const handleBottomChange = (id) => {
    setSelectedBottom(id);
  };

  const handleOvercoatChange = (id) => {
    setSelectedOvercoat(id);
  };

  const handleShoesChange = (id) => {
    setSelectedShoes(id);
  };

  const handleAccessoriesChange = (id) => {
    setSelectedAccessories(id);
  };

  const handleFrontHairChange = (id) => {
    setSelectedFrontHair(id);
  };

  const handleBackHairChange = (id) => {
    setSelectedBackHair(id);
  };

  // 아바타를 캡처하는 함수
  const handleCapture = async () => {
    const avatarElement = document.getElementById("avatar"); // 아바타의 id

    // 아바타 영역의 크기와 위치 가져오기
    const rect = avatarElement.getBoundingClientRect();
    const scale = window.innerWidth / rect.width;

    html2canvas(avatarElement, {
      backgroundColor: null, // 배경 투명
      x: rect.left - 320,          // 아바타의 X 좌표
      y: rect.top - 80,    
      width: rect.width + 70,     // 아바타의 가로 크기
      height: rect.height + 150,   // 아바타의 세로 크기
    }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png"); // Base64 이미지 데이터

      // const link = document.createElement("a");
      // link.href = canvas.toDataURL("image/png"); // PNG 형식으로 변환
      // link.download = "avatar.png"; // 다운로드할 파일 이름
      // link.click(); // 다운로드 실행
  
      console.log("Sending avatar image:", imageData);

      onShareAvatar(imageData);

      console.log("onShareAvatar function:", onShareAvatar); // 함수 확인
    });
  };
  
 
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          position: "relative",
        }}
      >
        {/* 아바타 캡처를 위한 div */}
        <div
          id="avatar"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ position: "relative", width: "200px", height: "300px" }}
          >
            {/* Avatar image */}
            <img
              src="/clothes/body.png"
              alt="Avatar"
              style={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                zIndex: 1,
              }}
            />

            {/* Accessories (e.g., Hat) */}
            {selectedAccessories && (
              <img
                src={
                  accessoriesOptions.find((a) => a.id === selectedAccessories)
                    .image
                }
                alt="Hat"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 2,
                }}
              />
            )}

            {/* Top (e.g., Shirt) */}
            {selectedTop && (
              <img
                src={topOptions.find((c) => c.id === selectedTop).image}
                alt="Clothes"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 3,
                }}
              />
            )}

            {/* Overcoat */}
            {selectedOvercoat && (
              <img
                src={
                  overcoatOptions.find((c) => c.id === selectedOvercoat).image
                }
                alt="Clothes"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 4,
                }}
              />
            )}

            {/* Bottom (e.g., Pants) */}
            {selectedBottom && (
              <img
                src={bottomOptions.find((b) => b.id === selectedBottom).image}
                alt="Bottom"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 2,
                }}
              />
            )}

            {/* Shoes */}
            {selectedShoes && (
              <img
                src={shoesOptions.find((c) => c.id === selectedShoes).image}
                alt="Clothes"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 1,
                }}
              />
            )}

            {/* Hair */}
            {selectedFrontHair && (
              <img
                src={
                  frontHairOptions.find((c) => c.id === selectedFrontHair).image
                }
                alt="Clothes"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 2,
                }}
              />
            )}

            {/* Hair */}
            {selectedBackHair && (
              <img
                src={
                  backHairOptions.find((c) => c.id === selectedBackHair).image
                }
                alt="Clothes"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "300px",
                  zIndex: 0,
                }}
              />
            )}
          </div>
        </div>

        <button
          onClick={handleCapture}
          style={{
            position: "absolute", // 버튼을 절대 위치로 설정
            top: "125%", // 아바타 이미지의 하단 바로 아래에 배치
            left: "50%", // 가로 중앙 정렬
            transform: "translateX(-50%)", // 중앙 맞춤
            width: "300px", // 모든 버튼의 가로 길이를 동일하게
            height: "50px",
            backgroundColor: "transparent",
            color: "#000",
            border: "1px solid #ccc", // 얇은 테두리
            borderRadius: "8px", // 둥근 직사각형 모양
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#000";
          }}
        >
          나의 옷차림을 공유할게요
        </button>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        {/* 카테고리 버튼 */}
        <CategoryButtons handleCategoryClick={handleCategoryClick} />

        {selectedCategory === "hair" && (
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                value="frontHair"
                checked={hairPart === "frontHair"}
                onChange={() => setHairPart("frontHair")}
              />
              앞머리
            </label>
            <label>
              <input
                type="radio"
                value="backHair"
                checked={hairPart === "backHair"}
                onChange={() => setHairPart("backHair")}
              />
              뒷머리
            </label>
          </div>
        )}

        {/* 선택된 카테고리 아이템 표시 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
          }}
        >
          {/* 머리 */}
          {hairPart === "frontHair" && selectedCategory === "hair" &&
                frontHairOptions.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border:
                        selectedFrontHair === item.id
                          ? "2px solid blue"
                          : "1px solid gray",
                      padding: "0px",
                      textAlign: "center",
                      backgroundColor:
                        hoveredItem === item.id ? "#f0f0f0" : "white",
                      cursor: "pointer",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => handleFrontHairChange(item.id)}
                  >
                    <p>{item.name}</p>
                    <img src={item.image} alt={item.name} width="150" />
                  </div>
                ))}

            {/* 뒷머리 옵션들 */}
            {hairPart === "backHair" && selectedCategory === "hair" &&
              backHairOptions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border:
                      selectedBackHair === item.id
                        ? "2px solid blue"
                        : "1px solid gray",
                    padding: "0px",
                    textAlign: "center",
                    backgroundColor:
                      hoveredItem === item.id ? "#f0f0f0" : "white",
                    cursor: "pointer",
                    transition: "background-color 0.3s, border-color 0.3s",
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleBackHairChange(item.id)}
                >
                  <p>{item.name}</p>
                  <img src={item.image} alt={item.name} width="150" />
                </div>
              ))}

            {/* 상의 */}
            {selectedCategory === "top" &&
              topOptions
                .filter(item => item.name.includes("흰색")) // 흰색 옷만 필터링
                .map((item) => (
                  <div key={item.id}>
                    {/* 상의 종류별 흰색 옷 */}
                    <div
                      style={{
                        border:
                          selectedTop === item.id
                            ? "2px solid blue"
                            : "1px solid gray", // 선택된 항목 테두리 색상 변경
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: "white", // 대표 이미지의 배경은 흰색
                        cursor: "pointer",
                        transition: "background-color 0.3s, border-color 0.3s",
                      }}
                      onMouseEnter={() => setHoveredItem(item.id)} // 마우스가 해당 항목에 올라가면
                      onMouseLeave={() => setHoveredItem(null)} // 마우스가 항목을 벗어나면
                      onClick={() => handleTopChange(item.id)} // 클릭하면 선택된 상의로 변경
                    >
                      <img src={item.image} alt={item.name} width="150" />
                    </div>

                    {/* 상의 색상별 옵션 */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column", // 색상별 옵션을 세로로 표시
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      {topOptions
                        .filter(option => option.name.startsWith(item.name.split("_")[0])) // 동일한 종류의 상의만 필터링
                        .map((colorOption) => (
                          <div
                            key={colorOption.id}
                            style={{
                              border:
                                selectedTop === colorOption.id
                                  ? "2px solid blue"
                                  : "1px solid gray", // 선택된 색상 테두리 변경
                              padding: "1px",
                              cursor: "pointer",
                              width: '200px',
                              backgroundColor: hoveredItem === colorOption.id ? "lightgray" : "transparent", // 마우스가 올라가면 배경색 변경
                            }}
                            onMouseEnter={() => setHoveredItem(colorOption.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => handleTopChange(colorOption.id)} // 색상 클릭 시 선택
                          >
                            <p>{colorOption.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
 
            {/* 하의 */}
            {selectedCategory === "bottom" &&
              bottomOptions
                .filter(item => item.name.includes("흰색")) // 흰색 옷만 필터링
                .map((item) => (
                  <div key={item.id}>
                    {/* 상의 종류별 흰색 옷 */}
                    <div
                      style={{
                        border:
                          selectedBottom === item.id
                            ? "2px solid blue"
                            : "1px solid gray", // 선택된 항목 테두리 색상 변경
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: "white", // 대표 이미지의 배경은 흰색
                        cursor: "pointer",
                        transition: "background-color 0.3s, border-color 0.3s",
                      }}
                      onMouseEnter={() => setHoveredItem(item.id)} // 마우스가 해당 항목에 올라가면
                      onMouseLeave={() => setHoveredItem(null)} // 마우스가 항목을 벗어나면
                      onClick={() => handleBottomChange(item.id)} // 클릭하면 선택된 상의로 변경
                    >
                      <img src={item.image} alt={item.name} width="150" />
                    </div>

                    {/* 상의 색상별 옵션 */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column", // 색상별 옵션을 세로로 표시
                        alignItems: "center",
                        marginTop: "10px",
                        
                      }}
                    >
                      {bottomOptions
                        .filter(option => option.name.startsWith(item.name.split("_")[0])) // 동일한 종류의 상의만 필터링
                        .map((colorOption) => (
                          <div
                            key={colorOption.id}
                            style={{
                              border:
                              selectedBottom === colorOption.id
                                  ? "2px solid blue"
                                  : "1px solid gray", // 선택된 색상 테두리 변경
                              padding: "1px",
                              cursor: "pointer",
                              width: '200px',
                              backgroundColor: hoveredItem === colorOption.id ? "lightgray" : "transparent", // 마우스가 올라가면 배경색 변경
                            }}
                            onMouseEnter={() => setHoveredItem(colorOption.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => handleBottomChange(colorOption.id)} // 색상 클릭 시 선택
                          >
                            <p>{colorOption.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              {/* 외투 */}
            {selectedCategory === "overcoat" &&
              overcoatOptions
                .filter(item => item.name.includes("흰색")) // 흰색 옷만 필터링
                .map((item) => (
                  <div key={item.id}>
                    {/* 상의 종류별 흰색 옷 */}
                    <div
                      style={{
                        border:
                          selectedOvercoat === item.id
                            ? "2px solid blue"
                            : "1px solid gray", // 선택된 항목 테두리 색상 변경
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: "white", // 대표 이미지의 배경은 흰색
                        cursor: "pointer",
                        transition: "background-color 0.3s, border-color 0.3s",
                      }}
                      onMouseEnter={() => setHoveredItem(item.id)} // 마우스가 해당 항목에 올라가면
                      onMouseLeave={() => setHoveredItem(null)} // 마우스가 항목을 벗어나면
                      onClick={() => handleOvercoatChange(item.id)} // 클릭하면 선택된 상의로 변경
                    >
                      <img src={item.image} alt={item.name} width="150" />
                    </div>

                    {/* 상의 색상별 옵션 */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column", // 색상별 옵션을 세로로 표시
                        alignItems: "center",
                        marginTop: "10px",
                        
                      }}
                    >
                      {overcoatOptions
                        .filter(option => option.name.startsWith(item.name.split("_")[0])) // 동일한 종류의 상의만 필터링
                        .map((colorOption) => (
                          <div
                            key={colorOption.id}
                            style={{
                              border:
                                selectedOvercoat === colorOption.id
                                  ? "2px solid blue"
                                  : "1px solid gray", // 선택된 색상 테두리 변경
                              padding: "1px",
                              cursor: "pointer",
                              width: '200px',
                              backgroundColor: hoveredItem === colorOption.id ? "lightgray" : "transparent", // 마우스가 올라가면 배경색 변경
                            }}
                            onMouseEnter={() => setHoveredItem(colorOption.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => handleOvercoatChange(colorOption.id)} // 색상 클릭 시 선택
                          >
                            <p>{colorOption.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

                 {/* 신발 */}
              {selectedCategory === "shoes" &&
                shoesOptions.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border:
                        selectedShoes === item.id
                          ? "2px solid blue"
                          : "1px solid gray", // 선택된 항목 테두리 색상 변경
                      padding: "10px",
                      textAlign: "center",
                      backgroundColor:
                        hoveredItem === item.id ? "#f0f0f0" : "white", // 마우스가 올라간 항목 배경색 변경
                      cursor: "pointer",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)} // 마우스가 해당 항목에 올라가면
                    onMouseLeave={() => setHoveredItem(null)} // 마우스가 항목을 벗어나면
                    onClick={() => handleShoesChange(item.id)} // 클릭하면 선택된 신발로 변경
                  >
                    <p>{item.name}</p>2
                    <img src={item.image} alt={item.name} width="150" />
                  </div>
                ))}


              {/* 악세사리 */}
              {selectedCategory === "accessories" &&
                accessoriesOptions.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border:
                        selectedAccessories === item.id
                          ? "2px solid blue"
                          : "1px solid gray", // 선택된 항목 테두리 색상 변경
                      padding: "10px",
                      textAlign: "center",
                      backgroundColor:
                        hoveredItem === item.id ? "#f0f0f0" : "white", // 마우스가 올라간 항목 배경색 변경
                      cursor: "pointer",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)} // 마우스가 해당 항목에 올라가면
                    onMouseLeave={() => setHoveredItem(null)} // 마우스가 항목을 벗어나면
                    onClick={() => handleAccessoriesChange(item.id)} // 클릭하면 선택된 신발로 변경
                  >
                    <p>{item.name}</p>
                    <img src={item.image} alt={item.name} width="150" />
                  </div>
                ))}  
            </div>
          </div>
        </div>
      );
};

export default AvatarCustomizer;
