import React from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton"

function ChatHeader({ chatRoomId }) {
  const navigate = useNavigate()

  return (
    <div className="chat-header">
      <BackButton />
      <span className="nickname">채팅방 {chatRoomId}</span>
    </div>
  )
}

export default ChatHeader
