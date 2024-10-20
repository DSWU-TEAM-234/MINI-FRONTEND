import React from "react"

function BottomMenu({ isMenuOpen, setIsModalOpen, setIsAvatarModalOpen }) {
  if (!isMenuOpen) return null

  return (
    <div className="bottom-menu">
      <button className="menu-item" onClick={() => setIsModalOpen(true)}>
        현재 위치 공유
      </button>
      <button className="menu-item" onClick={() => setIsAvatarModalOpen(true)}>
        현재 옷차림 공유
      </button>
    </div>
  )
}

export default BottomMenu
