import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { MapPin, Navigation, Globe, HeartPulse, Coffee } from "lucide-react";

// icon untuk start poin
export const startIcon = L.divIcon({
  className: "custom-start-marker",
  html: ReactDOMServer.renderToString(
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/50 border-2 border-white">
      <Navigation size={18} className="rotate-45" />
    </div>
  ),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// icon untuk titik destination
export const destinationIcon = L.divIcon({
  className: "custom-dest-marker",
  html: ReactDOMServer.renderToString(
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1128] text-pink-500 shadow-lg border-2 border-pink-500">
      <MapPin size={18} />
    </div>
  ),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// icon untuk titik-titik POI di Peta
export const poiIcon = (type) => {
  let IconComponent = Globe;
  if (type === "health") IconComponent = HeartPulse;
  if (type === "coffee") IconComponent = Coffee;

  return L.divIcon({
    className: "custom-poi-marker",
    html: ReactDOMServer.renderToString(
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white shadow-md shadow-pink-500/30 transition-transform hover:scale-110">
        <IconComponent size={16} />
      </div>
    ),
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};