import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";
import mapData2 from "./data.json";
import "./App.css";
import icon from "./custom_marker.png"
const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  const mapData = mapData2.coordinates.map((location) => ({
    lat: location[1],
    lng: location[0],
  }));
  const Textlocation = { lat: mapData[1].lat, lng: mapData[0].lng };
  const polygonCenter = mapData.reduce(
    (acc, point) => {
      acc.lat += point.lat;
      acc.lng += point.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );
  polygonCenter.lat /= mapData.length;
  polygonCenter.lng /= mapData.length;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(pos);
      });
    }
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 12.965,
    lng: 77.479,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {mapData.length > 0 && (
          <InfoWindow position={polygonCenter}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>Area</div>
            </div>
          </InfoWindow>
        )}

        {userLocation && (
          <Marker
          
            position={{
              lat: userLocation.lat,
              lng: userLocation.lng,
            }}
          />
        )}

        <Polygon
          paths={mapData}
          options={{
            fillColor: "#b9f0cb",
            fillOpacity: 0.5,
            strokeColor: "#ed9191",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default App;
