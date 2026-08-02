// src/components/RouteMap.jsx
"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle, // <-- Import Circle dari react-leaflet buat bikin heatmap instan
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { startIcon, destinationIcon, poiIcon } from "./markerIcons";
import { fetchRouteData, fetchPOIsData, getRiskHeatmapData } from "@/services/mapService";

function MapRecenter({ coords, centerCoords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      map.fitBounds(coords, { padding: [50, 50] });
    } else if (centerCoords) {
      map.setView([centerCoords.lat, centerCoords.lng], 15);
    }
  }, [coords, centerCoords, map]);
  return null;
}

const FALLBACK_POIS = [
  { id: 1, lat: -6.1754, lng: 106.8272, type: "park", name: "Monas Park" },
  { id: 2, lat: -6.1822, lng: 106.8340, type: "cafe", name: "Kopi Kenangan Gambir" },
  { id: 3, lat: -6.1711, lng: 106.8220, type: "shop", name: "Indomaret Juanda" },
  { id: 4, lat: -6.1850, lng: 106.8225, type: "restaurant", name: "Restoran Padang Sederhana" },
];

export default function RouteMap({ startLoc, destLoc, activeMode, showHeatmap = false }) {
  const [isMounted, setIsMounted] = useState(false);
  const [routeLine, setRouteLine] = useState([]);
  const [dynamicPOIs, setDynamicPOIs] = useState([]);
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    setHeatmapPoints(getRiskHeatmapData()); // Ambil data titik risiko
  }, []);

  const defaultCenter = { lat: -6.175392, lng: 106.827153 };
  const currentCenter = startLoc || defaultCenter;

  useEffect(() => {
    if (!isMounted) return;

    fetchPOIsData(currentCenter.lat, currentCenter.lng, FALLBACK_POIS).then((pois) => {
      setDynamicPOIs(pois);
    });

    if (startLoc && destLoc) {
      fetchRouteData(startLoc, destLoc, activeMode).then((coords) => {
        setRouteLine(coords);
      });
    } else {
      setRouteLine([]);
    }
  }, [isMounted, startLoc, destLoc, activeMode]);

  if (!isMounted) {
    return <div className="w-full h-full bg-[#120b1e]" />;
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
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      
      <MapContainer
        center={[currentCenter.lat, currentCenter.lng]}
        zoom={15}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-custom-glow"
        />

        {/* render heatmap waktu di klik buttonnya */}
        {showHeatmap && heatmapPoints.map((point) => (
          <Circle
            key={`heat-${point.id}`}
            center={[point.lat, point.lng]}
            radius={point.radius}
            pathOptions={{
              color: point.intensity === "high" ? "#ff0055" : "#ff9900",
              fillColor: point.intensity === "high" ? "#ff0055" : "#ff9900",
              fillOpacity: 0.4,
              weight: 1,
            }}
          />
        ))}

        {routeLine.length > 0 && (
          <Polyline
            positions={routeLine}
            pathOptions={{
              color: "#ff4191",
              weight: 5,
              className: "drop-shadow-[0_0_8px_#ff4191]",
            }}
          />
        )}

        {dynamicPOIs.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={poiIcon(poi.type)} />
        ))}

        {startLoc && <Marker position={[startLoc.lat, startLoc.lng]} icon={startIcon} />}
        {destLoc && <Marker position={[destLoc.lat, destLoc.lng]} icon={destinationIcon} />}

        <MapRecenter coords={routeLine} centerCoords={currentCenter} />
      </MapContainer>
    </div>
  );
}