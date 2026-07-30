"use client";

import { Heart, Download, ShieldCheck, MapPin, Clock, AlertTriangle, FileText } from "lucide-react";

export default function LocationPopupCard({ poi }) {
  return (
    <div className="w-80 rounded-3xl bg-[#1e142e]/60 backdrop-blur-xl p-5 text-white shadow-2xl border border-white/15 flex flex-col gap-4 font-sans">
      
      {/* info Lokasi */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-white">{poi?.name || "Location Name"}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{poi?.safetyPct || 90}% Safe</span>
            <span className="text-xs text-gray-400">• {poi?.lotType || "Lot Type"}</span>
          </div>
        </div>
      </div>

      {/* favorite, start route, download) */}
      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-pink-400 border border-white/10 hover:bg-white/20 transition-colors">
          <Heart size={16} />
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff4191] to-[#ff60b6] py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/25 transition-transform hover:scale-105">
          Start Route
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-pink-400 border border-white/10 hover:bg-white/20 transition-colors">
          <Download size={16} />
        </button>
      </div>

      {/* detail alamat & waktu) */}
      <div className="flex flex-col gap-2 pt-1 border-t border-white/10 text-xs text-gray-300">
        <div className="flex items-center gap-2.5">
          <MapPin size={14} className="text-pink-400 shrink-0" />
          <span className="truncate">{poi?.address1 || "Address"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin size={14} className="text-pink-400 shrink-0" />
          <span className="truncate">{poi?.address2 || "Address"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock size={14} className="text-pink-400 shrink-0" />
          <span>{poi?.eta || "Time Estimation"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <AlertTriangle size={14} className="text-pink-400 shrink-0" />
          <span>Show Risk Heatmap</span>
        </div>
        <div className="flex items-center gap-2.5">
          <FileText size={14} className="text-pink-400 shrink-0" />
          <span>Recent Report</span>
        </div>
      </div>

      {/* button report location */}
      <button className="w-full rounded-full bg-white/10 backdrop-blur-md py-2.5 text-[11px] font-semibold text-gray-300 border border-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-1.5 mt-1">
        + Report this location
      </button>

    </div>
  );
}