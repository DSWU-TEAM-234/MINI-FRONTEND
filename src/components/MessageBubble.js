import React from "react"
import axios from 'axios'; // API 호출을 위한 axios 추가

function MessageBubble({ message, onViewLocation, onImageClick}) {
    //실제 현재 시간 저장
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`message-bubble ${
        message.sender === "me" ? "my-message" : "other-message"
      }`}
    >
      {message.type === "location" ? (
        <div>
          <span>거래 장소에 도착했어요</span>
          <button onClick={() => onViewLocation(message.location)}>
            위치 보기
          </button>
        </div>
      ) : message.type === "chat" ? (
        <span>{message.message}
        {
        <small className={`${message.sender === 'me' ? 'my-message-time' : 'other-message-time'}`}>
             {currentTime}</small>
        }
        </span>
      ) : message.type === "avatar" ? ( // 이미지 메시지 처리
        <div className="avatar-message">
          <span>내 옷차림을 공유해요!</span>
            <button onClick={() => onImageClick(message.imageData)}>
              옷차림 확인하기
            </button>
          {/* <img 
            src={message.imageData} 
            alt="User Avatar" 
            className="avatar-image" 
            onClick={() => handleImageClick(message.imageData)} // 이미지 클릭 시 모달 열기
          />
          <span 가나다/> */}
      </div>
      // <div className="avatar-message">
      // <img 
      //   src={message.imageData} 
      //   alt="User Avatar" 
      //   className="avatar-image" 
      //   style={{
      //     maxWidth: "100%", // 최대 너비를 부모 컨테이너에 맞춤
      //     height: "auto", // 비율을 유지하면서 높이 자동 조정
      //     display: "block", // 이미지가 블록 요소처럼 동작하도록 설정
      //     margin: "0 auto", // 가로 중앙 정렬
      //   }} 
      // />
      // <span>{message.from}</span>
    // </div>
      )  : (
        <span>알 수 없는 메시지 유형</span>
      )}
    </div>
  )
}

export default MessageBubble
