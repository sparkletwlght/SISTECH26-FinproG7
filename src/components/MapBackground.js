"use client";

import dynamic from "next/dynamic";

const StaticHeaderMap = dynamic(() => import("@/components/StaticHeaderMap"), {
  ssr: false,
});

export default function MapBackground({ children, variant = "normal" }) {
  const isDashboard = variant === "dashboard";

  const mapHeight = isDashboard ? "h-[550px]" : "h-[360px]";
  const gradientHeight = isDashboard ? "h-[300px]" : "h-[210px]";

  return (
    <div className="relative min-h-screen w-full bg-[#ffffff] text-gray-900 overflow-x-hidden">
      <div className={`absolute top-0 left-0 w-full ${mapHeight} z-0 pointer-events-none transition-all duration-300`}>
        <StaticHeaderMap />
        <div className={`absolute bottom-0 left-0 w-full ${gradientHeight} bg-gradient-to-t from-[#ffffff] via-[#ffffff]/85 to-transparent z-[1000]`} />
      </div>

      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
}