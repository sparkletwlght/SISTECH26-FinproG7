"use client";

import { useState, useEffect } from "react";
import { fetchRouteData, fetchPOIsData } from "@/services/mapService";
import { getHeatmap } from "@/services/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { startIcon, destinationIcon, poiIcon } from "./markerIcons";

function MapRecenter({ coords, centerCoords }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (coords && coords.length > 0) {
      map.fitBounds(coords, { padding: [50, 50] });
    } else if (centerCoords?.lat && centerCoords?.lng) {
      map.setView([centerCoords.lat, centerCoords.lng], 13);
    }
  }, [coords, centerCoords, map]);
  return null;
}

const FALLBACK_POIS = [
  { id: 1, lat: 41.8781, lng: -87.6298, type: "park", name: "Chicago Park" },
];

export default function RouteMap({ startLoc, destLoc, activeMode, showHeatmap = false }) {
  const [isMounted, setIsMounted] = useState(false);
  const [routeLine, setRouteLine] = useState([]);
  const [dynamicPOIs, setDynamicPOIs] = useState([]);
  const [riskPoints, setRiskPoints] = useState([]);

  // render map hanya berjalan di sisi client browser
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !showHeatmap) {
      setRiskPoints([]);
      return;
    }

    getHeatmap(new Date().toISOString()).then((points) => {
      setRiskPoints(points || []);
    }).catch(() => setRiskPoints([]));
  }, [isMounted, showHeatmap]);

  const defaultCenter = { lat: 41.8781, lng: -87.6298 };
  const currentCenter = destLoc?.lat && destLoc?.lng 
    ? destLoc 
    : (startLoc?.lat && startLoc?.lng ? startLoc : defaultCenter);

  useEffect(() => {
    if (!isMounted) return;

    fetchPOIsData(currentCenter.lat, currentCenter.lng, FALLBACK_POIS).then((pois) => {
      setDynamicPOIs(pois || []);
    }).catch(() => setDynamicPOIs(FALLBACK_POIS));

    if (startLoc?.lat && destLoc?.lat) {
      fetchRouteData(startLoc, destLoc, activeMode).then((coords) => {
        setRouteLine(coords || []);
      }).catch(() => setRouteLine([]));
    } else {
      setRouteLine([]);
    }
  }, [isMounted, startLoc, destLoc, activeMode]);

  // render Leaflet dicegah sebelum komponen benar-benar ter-mount di browser
  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#120b1e] text-pink-400 text-xs tracking-widest animate-pulse">
        LOAD MAPS...
      </div>
    );
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
        zoom={13}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-custom-glow"
        />

        {showHeatmap && riskPoints.map((p, index) => {
          const score = p.risk_score !== undefined ? Number(p.risk_score) : 0.5;

          let color = "#22c55e"; 
          if (score >= 0.7) {
            color = "#ef4444";   
          } else if (score >= 0.4) {
            color = "#eab308";   
          }

          return (
            <CircleMarker
              key={`risk-point-${index}`}
              center={[Number(p.lat), Number(p.lon)]}
              radius={10}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.75,
                weight: 1,
              }}
            />
          );
        })}

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

        {startLoc?.lat && startLoc?.lng && (
          <Marker position={[Number(startLoc.lat), Number(startLoc.lng)]} icon={startIcon(startLoc.name)} />
        )}
        {destLoc?.lat && destLoc?.lng && (
          <Marker position={[Number(destLoc.lat), Number(destLoc.lng)]} icon={destinationIcon(destLoc.name)} />
        )}

        <MapRecenter coords={routeLine} centerCoords={currentCenter} />
      </MapContainer>
    </div>
  );
}