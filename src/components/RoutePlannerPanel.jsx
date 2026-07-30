"use client";

import { Bike, Car, Footprints, Flame, ArrowUpDown, LayoutPanelLeft, Moon } from "lucide-react";

export default function RoutePlannerPanel({
  locations,
  activeMode,
  onModeChange,
  onSelectLocation,
}) {
  return (
    <div className="w-full h-full rounded-3xl bg-[#1a1128]/40 backdrop-blur-2xl p-6 text-white shadow-2xl border-r border-white/15 flex flex-col gap-6 overflow-y-auto">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Route Planner</h1>
        <button className="text-gray-200 hover:text-white transition-colors p-2 rounded-2xl bg-white/10 border border-white/15 shadow-lg backdrop-blur-md">
          <LayoutPanelLeft size={20} />
        </button>
      </div>

      {/* transportasi */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-pink-400">
          <button onClick={() => onModeChange("bike")} className={`transition-all ${activeMode === "bike" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-40 hover:opacity-80"}`}>
            <Bike size={24} />
          </button>
          <button onClick={() => onModeChange("motor")} className={`transition-all ${activeMode === "motor" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-40 hover:opacity-80"}`}>
            <Flame size={24} />
          </button>
          <button onClick={() => onModeChange("car")} className={`transition-all ${activeMode === "car" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-40 hover:opacity-80"}`}>
            <Car size={24} />
          </button>
          <button onClick={() => onModeChange("walk")} className={`transition-all ${activeMode === "walk" ? "opacity-100 scale-110 drop-shadow-[0_0_10px_#ff4191]" : "opacity-40 hover:opacity-80"}`}>
            <Footprints size={24} />
          </button>
        </div>

        {/* waktu & high risk hour */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-200 text-xs font-medium">
            <Moon size={14} className="text-gray-300" />
            <span>22:00PM</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-pink-500/50 text-pink-400 text-xs font-semibold bg-pink-500/15 shadow-lg shadow-pink-500/25 backdrop-blur-md">
            <Flame size={14} />
            <span>High Risk Hour</span>
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-3 my-1">
        {/* indikator titik titik */}
        <div className="flex flex-col items-center justify-center pl-1 py-1">
          <div className="h-3.5 w-3.5 rounded-full bg-pink-500 shadow-[0_0_12px_#ff4191]" />
          <div className="h-6 border-l-2 border-dotted border-pink-400/70 my-0.5" />
          <div className="h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-pink-500/40 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>

        {/* input fields */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center bg-[#251838]/40 rounded-2xl px-4 py-3.5 border border-white/15 shadow-inner backdrop-blur-xl">
            <input type="text" placeholder="Location name"
              className="bg-transparent w-full text-sm font-medium text-white placeholder-gray-300 focus:outline-none" />
          </div>
          <div className="flex items-center bg-[#251838]/40 rounded-2xl px-4 py-3.5 border border-white/15 shadow-inner backdrop-blur-xl">
            <input type="text" placeholder="Location name"
              className="bg-transparent w-full text-sm font-medium text-white placeholder-gray-300 focus:outline-none"/>
          </div>
        </div>

        {/* swap button */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 bg-white/10 p-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-md">
          <ArrowUpDown size={15} />
        </div>
      </div>

      {/* list tersimpan*/}
      <div className="flex flex-col gap-3.5 overflow-y-auto pr-1 pb-4">
        {locations.map((loc, index) => (
          <div key={loc.id || index} onClick={() => onSelectLocation(loc)}
            className="flex items-center gap-4 p-4 rounded-3xl bg-[#251838]/40 hover:bg-[#2e1f43]/60 transition-all cursor-pointer border border-white/15 shadow-lg backdrop-blur-xl">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#1a1128]/60 flex items-center justify-center text-pink-400 border border-white/15 shadow-inner backdrop-blur-md">
              <div className="grid grid-cols-2 gap-1.5 opacity-90">
                <div className="h-2.5 w-2.5 rounded-sm bg-pink-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                <div className="h-2.5 w-2.5 rounded-sm bg-indigo-400" />
              </div>
            </div>

            {/* Teks Keterangan */}
            <div className="flex flex-col justify-center">
              <p className="text-base font-bold text-white tracking-wide">{loc.name || "Location Name"}</p>
              <p className="text-xs text-gray-200 mt-0.5">{loc.address || "Location Address"}</p>
              <p className="text-xs text-purple-200/90 mt-1">{loc.eta || "Time estimation"}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}