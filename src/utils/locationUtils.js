export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          reject("위치 정보를 가져올 수 없습니다: " + error.message)
        }
      )
    } else {
      reject("이 브라우저에서는 위치 정보를 사용할 수 없습니다.")
    }
  })
}
