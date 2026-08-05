'use client';

import { useState } from "react";

export default function SosPopup() {
  const [origin, setOrigin] = useState("Location name");
  const [destination, setDestination] = useState("Location name");
  const [isSosActive, setIsSosActive] = useState(false);

  // switch fuction
  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  // sos button interactive
  const handleSosClick = () => {
    setIsSosActive(true);
    alert("SOS Emergency Triggered! Notifying emergency contacts...");
    // animation effect
    setTimeout(() => setIsSosActive(false), 2000);
  };

  return (
    <div className="w-full max-w-[350px] bg-[#1a1325]/75 backdrop-blur-2xl border border-white/10 rounded-[30px] p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto">
      
      {/* title */}
      <h2 className="text-lg font-bold tracking-tight mb-3">On-going Route</h2>

      {/* time and badge risk */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 text-xs text-gray-200 font-medium">
          <span>🌙</span> 22:00PM
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-[11px] font-semibold shadow-inner">
          <span>⏰</span> High Risk Hour
        </div>
      </div>

      {/* route wrapper */}
      <div className="relative mb-5">
        
        {/* line n dot */}
        <div className="absolute left-3.5 top-0 bottom-0 flex flex-col items-center justify-between py-2.5 pointer-events-none z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-pink-500 shrink-0 aspect-square shadow-[0_0_8px_#ec4899]" />
          <div className="flex-1 border-l-2 border-dotted border-pink-500/70 my-1" />
          <div className="w-3.5 h-3.5 rounded-full border-2 border-pink-500 bg-[#160f21] flex items-center justify-center shrink-0 aspect-square shadow-[0_0_8px_#ec4899]">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 aspect-square" />
          </div>
        </div>

        {/* input location */}
        <div className="space-y-2.5 pl-9 pr-11">
          <input 
            type="text" 
            value={origin} 
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="From location..."
            className="w-full bg-[#160f21]/90 border border-white/10 rounded-full py-2.5 px-3.5 text-xs text-gray-200 focus:outline-none focus:border-pink-500 shadow-inner transition-colors" 
          />
          <input 
            type="text" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            placeholder="To location..."
            className="w-full bg-[#160f21]/90 border border-white/10 rounded-full py-2.5 px-3.5 text-xs text-gray-200 focus:outline-none focus:border-pink-500 shadow-inner transition-colors" 
          />
        </div>

        {/* Shuffle location button */}
        <button 
          onClick={handleSwap}
          type="button"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 text-gray-300 bg-[#251a35] border border-white/10 p-1.5 rounded-full shadow-md hover:bg-white/10 transition cursor-pointer flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
          </svg>
        </button>

      </div>

      {/* SOS button */}
      <div className="flex flex-col items-center justify-center pt-1">
        <span className="text-[10px] tracking-wider text-pink-300 uppercase mb-2.5 font-semibold">
          Emergency Button
        </span>
        <button 
          onClick={handleSosClick}
          type="button"
          className={`w-28 h-28 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-pink-400 text-white font-black text-xl shadow-[0_0_30px_rgba(236,72,153,0.7)] border-4 border-white/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center justify-center ${
            isSosActive ? "animate-pulse ring-4 ring-red-500" : ""
          }`}>
          SOS
        </button>
      </div>

    </div>
  );
}