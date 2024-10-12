import React from "react"

function BottomMenu({ isMenuOpen, setIsModalOpen }) {
  if (!isMenuOpen) return null

  return (
    <div className="bottom-menu">
      <button className="menu-item" onClick={() => setIsModalOpen(true)}>
        위치 공유
      </button>
      <button className="menu-item">착장 공유</button>
    </div>
  )
}

export default BottomMenu
