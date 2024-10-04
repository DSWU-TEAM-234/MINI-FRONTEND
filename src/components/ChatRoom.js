import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatRoom.css';

function ChatRoom() {
  const { chatRoomId } = useParams(); // URL에서 chatRoomId를 가져옴
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 메뉴 열기/닫기 상태 토글
  };

  const chatRooms = {
    1: { nickname: '사용자1' },
    2: { nickname: '사용자2' },
    // DB에서 가져온 데이터로 교체 가능
  };

  const [messages, setMessages] = useState([
    { sender: 'other', text: '안녕하세요, 반갑습니다!' }
  ]); // 메시지 목록 상태
  const [inputMessage, setInputMessage] = useState(""); // 입력된 메시지 상태

  // 메시지 전송 함수
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = { sender: 'me', text: inputMessage }; // 내 메시지로 추가
      setMessages([...messages, newMessage]); // 메시지 목록에 새 메시지 추가
      setInputMessage(""); // 입력 칸 초기화
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(); // 엔터 키를 눌렀을 때 메시지 전송
    }
  };

  const room = chatRooms[chatRoomId] || { nickname: '알 수 없는 사용자' };

  return (
    <div className="chat-room-detail">
      <div className="chat-header">
        <button className="chat-back-button" onClick={() => navigate(-1)}>&lt;</button>
        <span className="nickname">{room.nickname}</span>
      </div>

      <div className="chat-content">
        {/* 메시지 목록이 들어갈 부분 */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'me' ? 'my-message' : 'other-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={`message-menu-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="message-input">
          <button className="plus-button" onClick={toggleMenu}>+</button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)} // 입력값 업데이트
            onKeyPress={handleKeyPress} // 엔터 키 감지
            placeholder="메시지를 입력하세요..."
          />
          <button onClick={sendMessage}>보내기</button>
        </div>
      </div>

      {/* 하단 메뉴 (위치 공유, 착장 공유) */}
      {isMenuOpen && (
        <div className="bottom-menu">
          <button className="menu-item">위치 공유</button>
          <button className="menu-item">착장 공유</button>
        </div>
      )}

    </div>
  );
}

export default ChatRoom;
