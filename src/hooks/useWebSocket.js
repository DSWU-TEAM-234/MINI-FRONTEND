import { useState, useEffect, useCallback } from "react"
import io from "socket.io-client"

const useWebSocket = (room) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [realTimeLocation, setRealTimeLocation] = useState(null)

  useEffect(() => {
    const websocketUrl = `ws://127.0.0.1:5000`
    const newSocket = io(websocketUrl)

    newSocket.on("connect", () => {
      console.log("Connected to server")
      newSocket.emit("join", { room })
    })

    newSocket.on("chat", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, sender: data.from === newSocket.id ? "me" : "other" },
      ])
    })

    newSocket.on("location", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, sender: data.from === newSocket.id ? "me" : "other" },
      ])
    })

    newSocket.on("real_time_location", (data) => {
      setRealTimeLocation(data)
    })

    newSocket.on("status", (data) => {
      console.log(data.msg)
    })

    setSocket(newSocket)

    return () => {
      newSocket.emit("leave", { room })
      newSocket.disconnect()
    }
  }, [room])

  const sendMessage = useCallback(
    (message) => {
      if (socket) {
        socket.emit("chat", {
          room,
          message,
          from: socket.id,
        })
      }
    },
    [socket, room]
  )

  const sendLocation = useCallback(
    (location) => {
      if (socket) {
        socket.emit("location", {
          room,
          location,
          from: socket.id,
        })
      }
    },
    [socket, room]
  )

  const sendRealTimeLocation = useCallback(
    (location) => {
      if (socket) {
        socket.emit("real_time_location", {
          room,
          location,
          from: socket.id,
        })
      }
    },
    [socket, room]
  )

  return {
    messages,
    setMessages,
    sendMessage,
    sendLocation,
    sendRealTimeLocation,
    realTimeLocation,
  }
}

export default useWebSocket
