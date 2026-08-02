"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { startIcon, destinationIcon, poiIcon } from "./markerIcons";

export default function StaticHeaderMap() {
  // TEORI MUTLAK: Menggunakan state renderKey untuk memaksa siklus hidup baru
  const [renderKey, setRenderKey] = useState("");

  useEffect(() => {
    // ID unik berbasis waktu setiap kali komponen masuk ke client
    // sistem save reload id bakal brubah
    setRenderKey(Date.now().toString());
  }, []);

  // return null sebelum key terbentuk, mencegah hidrasi prematur
  if (!renderKey) return null;

  const dummyPOIs = [
    { id: 1, lat: -6.1754, lng: 106.8272, type: "park" },
    { id: 2, lat: -6.1730, lng: 106.8240, type: "cafe" },
    { id: 3, lat: -6.1780, lng: 106.8300, type: "hospital" },
  ];

  return (
    <MapContainer
      // parameter key memaksa React membangun ulang DOM dari nol
      // leaflet tidak akan pernah lagi menemukan kontainer undefined
      key={renderKey}
      center={[-6.175392, 106.827153]}
      zoom={15}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      attributionControl={false}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, backgroundColor: "#120b1e" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        className="filter brightness-[3] contrast-100 saturate-50 hue-rotate-[250deg]"
      />

      {dummyPOIs.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={poiIcon(poi.type)} />
      ))}

      <Marker position={[-6.1770, 106.8250]} icon={startIcon} />
      <Marker position={[-6.1720, 106.8290]} icon={destinationIcon} />
    </MapContainer>
  );
}