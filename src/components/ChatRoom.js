import React, { useState, useRef, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatRoom.css';
import useWebSocket from "../hooks/useWebSocket"
import useChatRoom from "../hooks/useChatRoom"
import Modal from "./Modal"
import MessageBubble from "./MessageBubble"
import MapContainer from "./MapContainer"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import BottomMenu from "./BottomMenu"

function ChatRoom() {
  const { chatRoomId } = useParams(); // URL에서 chatRoomId를 가져옴
  const navigate = useNavigate();

  const {
    messages,
    sendMessage,
    sendLocation,
    sendRealTimeLocation,
    realTimeLocation,
  } = useWebSocket(chatRoomId)

  const {
    isMenuOpen,
    inputMessage,
    setInputMessage,
    isModalOpen,
    setIsModalOpen,
    location,
    isMapModalOpen,
    viewLocationModal,
    isLoading,
    myRealTimeLocation,
    otherRealTimeLocation,
    toggleMenu,
    handleSendMessage,
    handleShareLocation,
    handleConfirmLocation,
    handleViewLocation,
    handleCloseModal,
    handleCloseMapModal,
    handleCloseViewLocationModal,
    setOtherRealTimeLocation,
  } = useChatRoom(chatRoomId, sendMessage, sendLocation, sendRealTimeLocation)


  React.useEffect(() => {
    if (realTimeLocation) {
      setOtherRealTimeLocation(realTimeLocation.location)
    }
  }, [realTimeLocation, setOtherRealTimeLocation])

  const modalButtons = [
    {
      text: "확인했어요",
      onClick: handleConfirmLocation,
      className: "confirm-button",
      disabled: isLoading,
    },
    {
      text: "안할래요",
      onClick: handleCloseModal,
      className: "cancel-button",
    },
  ]

  const mapModalButtons = [
    {
      text: "위치 공유하기",
      onClick: handleShareLocation,
      className: "share-location-button",
    },
    {
      text: "닫기",
      onClick: handleCloseMapModal,
      className: "close-button",
    },
  ]

  const viewLocationModalButtons = [
    {
      text: "닫기",
      onClick: handleCloseViewLocationModal,
      className: "close-button",
    },
  ]

  const chatRooms = {
    1: { nickname: '사용자1' },
    2: { nickname: '사용자2' },
    // DB에서 가져온 데이터로 교체 가능
  };


  const room = chatRooms[chatRoomId] || { nickname: '알 수 없는 사용자' };


  //메세지 올때 화면 내려가게
  const messageEndRef = useRef(null);
  
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDressUpClick = () => {
    navigate('/dress-up-game'); // DressUpGame으로 이동
  };

  return (
    <div className="chat-room-detail">
      <ChatHeader chatRoomId={chatRoomId} />

      <div className="chat-content">
        {/* 메시지 목록이 들어갈 부분 */}
        {messages.map((msg, index) => (
          <MessageBubble
          key={index}
          message={msg}
          onViewLocation={handleViewLocation}
        />
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      
      
      <BottomMenu isMenuOpen={isMenuOpen} setIsModalOpen={setIsModalOpen} />
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttons={modalButtons}
      >
        {isLoading ? (
          <p>위치 불러오는 중...</p>
        ) : (
          <p>인증을 위해 위치를 공유할게요. 동의하시나요?</p>
        )}
      </Modal>

      <Modal
        isOpen={isMapModalOpen}
        onClose={handleCloseMapModal}
        buttons={mapModalButtons}
      >
        <MapContainer title="내 위치 인증하기" myLocation={location} />
      </Modal>

      <Modal
        isOpen={viewLocationModal.isOpen}
        onClose={handleCloseViewLocationModal}
        buttons={viewLocationModalButtons}
      >
        <MapContainer
          title="실시간 위치"
          myLocation={myRealTimeLocation}
          otherLocation={otherRealTimeLocation}
        />
      </Modal>
    </div>
  )
}

export default ChatRoom;
