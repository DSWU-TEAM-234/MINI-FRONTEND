import React from 'react';
import './ChatPage.css';
import { Link } from 'react-router-dom';

function ChatPage() {
  // 더미 데이터 (나중에 DB에서 가져올 데이터)
  const chatRooms = [
    {
      id: 1,
      profileImg: 'https://via.placeholder.com/50', // 프로필 사진 URL (나중에 DB와 연결)
      nickname: '사용자1',
      lastMessage: '최근 채팅 내용입니다.',
    },
    {
      id: 2,
      profileImg: 'https://via.placeholder.com/50',
      nickname: '사용자2',
      lastMessage: '다른 최근 채팅 내용입니다.',
    },
    // 추가 채팅방
  ];

  return (
    <div className="chat-page">
      <h2>채팅방 목록</h2>
      <div className="chat-room-list">
        {chatRooms.map((room) => (
          <Link key={room.id} to={`/chat/${room.id}`} className="chat-room">
            <img src={room.profileImg} alt="프로필" className="profile-img" />
            <div className="chat-info">
              <span className="nickname">{room.nickname}</span>
              <span className="last-message">{room.lastMessage}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChatPage;
