import React from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  // npm install leaflet react-leaflet
import L from 'leaflet';

// 기본 마커 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ChangeView({ myLocation, otherLocation }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (myLocation || otherLocation) {
      const bounds = L.latLngBounds(
        myLocation ? [myLocation.latitude, myLocation.longitude] : [],
        otherLocation ? [otherLocation.latitude, otherLocation.longitude] : []
      );
      map.fitBounds(bounds);
    }
  }, [myLocation, otherLocation, map]);

  return null;
}

function MapContainer({ title, myLocation, otherLocation, height = "400px", width = "200px" }) {
  return (
    <div className="map-container">
      <h4>{title}</h4>
      <LeafletMap center={[0, 0]} zoom={2} style={{ height, width }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {myLocation && (
          <Marker position={[myLocation.latitude, myLocation.longitude]}>
            <Popup>내 위치</Popup>
          </Marker>
        )}
        {otherLocation && (
          <Marker position={[otherLocation.latitude, otherLocation.longitude]}>
            <Popup>상대방 위치</Popup>
          </Marker>
        )}
        <ChangeView myLocation={myLocation} otherLocation={otherLocation} />
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
