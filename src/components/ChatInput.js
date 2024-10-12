import React from "react"

function ChatInput({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  toggleMenu,
  isMenuOpen,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className={`message-menu-container ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="message-input">
        <button className="plus-button" onClick={toggleMenu}>
          +
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSendMessage}>보내기</button>
      </div>
    </div>
  )
}

export default ChatInput
