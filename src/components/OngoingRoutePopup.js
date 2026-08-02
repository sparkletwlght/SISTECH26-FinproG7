"use client";

import { Moon, Clock, ArrowUpDown } from "lucide-react";

export default function OngoingRoutePopup() {
  return (
    <div className="w-[320px] bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-4 font-sans">
      {/* header */}
      <h3 className="font-bold text-gray-900 text-lg tracking-tight mb-4">On-going Route</h3>
      
      {/* time + warn badge */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-purple-950 text-xs gap-1.5 font-semibold">
          <Moon size={15} className="text-purple-950" />
          <span>22:00PM</span>
        </div>
        
        <div className="flex items-center text-rose-500 text-xs font-semibold px-3 py-1.5 border border-rose-400 bg-white rounded-full gap-1.5 shadow-sm">
          <Clock size={13} />
          <span>High Risk Hour</span>
        </div>
      </div>

      {/* input */}
      <div className="relative flex items-center gap-2.5">
        {/* garis + indicator */}
        <div className="flex flex-col items-center justify-between h-[80px] w-6 relative shrink-0">
          <div className="absolute top-2.5 bottom-2.5 w-0.5 border-l-2 border-dotted border-gray-300 z-0"></div>
          
          <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center z-10 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
          </div>
          
          <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center z-10 relative">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-pink-500 bg-pink-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* input Lokasi */}
        <div className="flex-1 flex flex-col gap-2">
          <input 
            type="text" 
            placeholder="Location name" 
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-purple-950 placeholder-purple-900/50 font-medium outline-none bg-white shadow-sm" 
            readOnly />
          <input 
            type="text" 
            placeholder="Location name" 
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-purple-950 placeholder-purple-900/50 font-medium outline-none bg-white shadow-sm" 
            readOnly />
        </div>

        {/* switch button */}
        <button className="p-1.5 text-gray-700 hover:text-pink-500 transition-colors shrink-0">
          <ArrowUpDown size={16} />
        </button>
      </div>

    </div>
  );
}