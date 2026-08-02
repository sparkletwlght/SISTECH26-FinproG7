"use client";

import { Moon, Clock, ArrowUpDown, X, Phone, AlertTriangle, FileText } from "lucide-react";

export default function OnGoingRoutePanel({ onStop }) {
  return (
    <div className="w-full max-w-[345px] md:w-[345px] rounded-t-[28px] md:rounded-[24px] bg-[#1a1128]/25 backdrop-blur-2xl border-t md:border border-white/20 shadow-2xl flex flex-col p-4 font-sans text-white relative">
      
      {/* Garis indikator kecil ala sheet mobile */}
      <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-2 md:hidden" />

      {/* Header On-going Route */}
      <div className="flex items-center justify-between pb-2 border-b border-white/15">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-white">On-going Route</span>
        </div>
 
        <button 
          onClick={onStop}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>

      {/* Jam & Risk Hour */}
      <div className="flex items-center justify-between my-2.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-300">
          <Moon size={14} className="text-pink-400" />
          <span>22:00PM</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold">
          <Clock size={12} />
          <span>High Risk Hour</span>
        </div>
      </div>

      {/* Input Lokasi Start & Destination */}
      <div className="relative flex items-center gap-3 my-1.5">
        <div className="flex flex-col items-center justify-center pl-1 py-1">
          <div className="h-3.5 w-3.5 rounded-full bg-pink-500 shadow-[0_0_12px_#ff4191]" />
          <div className="h-8 border-l-2 border-dotted border-pink-400/70 my-0.5" />
          <div className="h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-pink-500/40 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full pr-10">
          <div className="flex items-center bg-[#251838]/80 rounded-2xl px-3 py-2.5 border border-white/15 shadow-inner backdrop-blur-xl">
            <span className="text-xs font-medium text-gray-200 truncate">Location name</span>
          </div>
          <div className="flex items-center bg-[#251838]/80 rounded-2xl px-3.5 py-2.5 border border-white/15 shadow-inner backdrop-blur-xl">
            <span className="text-xs font-medium text-gray-200 truncate">Location name</span>
          </div>
        </div>

        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-[#251838]/90 p-2 rounded-xl border border-white/20 backdrop-blur-md shadow-lg"
          title="Switch locations"
        >
          <ArrowUpDown size={13} />
        </div>
      </div>

      {/* Stop Main Route */}
      <button 
        onClick={onStop}
        className="w-full py-2.5 my-2.5 bg-[#ff4191] rounded-full font-bold text-white text-xs shadow-[0_0_15px_rgba(255,65,145,0.4)] hover:scale-[1.01] transition-all cursor-pointer tracking-wide text-center"
      >
        Stop Route
      </button>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2.5 px-2 rounded-full bg-[#251838]/40 border border-white/15 text-xs font-semibold text-pink-300 hover:bg-[#35224e]/60 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
            <Phone size={12} />
            Quick Call
          </button>
          <button className="py-2.5 px-2 rounded-full bg-[#251838]/40 border border-white/15 text-xs font-semibold text-pink-300 hover:bg-[#35224e]/60 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
            <AlertTriangle size={12} />
            Risk Heatmap
          </button>
        </div>

        <button className="w-full py-2.5 rounded-full bg-[#251838]/30 border border-white/15 text-xs font-semibold text-pink-300 hover:bg-[#35224e]/50 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
          <FileText size={12} />
          + Report this location
        </button>
      </div>

    </div>
  );
}