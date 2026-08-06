"use client";

import { Moon, Clock, ArrowUpDown, X, Phone, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link"; 

export default function OnGoingRoutePanel({ onStop, isLight = false, isReportPage = false, onToggleHeatmap, isHeatmapActive, startName, destName }) {
  return (
    <div className={`w-full max-w-[345px] md:w-[345px] rounded-t-[28px] md:rounded-[24px] shadow-2xl flex flex-col p-4 font-sans relative transition-all ${
      isLight 
        ? "bg-white border border-gray-100 text-gray-900" 
        : "bg-[#1a1128]/25 backdrop-blur-2xl border-t md:border border-white/20 text-white"
    }`}>
      
      {/* indicator line */}
      <div className={`w-10 h-1 rounded-full mx-auto mb-2 md:hidden ${isLight ? "bg-gray-300" : "bg-white/30"}`} />

      {/* ongoing route header */}
      <div className={`flex items-center justify-between pb-2 border-b ${isLight ? "border-gray-200" : "border-white/15"}`}>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>On-going Route</span>
        </div>
 
        <button 
          onClick={onStop}
          className={`transition-colors cursor-pointer p-1 rounded-full ${
            isLight ? "text-gray-400 hover:text-gray-700 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}>
          <X size={18} />
        </button>
      </div>

      {/* clock + risk hour */}
      <div className="flex items-center justify-between my-2.5">
        <div className={`flex items-center gap-1.5 text-xs ${isLight ? "text-gray-500" : "text-gray-300"}`}>
          <Moon size={14} className="text-pink-500" />
          <span>22:00PM</span>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          isLight 
            ? "bg-red-50 text-red-500 border border-red-200" 
            : "bg-pink-500/20 border border-pink-500/30 text-pink-300"
        }`}>
          <Clock size={12} />
          <span>High Risk Hour</span>
        </div>
      </div>

      {/* input start loc & destination */}
      <div className="relative flex items-center gap-3 my-1.5">
        <div className="flex flex-col items-center justify-center pl-1 py-1">
          <div className="h-3.5 w-3.5 rounded-full bg-pink-500 shadow-[0_0_12px_#ff4191]" />
          <div className={`h-8 border-l-2 border-dotted my-0.5 ${isLight ? "border-pink-300" : "border-pink-400/70"}`} />
          <div className="h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-pink-500/40 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full pr-10">
          <div className={`flex items-center rounded-2xl px-3 py-2.5 shadow-inner ${
            isLight ? "bg-gray-50 border border-gray-200" : "bg-[#251838]/80 border border-white/15 backdrop-blur-xl"
          }`}>
            <span className={`text-xs font-medium truncate ${isLight ? "text-gray-700" : "text-gray-200"}`}>{startName || "Location name"}</span>
          </div>
          <div className={`flex items-center rounded-2xl px-3.5 py-2.5 shadow-inner ${
            isLight ? "bg-gray-50 border border-gray-200" : "bg-[#251838]/80 border border-white/15 backdrop-blur-xl"
          }`}>
            <span className={`text-xs font-medium truncate ${isLight ? "text-gray-700" : "text-gray-200"}`}>{destName || "Location name"}</span>
          </div>
        </div>

        <div 
          className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-xl backdrop-blur-md shadow-lg ${
            isLight ? "bg-white border border-gray-200 text-gray-700" : "text-white bg-[#251838]/90 border border-white/20"
          }`}
          title="Switch locations">
          <ArrowUpDown size={13} />
        </div>
      </div>

      {!isReportPage && (
        <>
          <button 
            onClick={onStop}
            className="w-full py-2.5 my-2.5 bg-[#ff4191] rounded-full font-bold text-white text-xs shadow-[0_0_15px_rgba(255,65,145,0.4)] hover:scale-[1.01] transition-all cursor-pointer tracking-wide text-center">
            Stop Route
          </button>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Link href="/contacts" className={`py-2.5 px-2 rounded-full border text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                isLight 
                  ? "bg-gray-50 border-gray-200 text-pink-600 hover:bg-pink-50" 
                  : "bg-[#251838]/40 border-white/15 text-pink-300 hover:bg-[#35224e]/60"
              }`}>
                <Phone size={12} />
                Quick Call
              </Link>

              {/* heatmap risk button + active state */}
              <button 
                onClick={onToggleHeatmap}
                className={`py-2.5 px-2 rounded-full border text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                  isHeatmapActive 
                    ? "bg-rose-500 text-white border-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
                    : isLight 
                      ? "bg-gray-50 border-gray-200 text-pink-600 hover:bg-pink-50" 
                      : "bg-[#251838]/40 border-white/15 text-pink-300 hover:bg-[#35224e]/60"
                }`}>
                <AlertTriangle size={12} />
                Risk Heatmap
              </button>
            </div>

            <Link 
              href="/anonymous" 
              className={`w-full py-2.5 rounded-full border text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                isLight 
                  ? "bg-gray-50 border-gray-200 text-pink-600 hover:bg-pink-50" 
                  : "bg-[#251838]/30 border-white/15 text-pink-300 hover:bg-[#35224e]/50"
              }`}>
              <FileText size={12} />
              + Report this location
            </Link>
          </div>
        </>
      )}

    </div>
  );
}