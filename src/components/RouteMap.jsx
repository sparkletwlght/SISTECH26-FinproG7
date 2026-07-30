"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";

import { startIcon, destinationIcon, poiIcon } from "./markerIcons";

function MapRecenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      map.fitBounds(coords, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

export default function RouteMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [startCoords] = useState([-6.2145, 106.8455]);
  const [destCoords] = useState([-6.208, 106.8225]);
  
  const [routeLine, setRouteLine] = useState([
    [-6.2145, 106.8455],
    [-6.208, 106.8225]
  ]);

  const fetchRoute = async (start, dest) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
        setRouteLine(coordinates);
      }
    } catch (error) {
      console.error("Gagal mengambil rute interaktif:", error);
    }
  };

  useEffect(() => {
    fetchRoute(startCoords, destCoords);
  }, [startCoords, destCoords]);

  const POIS = [
    {
      id: "poi-1",
      lat: -6.2095,
      lng: 106.842,
      type: "globe",
      name: "Location Name",
    },
  ];

  if (!isMounted) {
    return <div className="w-full h-full bg-[#43334d]" />;
  }

  return (
    <div className="relative w-full h-full">
      <style jsx global>{`
        .leaflet-container {
          background-color: #43334d !important;
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          inset: 0 !important;
        }
        .map-custom-glow .leaflet-tile {
          filter: brightness(3) contrast(1) saturate(0.5) hue-rotate(250deg);
        }
      `}</style>
      
      <MapContainer
        center={startCoords}
        zoom={15}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-custom-glow"
        />

        <Polyline
          positions={routeLine}
          pathOptions={{
            color: "#ff4191",
            weight: 5,
            className: "route-line-glow",
          }}
        />

        <Marker position={startCoords} icon={startIcon} />
        <Marker position={destCoords} icon={destinationIcon} />

        {POIS.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={poiIcon(poi.type)} />
        ))}

        <MapRecenter coords={routeLine} />
      </MapContainer>
    </div>
  );
}