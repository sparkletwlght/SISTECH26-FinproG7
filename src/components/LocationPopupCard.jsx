"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bookmark, Download, ShieldCheck, MapPin, Clock, AlertTriangle, FileText, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/services/supabase";

export default function LocationPopupCard({ poi, onStart, onBack }) {
  const [showMore, setShowMore] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      const currentName = poi?.name || poi?.destinationName;
      if (!currentName) return;
      
      const { data } = await supabase
        .from('saved_locations')
        .select('*')
        .eq('name', currentName)
        .maybeSingle();

      if (data) setIsSaved(true);
    }
    checkSaved();
  }, [poi]);

  const handleSaveLocation = async () => {
    const locName = poi?.name || poi?.destinationName || "selected location";
    const locAddress = poi?.address1 || poi?.address || "chicago area";
    const locLat = String(poi?.lat || -6.1750);
    const locLng = String(poi?.lng || 106.8283);

    if (!isSaved) {
      // insert ke Supabase: latitude & longitude
      const { error } = await supabase
        .from('saved_locations')
        .insert([{ 
          name: locName, 
          address: locAddress, 
          latitude: locLat, 
          longitude: locLng 
        }]);

      if (!error) {
        setIsSaved(true);
      } else {
        console.error("gagal simpan ke supabase:", error.message);
      }
    } else {
      // remove from supabase
      const { error } = await supabase
        .from('saved_locations')
        .delete()
        .eq('name', locName);

      if (!error) {
        setIsSaved(false);
      } else {
        console.error("gagal hapus dari supabase:", error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-[420px] md:w-[360px] rounded-t-[28px] md:rounded-[24px] bg-[#1a1128]/25 backdrop-blur-2xl border-t md:border border-white/25 shadow-2xl flex flex-col overflow-hidden font-sans text-white relative">
      <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mt-2 mb-1 md:hidden" />

      <div className="h-12 md:h-16 bg-[#251838]/20 relative border-b border-white/10 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1128]/60 via-[#1a1128]/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <MapPin size={20} className="text-white" />
        </div>
      </div>

      <div className="p-3.5 md:p-5 flex flex-col gap-2">
        <div>
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight">{poi?.name || poi?.destinationName || "location name"}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-emerald-400">{poi?.safetyPct || 90}% safe</span>
            <span className="text-xs text-gray-300 font-medium">• {poi?.lotType || "selected route"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 my-0.5">
          <button 
            onClick={handleSaveLocation}
            title={isSaved ? "saved" : "save location"}
            className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all shadow-md cursor-pointer shrink-0 ${
              isSaved 
                ? "bg-pink-500 border-pink-500 text-white shadow-[0_0_12px_#ff4191]" 
                : "bg-[#251838]/40 border-white/20 text-pink-400 hover:bg-[#35224e]/60"
            }`}>
            <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
          </button>

          <button 
            onClick={onStart}
            className="flex-1 py-2 bg-[#ff4191] rounded-full font-bold text-white text-xs shadow-[0_0_15px_rgba(255,65,145,0.5)] hover:scale-[1.01] transition-all cursor-pointer tracking-wide text-center">
            Start Route
          </button>

          <button className="h-9 w-9 rounded-full bg-[#251838]/40 border border-white/20 flex items-center justify-center text-pink-400 hover:bg-[#35224e]/60 transition-all shadow-md cursor-pointer shrink-0">
            <Download size={15} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 py-1.5 border-t border-b border-white/10 text-xs">
          <div className="flex items-center gap-2 text-gray-200">
            <MapPin size={13} className="text-pink-400 shrink-0" />
            <span className="font-medium truncate">{poi?.address1 || poi?.address || "chicago, illinois area"}</span>
          </div>

          {showMore && (
            <>
              <div className="flex items-center gap-2 text-gray-200">
                <Clock size={13} className="text-pink-400 shrink-0" />
                <span className="font-medium">{poi?.schedule || "open 24 hours"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <Clock size={13} className="text-pink-400 shrink-0" />
                <span className="font-medium">{poi?.eta || "est. 15 - 20 mins"}</span>
              </div>
            </>
          )}

          <button 
            onClick={() => setShowMore(!showMore)}
            className="flex items-center justify-center gap-1 text-[11px] font-semibold text-pink-400 hover:text-pink-300 cursor-pointer transition-colors">
            {showMore ? <>see less <ChevronUp size={12} /></> : <>see more details <ChevronDown size={12} /></>}
          </button>
        </div>

        <div className="flex flex-col gap-1.5 mt-0.5">
          <Link href="/reports" className="w-full py-2 rounded-full bg-[#251838]/30 border border-white/20 text-xs font-semibold text-pink-300 hover:bg-[#35224e]/50 transition-all shadow-sm cursor-pointer flex items-center justify-center text-center">
            + Report this location
          </Link>

          {onBack && (
            <button 
              onClick={onBack}
              className="w-full py-1.5 rounded-full bg-transparent border border-white/30 text-xs font-semibold text-white hover:bg-white/10 transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5">
              <ArrowLeft size={13} />
              GO BACK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}