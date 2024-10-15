import React from "react"
import "./Modal.css"

function Modal({ isOpen, onClose, children, buttons = [] }) {
  if (!isOpen) return null

  const defaultButtons = [
    {
      text: "닫기",
      onClick: onClose,
      className: "default-close-button",
    },
  ]

  const finalButtons = buttons.length > 0 ? buttons : defaultButtons

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <div className="modal-buttons">
          {finalButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={button.className}
              disabled={button.disabled}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modal
