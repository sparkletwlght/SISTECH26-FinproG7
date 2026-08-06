// src/components/RoutePlannerPanel.jsx
"use client";

import { useState } from "react";
import { Bike, Car, Footprints, ArrowUpDown, PanelLeftClose, Moon, Clock } from "lucide-react";
import { getCoordsFromQuery } from "@/services/geocodingService";

export default function RoutePlannerPanel({
  locations,
  activeMode,
  onModeChange,
  onSelectLocation,
  onCloseSidebar,
  setStartCoords,
  setDestCoords,
}) {
  const [startLocation, setStartLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");

  const handleSwapLocations = () => {
    setStartLocation(destLocation);
    setDestLocation(startLocation);
  };

  const handleGeocode = async (query, type) => {
    if (!query.trim()) return;
    const coords = await getCoordsFromQuery(query);
    if (coords) {
      const locationData = { ...coords, name: query };
      if (type === "start") setStartCoords(locationData);
      if (type === "dest") setDestCoords(locationData);
    } else {
      alert("Lokasi tidak ditemukan! Coba nama jalan yang lebih spesifik.");
      // Otomatis kosongkan kolom input jika lokasi tidak ditemukan
      if (type === "start") setStartLocation("");
      if (type === "dest") setDestLocation("");
    }
  };

  return (
    <div
      className="
        fixed z-40 inset-x-0 bottom-0 top-0
        md:top-0 md:bottom-0 md:left-0 md:inset-x-auto md:right-auto
        md:w-[420px]
        bg-[#1A1128]/10 !rounded-none backdrop-blur-sm border-r border-white/10 shadow-[0_8px_20px_0_rgba(0,0,0,0.30)] text-white
        flex flex-col overflow-hidden
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
      "
    >
      <div className="shrink-0 flex flex-col gap-4 p-6 pt-28 md:pt-8 bg-transparent">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">Route Planner</h1>
          <button 
            onClick={onCloseSidebar} 
            className="text-white hover:text-white transition-colors p-2.5 rounded-2xl bg-white/10 border border-white/15 shadow-lg backdrop-blur-md cursor-pointer hover:bg-white/20"
            title="Hide Sidebar"
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-1 text-pink-400">
          <button onClick={() => onModeChange("bike")} title="Sepeda" className={`transition-all cursor-pointer ${activeMode === "bike" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-50 hover:opacity-100"}`}>
            <Bike size={24} />
          </button>
          
          <button onClick={() => onModeChange("motor")} title="Motor" className={`transition-all cursor-pointer ${activeMode === "motor" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-50 hover:opacity-100"}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5" cy="18" r="3"></circle>
              <circle cx="19" cy="18" r="3"></circle>
              <path d="M6.5 15H11l2-5h3l3 5"></path>
              <path d="M11 10L9 5H4"></path>
            </svg>
          </button>

          <button onClick={() => onModeChange("car")} title="Mobil" className={`transition-all cursor-pointer ${activeMode === "car" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-50 hover:opacity-100"}`}>
            <Car size={24} />
          </button>

          <button onClick={() => onModeChange("walk")} title="Jalan Kaki" className={`transition-all cursor-pointer ${activeMode === "walk" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-50 hover:opacity-100"}`}>
            <Footprints size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 mt-1">
          <div className="flex items-center gap-2 text-white text-base font-semibold">
            <Moon size={18} className="text-pink-300" />
            <span>22:00PM</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/50 text-pink-300 text-xs font-semibold bg-pink-500/20 shadow-lg backdrop-blur-md">
            <Clock size={14} className="text-pink-400" />
            <span>High Risk Hour</span>
          </div>
        </div>

        {/* input loc start & destination */}
        <div className="relative flex items-center gap-3 mt-2">
          <div className="flex flex-col items-center justify-center pl-1 py-1">
            <div className="h-3.5 w-3.5 rounded-full bg-pink-500 shadow-[0_0_12px_#ff4191]" />
            <div className="h-10 border-l-2 border-dotted border-pink-400/70 my-0.5" />
            <div className="h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-pink-500/40 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full pr-12">
            <div className="flex items-center bg-[#251838]/80 rounded-2xl px-4 py-3.5 border border-white/15 shadow-inner backdrop-blur-xl">
              <input 
                type="text" 
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGeocode(startLocation, "start");
                }}
                placeholder="Your Location"
                className="bg-transparent w-full text-sm font-medium text-white placeholder-gray-300 focus:outline-none" 
              />
            </div>
            <div className="flex items-center bg-[#251838]/80 rounded-2xl px-4 py-3.5 border border-white/15 shadow-inner backdrop-blur-xl">
              <input 
                type="text" 
                value={destLocation}
                onChange={(e) => setDestLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGeocode(destLocation, "dest");
                }}
                placeholder="Destination"
                className="bg-transparent w-full text-sm font-medium text-white placeholder-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="button"
            onClick={handleSwapLocations}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-[#251838]/90 p-2.5 rounded-xl border border-white/20 hover:bg-[#35224e] active:scale-95 transition-all cursor-pointer backdrop-blur-md shadow-lg"
            title="Swap locations"
          >
            <ArrowUpDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3.5 px-6 pb-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {locations.map((loc, index) => (
          <div key={loc.id || index} onClick={() => onSelectLocation(loc)}
            className="flex items-center gap-4 p-4 rounded-3xl bg-[#251838]/20 hover:bg-[#2e1f43]/90 transition-all cursor-pointer border border-white/15 shadow-lg backdrop-blur-xl">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#1a1128]/50 flex items-center justify-center text-pink-400 border border-white/15 shadow-inner backdrop-blur-md">
              <div className="grid grid-cols-2 gap-1.5 opacity-90">
                <div className="h-2.5 w-2.5 rounded-sm bg-pink-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                <div className="h-2.5 w-2.5 rounded-sm bg-indigo-400" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-base font-bold text-white tracking-wide">{loc.name || "Location Name"}</p>
              <p className="text-xs text-gray-200 mt-0.5">{loc.address || "Location Address"}</p>
              <p className="text-xs text-purple-200 mt-1">{loc.eta || "Time estimation"}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}