"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { startIcon, destinationIcon, poiIcon } from "./markerIcons";

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

export default function RouteMap({ startLoc, destLoc, activeMode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [routeLine, setRouteLine] = useState([]);
  const [dynamicPOIs, setDynamicPOIs] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultCenter = { lat: -6.175392, lng: 106.827153 };
  const currentCenter = startLoc || defaultCenter;

  const fallbackPOIs = [
    { id: 1, lat: -6.1754, lng: 106.8272, type: "park", name: "Monas Park" },
    { id: 2, lat: -6.1822, lng: 106.8340, type: "cafe", name: "Kopi Kenangan Gambir" },
    { id: 3, lat: -6.1711, lng: 106.8220, type: "shop", name: "Indomaret Juanda" },
    { id: 4, lat: -6.1850, lng: 106.8225, type: "restaurant", name: "Restoran Padang Sederhana" },
    { id: 5, lat: -6.1680, lng: 106.8310, type: "mall", name: "Atrium Senen Mall" },
    { id: 6, lat: -6.1900, lng: 106.8400, type: "health", name: "RSPAD Gatot Soebroto" },
    { id: 7, lat: -6.1780, lng: 106.8150, type: "university", name: "Universitas Nasional" },
    { id: 8, lat: -6.1600, lng: 106.8250, type: "cafe", name: "Starbucks Harmoni" },
  ];

  const fetchRoute = async (start, dest, mode) => {
    if (!start || !dest) return;
    try {
      // Tentukan profil OSRM berdasarkan mode kendaraan
      let profile = "driving";
      const m = (mode || "").toLowerCase();
      if (m.includes("walk") || m.includes("foot") || m.includes("jalan")) {
        profile = "foot";
      } else if (m.includes("bike") || m.includes("motor") || m.includes("sepeda")) {
        profile = "bike";
      }

      const url = `https://router.project-osrm.org/route/v1/${profile}/${start.lng},${start.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
        setRouteLine(coordinates);
      }
    } catch (error) {
      console.error("Gagal mengambil rute:", error);
    }
  };

  const fetchDefaultPOIs = async (lat, lng) => {
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"~"cafe|restaurant|hospital|fast_food|pharmacy|fuel|university|school"](around:4000,${lat},${lng});
          node["shop"~"convenience|supermarket|mall"](around:4000,${lat},${lng});
          node["leisure"="park"](around:4000,${lat},${lng});
          node["aeroway"="aerodrome"](around:20000,${lat},${lng});
        );
        out body;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
      const res = await fetch(url);
      const textResponse = await res.text();
      
      if (textResponse.startsWith("<?xml") || textResponse.includes("<html")) {
        setDynamicPOIs(fallbackPOIs);
        return;
      }

      const data = JSON.parse(textResponse);

      if (data && data.elements && data.elements.length > 0) {
        const mappedPOIs = data.elements.slice(0, 45).map((el) => {
          let type = "globe";
          const amenity = el.tags.amenity;
          const shop = el.tags.shop;
          const leisure = el.tags.leisure;
          const aeroway = el.tags.aeroway;

          if (amenity === "cafe") type = "cafe";
          else if (amenity === "restaurant" || amenity === "fast_food") type = "restaurant";
          else if (amenity === "hospital" || amenity === "pharmacy") type = "health";
          else if (shop === "convenience" || shop === "supermarket") type = "shop";
          else if (shop === "mall") type = "mall";
          else if (amenity === "university" || amenity === "school") type = "university";
          else if (aeroway === "aerodrome") type = "airport";
          else if (leisure === "park") type = "park";
          else if (amenity === "fuel") type = "gas";

          return {
            id: el.id,
            lat: el.lat,
            lng: el.lon,
            type: type,
            name: el.tags.name || "Tempat Penting",
          };
        });
        setDynamicPOIs(mappedPOIs);
      } else {
        setDynamicPOIs(fallbackPOIs);
      }
    } catch (error) {
      setDynamicPOIs(fallbackPOIs);
    }
  };

  useEffect(() => {
    if (!isMounted) return;
    fetchDefaultPOIs(currentCenter.lat, currentCenter.lng);

    if (startLoc && destLoc) {
      fetchRoute(startLoc, destLoc, activeMode);
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