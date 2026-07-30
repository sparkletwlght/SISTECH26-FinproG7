"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import RoutePlannerPanel from "@/components/RoutePlannerPanel";

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
  const SAVED_LOCATIONS = Array.from({ length: 4 }).map((_, i) => ({
    id: `saved-${i}`,
    name: "Saved Location Name",
    address: "Location Address",
    eta: "Time estimation",
  }));

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#120b1e]">
      
      {/* 1. Peta Fullscreen di Background (Full satu layar) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <RouteMap />
      </div>

      {/* 2. Navbar di sebelah kanan (dimulai dari batas panel kiri w-[420px] sampai kanan layar) */}
      <div className="absolute top-8 left-[440px] right-8 z-50 pointer-events-auto flex justify-end">
        <div className="w-full max-w-3xl flex justify-end">
          <Navbar />
        </div>
      </div>

      {/* 3. Panel Sidebar Kiri Full (Lebar fix 420px, scrollbar disembunyikan tapi bisa di-scroll) */}
      <div className="absolute top-0 left-0 h-full w-[420px] z-40 pointer-events-auto bg-[#1a1128]/40 backdrop-blur-2xl border-r border-white/15 p-6 flex flex-col overflow-y-auto shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <RoutePlannerPanel
          locations={SAVED_LOCATIONS}
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onSelectLocation={() => {}}
        />
      </div>

    </main>
  );
}