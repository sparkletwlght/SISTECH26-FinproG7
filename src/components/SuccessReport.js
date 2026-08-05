'use client';

import { MapPin } from "lucide-react";

export default function SuccessReport({ isOpen, onClose, formData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#272133] border border-white/10 rounded-[30px] p-6 sm:p-8 text-white shadow-2xl flex flex-col items-center">
        
        {/* Header*/}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-1">
          Thank you for submitting a report!
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 text-center mb-6">
          Your report is now public to other users.
        </p>

        {/* Preview Card dalam Popup Sukses */}
        <div className="w-full bg-[#1e1728] border border-white/10 rounded-2xl p-5 mb-6 shadow-inner">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-bold text-pink-400 text-base sm:text-lg">
              {formData.title || "Report Title"}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/50 bg-green-500/10 text-green-300">
              <span>✓</span> {formData.severity || "Safe"}
            </span>
          </div>

          <p className="text-xs text-gray-300 mb-4">
            {formData.dateTime ? new Date(formData.dateTime).toLocaleDateString() : "Time reported"} • {formData.location || "Distance"}
          </p>

          <p className="text-xs text-gray-400 line-clamp-2 mb-4">
            {formData.description || "Report description. Lorem ipsum dolor sit amet, consectetur adip..."}
          </p>

          {/* location */}
          <div className="bg-[#272133] border border-white/5 p-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-xs text-white truncate">{formData.location || "Location Name"}</span>
              <span className="text-[11px] text-gray-400 truncate">{formData.location || "Location address"}</span>
            </div>
          </div>
        </div>

        {/* go back button */}
        <div className="w-full">
          <button 
            type="button"
            onClick={onClose}
            className="w-full bg-transparent border border-white/40 text-white py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-white/10 cursor-pointer">
            Go back
          </button>
        </div>

      </div>
    </div>
  );
}