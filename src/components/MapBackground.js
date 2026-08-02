"use client";

import dynamic from "next/dynamic";

const StaticHeaderMap = dynamic(() => import("@/components/StaticHeaderMap"), {
  ssr: false,
});

export default function MapBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-[#ffffff] text-gray-900 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[360px] z-0 pointer-events-none">
        <StaticHeaderMap />
        <div className="absolute bottom-0 left-0 w-full h-[210px] bg-gradient-to-t from-[#ffffff] via-[#ffffff]/85 to-transparent z-[1000]" />
      </div>

      <div className="relative z-20 w-full h-full">
        {children}
      </div>

    </div>
  );
}