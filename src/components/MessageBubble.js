import React from "react"

function MessageBubble({ message, onViewLocation }) {
    //실제 현재 시간 저장
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`message-bubble ${
        message.sender === "me" ? "my-message" : "other-message"
      }`}
    >
      {message.type === "location" ? (
        <div className="location-message">
          <span>거래 장소에 도착했어요</span>
          <button onClick={() => onViewLocation(message.location)}>
            위치 보기
          </button>
        </div>
      ) : message.type === "chat" ? (
        <span>{message.message}
        {/*
        <small className={`${msg.sender === 'me' ? 'my-message-time' : 'other-message-time'}`}>
             {message.time}</small>
        */}
        </span>
      ) : (
        <span>알 수 없는 메시지 유형</span>
      )}
    </div>
  )
}

export default MessageBubble
