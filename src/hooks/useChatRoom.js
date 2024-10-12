import { useState, useCallback, useEffect } from "react"
import { getCurrentPosition } from "../utils/locationUtils"

function useChatRoom(
  chatRoomId,
  sendMessage,
  sendLocation,
  sendRealTimeLocation
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [location, setLocation] = useState(null)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [viewLocationModal, setViewLocationModal] = useState({
    isOpen: false,
    location: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [myRealTimeLocation, setMyRealTimeLocation] = useState(null)
  const [otherRealTimeLocation, setOtherRealTimeLocation] = useState(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage)
      setInputMessage("")
    }
  }, [inputMessage, sendMessage])

  const handleShareLocation = useCallback(() => {
    sendLocation(location)
    setIsMapModalOpen(false)
  }, [location, sendLocation])

  const handleConfirmLocation = useCallback(async () => {
    setIsLoading(true)
    try {
      const newLocation = await getCurrentPosition()
      setLocation(newLocation)
      setIsModalOpen(false)
      setIsMapModalOpen(true)
    } catch (error) {
      alert(error)
      setIsModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleViewLocation = useCallback((location) => {
    setViewLocationModal({ isOpen: true, location })
  }, [])

  const handleCloseModal = () => setIsModalOpen(false)
  const handleCloseMapModal = () => setIsMapModalOpen(false)
  const handleCloseViewLocationModal = useCallback(() => {
    setViewLocationModal({ isOpen: false, location: null })
    setMyRealTimeLocation(null)
    setOtherRealTimeLocation(null)
  }, [])

  const updateRealTimeLocation = useCallback(async () => {
    if (viewLocationModal.isOpen) {
      try {
        const newLocation = await getCurrentPosition()
        setMyRealTimeLocation(newLocation)
        sendRealTimeLocation(newLocation)
      } catch (error) {
        console.error("실시간 위치 업데이트 실패:", error)
      }
    }
  }, [viewLocationModal.isOpen, sendRealTimeLocation])

  useEffect(() => {
    let intervalId
    if (viewLocationModal.isOpen) {
      updateRealTimeLocation()
      intervalId = setInterval(updateRealTimeLocation, 500)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [viewLocationModal.isOpen, updateRealTimeLocation])

  return {
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
  }
}

export default useChatRoom
