import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import marker from "../assets/TraficMarkers/Marker.jpg";
import marker2 from "../assets/TraficMarkers/Popup.jpg";

import red from "../assets/MarkersIcons/red.png";
// import orange from "../assets/MarkersIcons/orange.png";
// import green from "../assets/MarkersIcons/green.png";

const Map = () => {
  const position = [36.7525, 3.042];
  const position1 = [36.71, 2.945];
  const position2 = [36.32, 3.019];

  const positions = [
    [36.7525, 3.042],
    [36.7525, 3.032],
    [36.7425, 3.042],
    [36.7525, 3.0102],
    [36.6525, 3.042],
    [36.6525, 3.032],
    [36.725, 3.047],
    [36.755, 3.049],
    [36.71, 3.049],
  ];

  return (
    <>
      <div className="flex justify-between w-full m-10">
        <input
          type="text"
          placeholder="Address/Control Point ID"
          className="pl-8 p-2 w-1/3 bg-slate-100 text-lg"
        />
      </div>

      <MapContainer
        center={positions[0]}
        zoom={14}
        scrollWheelZoom
        style={{width: "100vw", height: "100vh", zIndex: "1"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};
export default Map;
