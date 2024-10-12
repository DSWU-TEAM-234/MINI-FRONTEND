import React from "react"

function MapContainer({ title, myLocation, otherLocation }) {
  return (
    <div className="map-container">
      <h4>{title}</h4>
      <p>지도 컴포넌트 (임시)</p>
      {myLocation && (
        <>
          <h5>내 위치:</h5>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(myLocation, null, 2)}
          </pre>
        </>
      )}
      {otherLocation && (
        <>
          <h5>상대방 위치:</h5>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(otherLocation, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

export default MapContainer
