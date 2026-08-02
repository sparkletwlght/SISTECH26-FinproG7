"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import RoutePlannerPanel from "@/components/RoutePlannerPanel";
import OnGoingRoutePanel from "@/components/OnGoingRoutePanel";
import { PanelLeftOpen } from "lucide-react";
import LocationPopupCard from "@/components/LocationPopupCard";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#120b1e] text-white">
      <p className="animate-pulse text-sm font-semibold tracking-wider">Memuat Peta Interaktif...</p>
    </div>
  ),
});

export default function MapsPage() {
  const [activeMode, setActiveMode] = useState("bike");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [isRouteStarted, setIsRouteStarted] = useState(false);

  const SAVED_LOCATIONS = Array.from({ length: 4 }).map((_, i) => ({
    id: `saved-${i}`,
    name: "Saved Location Name",
    address: "Location Address",
    eta: "Time estimation",
  }));

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#120b1e]">
      
      {/* map layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <RouteMap startLoc={startCoords} destLoc={destCoords} />
      </div>

      {/* navbar */}
      <Navbar isSidebarOpen={isSidebarOpen} />

      {/* sidebar */}
      {!isRouteStarted && (
        <div className={`absolute z-40 pointer-events-auto transition-transform duration-300 ease-in-out
          inset-0 w-full h-full border-0 pt-20
          md:inset-y-0 md:left-0 md:bottom-auto md:h-full md:w-[420px] !rounded-none md:border-r md:border-white/20 md:pt-0
          bg-[#1a1128]/20 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col overflow-hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
          
          <div className="flex flex-col h-full">
            <RoutePlannerPanel
              locations={SAVED_LOCATIONS}
              activeMode={activeMode}
              onModeChange={setActiveMode}
              onSelectLocation={() => {}}
              onCloseSidebar={() => setIsSidebarOpen(false)}
              setStartCoords={setStartCoords}
              setDestCoords={setDestCoords}
            />
          </div>
        </div>
      )}

      {/* popup detail loc */}
      {startCoords && destCoords && !isRouteStarted && (
        <div className="absolute z-50 inset-x-0 bottom-0 md:inset-auto md:right-10 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
          <LocationPopupCard 
            poi={{ name: "Location Name", safetyPct: 90, lotType: "Lot Type" }}
            onStart={() => setIsRouteStarted(true)}
            onBack={() => { setStartCoords(null); setDestCoords(null); }}
          />
        </div>
      )}

      {/* ongoing route panel */}
      {isRouteStarted && (
        <div className="absolute z-50 left-6 top-24 pointer-events-auto">
          <OnGoingRoutePanel onStop={() => {
            setIsRouteStarted(false);
            setStartCoords(null);
            setDestCoords(null);
          }} />
        </div>
      )}

      {/* open close */}
      {!isSidebarOpen && !isRouteStarted && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute bottom-6 left-6 z-50 p-3.5 rounded-2xl bg-[#1a1128]/90 text-white border border-white/15 shadow-2xl backdrop-blur-md hover:bg-[#2e1f43] transition-all cursor-pointer flex items-center gap-2 pointer-events-auto"
        >
          <PanelLeftOpen size={20} className="text-pink-400" />
          <span className="text-xs font-semibold">Open Panel</span>
        </button>
      )}

    </main>
  );
}