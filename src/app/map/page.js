"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import RoutePlannerPanel from "@/components/RoutePlannerPanel";
import OnGoingRoutePanel from "@/components/OnGoingRoutePanel";
import { PanelLeftOpen } from "lucide-react";
import LocationPopupCard from "@/components/LocationPopupCard";
import { supabase } from "@/services/supabase";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#120b1e] text-white">
      <p className="animate-pulse text-sm font-semibold tracking-wider">Load Maps...</p>
    </div>
  ),
});

export default function MapsPage() {
  // sesuaikan dengan icon di panel
  const [activeMode, setActiveMode] = useState("bike");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [isRouteStarted, setIsRouteStarted] = useState(false);
  
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [safeRouteInfo, setSafeRouteInfo] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);

  // ambil data lokasi yang disave dari supabase
  useEffect(() => {
    async function fetchSavedLocations() {
      const { data, error } = await supabase
        .from('saved_locations')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setSavedLocations(data);
      }
    }

    fetchSavedLocations();
  }, [startCoords, destCoords]);

  const handleStartRoute = async () => {
    if (!startCoords || !destCoords) return;
    setIsRouteStarted(true);
  };

  const stopRoute = () => {
    setIsRouteStarted(false);
    setStartCoords(null);
    setDestCoords(null);
    setShowHeatmap(false);
    setSafeRouteInfo(null);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#120b1e]">
      
      {/* map layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <RouteMap 
          startLoc={startCoords} 
          destLoc={destCoords} 
          activeMode={activeMode} 
          showHeatmap={showHeatmap} 
        />
      </div>

      {/* navbar */}
      <Navbar isSidebarOpen={isSidebarOpen} />

      {/* sidebar route planner */}
      {!isRouteStarted && (
        <div className={`absolute z-40 pointer-events-auto transition-transform duration-300 ease-in-out
          inset-0 w-full h-full border-0 pt-20
          md:inset-y-0 md:left-0 md:bottom-auto md:h-full md:w-[420px] !rounded-none md:border-r md:border-white/20 md:pt-0
          bg-[#1a1128]/20 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col overflow-hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
          
          <div className="flex flex-col h-full">
            <RoutePlannerPanel
              locations={savedLocations}
              activeMode={activeMode}
              onModeChange={(newMode) => {
                // fungsi ketika icon sepeda/motor/mobil/jalan kaki diklik
                setActiveMode(newMode);
              }}
              destCoords={destCoords}
              onSelectLocation={(loc) => {
                const lat = loc.latitude || loc.lat;
                const lng = loc.longitude || loc.lng;
                
                if (lat && lng) {
                  setDestCoords({
                    lat: Number(lat),
                    lng: Number(lng),
                    name: loc.name,
                    address: loc.address
                  });
                  setIsSidebarOpen(false);
                }
              }}
              onCloseSidebar={() => setIsSidebarOpen(false)}
              setStartCoords={setStartCoords}
              setDestCoords={setDestCoords}
            />
          </div>
        </div>
      )}

      {/* popup detail lokasi */}
      {startCoords && destCoords && !isRouteStarted && (
        <div className="absolute z-50 inset-x-0 bottom-0 w-full flex justify-center pb-4 px-4 md:inset-auto md:right-6 md:top-24 md:w-auto md:pb-0 md:px-0 pointer-events-auto">
          <LocationPopupCard 
            poi={{ 
              name: destCoords.name, 
              destinationName: destCoords.name,
              address: destCoords.address,
              lat: destCoords.lat,
              lng: destCoords.lng,
              safetyPct: 90, 
              lotType: activeMode 
            }}
            onStart={handleStartRoute} 
            onBack={() => { setDestCoords(null); setIsSidebarOpen(true); }}
          />
        </div>
      )}

      {/* ongoing route panel */}
      {isRouteStarted && (
        <div className="absolute z-50 inset-x-0 bottom-0 px-4 pb-4 flex justify-center md:inset-auto md:left-6 md:top-24 md:w-auto md:px-0 md:pb-0 pointer-events-auto">
          <OnGoingRoutePanel 
            startName={startCoords?.name || "lokasi asal"}
            destName={destCoords?.name || "lokasi tujuan"}
            onStop={stopRoute} 
            onToggleHeatmap={() => setShowHeatmap(!showHeatmap)} 
            isHeatmapActive={showHeatmap} 
          />
        </div>
      )}

      {/* open close button */}
      {!isSidebarOpen && !isRouteStarted && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute bottom-6 left-6 z-50 p-3.5 rounded-2xl bg-[#1a1128]/90 text-white border border-white/15 shadow-2xl backdrop-blur-md hover:bg-[#2e1f43] transition-all cursor-pointer flex items-center gap-2 pointer-events-auto"
        >
          <PanelLeftOpen size={20} className="text-pink-400" />
          <span className="text-xs font-semibold">open panel</span>
        </button>
      )}

    </main>
  );
}