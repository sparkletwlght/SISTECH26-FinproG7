"use client";

import { Phone, Flame, AlertCircle } from "lucide-react";

export default function OnGoingRoutePanel() {
  return (
    <div className="w-full max-w-xs rounded-3xl bg-[#1a1128]/90 backdrop-blur-md p-4 text-white shadow-2xl border border-white/10 flex flex-col gap-3">
      
      {/* status rute */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">On-going Route</span>
        </div>
        <span className="text-xs text-gray-400">22:00 PM</span>
      </div>

      {/* titik asal & tujuan */}
      <div className="flex flex-col gap-1.5 pl-2 border-l-2 border-pink-500/40 my-1">
        <p className="text-xs font-medium text-white truncate">Location name</p>
        <p className="text-xs font-medium text-white truncate">Location name</p>
      </div>

      {/* button stop route */}
      <button className="w-full rounded-full bg-pink-500 py-2 text-xs font-bold text-white shadow-lg shadow-pink-500/25 transition-transform hover:scale-105">
        Stop Route
      </button>

      {/* button quick Call & risk heatmap) */}
      <div className="flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#251838] py-2 text-[11px] font-semibold text-white border border-white/5 hover:bg-[#301f48] transition-colors">
          <Phone size={12} className="text-pink-400" />
          Quick Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#251838] py-2 text-[11px] font-semibold text-white border border-white/5 hover:bg-[#301f48] transition-colors">
          <Flame size={12} className="text-pink-400" />
          Risk Heatmap
        </button>
      </div>

      {/* button report location */}
      <button className="w-full rounded-full bg-[#251838] py-2 text-[11px] font-semibold text-gray-300 border border-white/5 hover:bg-[#301f48] transition-colors flex items-center justify-center gap-1.5">
        <AlertCircle size={12} className="text-pink-400" />
        + Report this location
      </button>

    </div>
  );
}