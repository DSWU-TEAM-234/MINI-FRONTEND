import { useState, useEffect, useCallback } from "react"
import io from "socket.io-client"

const useWebSocket = (room) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [realTimeLocation, setRealTimeLocation] = useState(null)

  useEffect(() => {
    const websocketUrl = `ws://127.0.0.1:5000`
    const newSocket = io(websocketUrl)
    const currentUserId = sessionStorage.getItem('user_id');
    // 보니까 저거 세션이 안가져와지는 것 같다. 

    newSocket.on("connect", () => {
      console.log("Connected to server")
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.user_id;  // user_id 추출
      console.log("user_id 추출", userId)
    
      // 채팅방 참여 시 사용자 ID와 채팅방 정보 함께 전달
      newSocket.emit("join", { room, user_id: userId });
    })

    newSocket.on("chat", (data) => {
      const currentUser = JSON.parse(localStorage.getItem('user'));  // 로컬 스토리지에서 사용자 정보 가져오기
      const currentUserId = currentUser?.user_id;  // user_id 추출
      console.log("chat currentUserId :", currentUserId); // 수신된 데이터 로그

      console.log("Received 메세지 data:", data.from, currentUserId); // 수신된 데이터 로그
      
      setMessages((prevMessages) => [
          ...prevMessages,
          { ...data, sender: data.from === currentUserId ? "me" : "other" },  // 현재 유저 ID와 비교
      ]);
    });

    newSocket.on("send_avatar_custom", (data) => {
      console.log("Received avatar data:", data.type); // 추가: 수신된 데이터 로그
      const currentUser = JSON.parse(localStorage.getItem('user'));  // 로컬 스토리지에서 사용자 정보 가져오기
      const currentUserId = currentUser?.user_id;  // user_id 추출
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "avatar",
          imageData: data.imageData,
          sender: data.from === newSocket.id ? "me" : "other",
        },
      ]);
    });

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
      const currentUser = JSON.parse(localStorage.getItem('user'));  // 로컬 스토리지에서 사용자 정보 가져오기
      const currentUserId = currentUser?.user_id;  // user_id 추출

      if (socket) {
        socket.emit("chat", {
          room,
          message,
          from: currentUserId,
        })
      }
    },
    [socket, room]
  )

  const sendAvatarImage = useCallback(
    (imageData) => {
      console.log("sendAvatarImage 함수 확인", imageData)
      if (socket) {
        socket.emit("send_avatar_custom", {
          room,
          imageData,
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
    sendAvatarImage
  }
}

export default useWebSocket

