import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatPage.css';
import { Link } from 'react-router-dom';
import profile_image from './image/기본프로필.jpeg'

function ChatPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));  // 로컬 스토리지에서 현재 로그인한 사용자 정보 가져오기
  const userId = currentUser?.user_id;  // 사용자 ID 추출

  useEffect(() => {
    if (userId) {
      // API 호출하여 유저가 속한 채팅방 가져오기
      axios.get(`http://127.0.0.1:5000/chat/list/${userId}`)
        .then(response => {
          setChatRooms(response.data);  // 채팅방 데이터 상태로 설정
        })
        .catch(error => {
          console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
        });
    }
  }, [userId]);

  return (
    <div className="chat-page">
      <h2>채팅방 목록</h2>
      <div className="chat-room-list">
        {chatRooms.map((room) => (
          <Link key={room.name} to={`/chat/${room.name}`} className="chat-room">
            <img src={room.profile_image || profile_image} alt="프로필" className="profile-img" />
            <div className="chat-info">
              <span className="nickname">{room.included_nickname} 님과의 채팅방 </span>
              <span className="last-message">{room.lastMessage}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChatPage;