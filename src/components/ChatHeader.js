import React from "react"
import { useNavigate } from "react-router-dom"

function ChatHeader({ chatRoomId }) {
  const navigate = useNavigate()

  return (
    <div className="chat-header">
      <button className="chat-back-button" onClick={() => navigate(-1)}>
        &lt;
      </button>
      <span className="nickname">채팅방 {chatRoomId}</span>
    </div>
  )
}

export default ChatHeader
