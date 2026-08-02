import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { 
  MapPin, 
  Navigation, 
  Globe, 
  HeartPulse, 
  Coffee, 
  Utensils, 
  Trees, 
  ShoppingBag, 
  GraduationCap, 
  Fuel, 
  Plane 
} from "lucide-react";

export const startIcon = L.divIcon({
  className: "custom-start-marker",
  html: ReactDOMServer.renderToString(
    <div className="relative flex items-center justify-center">
      <div className="absolute w-12 h-12 rounded-full bg-pink-500/40 blur-md animate-pulse" />
      <div className="absolute -top-12 bg-white text-gray-900 px-3 py-1 rounded-2xl shadow-xl flex flex-col items-start whitespace-nowrap border border-pink-100">
        <span className="text-[9px] font-bold text-pink-500 uppercase tracking-wider">Starting Point</span>
        <span className="text-xs font-semibold text-gray-800">Location name</span>
      </div>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-[0_0_15px_#ff4191] border-2 border-white">
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    </div>
  ),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const destinationIcon = L.divIcon({
  className: "custom-dest-marker",
  html: ReactDOMServer.renderToString(
    <div className="relative flex items-center justify-center">
      <div className="absolute w-12 h-12 rounded-full bg-pink-500/40 blur-md animate-pulse" />
      <div className="absolute -top-12 bg-white text-gray-900 px-3 py-1 rounded-2xl shadow-xl flex flex-col items-start whitespace-nowrap border border-pink-100">
        <span className="text-[9px] font-bold text-pink-500 uppercase tracking-wider">Destination</span>
        <span className="text-xs font-semibold text-gray-800">Location name</span>
      </div>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1128] text-pink-500 shadow-[0_0_15px_#ff4191] border-2 border-pink-500">
        <div className="h-2.5 w-2.5 rounded-full bg-pink-500" />
      </div>
    </div>
  ),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const poiIcon = (type) => {
  let IconComponent = Globe;
  
  const t = (type || "").toLowerCase();

  if (t.includes("health") || t.includes("hospital") || t.includes("pharmacy")) IconComponent = HeartPulse;
  else if (t.includes("coffee") || t.includes("cafe")) IconComponent = Coffee;
  else if (t.includes("restaurant") || t.includes("fast_food") || t.includes("food")) IconComponent = Utensils;
  else if (t.includes("park") || t.includes("leisure")) IconComponent = Trees;
  else if (t.includes("shop") || t.includes("mall") || t.includes("supermarket") || t.includes("convenience")) IconComponent = ShoppingBag;
  else if (t.includes("school") || t.includes("university") || t.includes("college")) IconComponent = GraduationCap;
  else if (t.includes("airport") || t.includes("aerodrome")) IconComponent = Plane;
  else if (t.includes("gas") || t.includes("fuel")) IconComponent = Fuel;

  return L.divIcon({
    className: "custom-poi-marker",
    html: ReactDOMServer.renderToString(
      <div className="relative flex items-center justify-center">
        <div className="absolute w-10 h-10 rounded-full bg-pink-500/50 blur-sm" />
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white shadow-[0_0_12px_#ff4191] border border-white/40 transition-transform hover:scale-110">
          <IconComponent size={16} />
        </div>
      </div>
    ),
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};