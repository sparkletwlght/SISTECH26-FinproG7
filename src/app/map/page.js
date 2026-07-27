'use client';

import Link from 'next/link';
import BottomNav from '../BottomNav';

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1c1b1f]">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-white">
        
        <header className="p-4 pt-6 flex items-start justify-between bg-white">
          <div className="space-y-3">
            <Link 
              href="/dashboard" 
              className="inline-block text-2xl font-black text-black no-underline select-none cursor-pointer hover:opacity-70 transition-opacity"
            >
              ←
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black">Map</h1>
              <p className="text-sm text-gray-600 mt-1">Description</p>
            </div>
          </div>
          <button className="text-xl font-bold text-black pt-1 px-2">⋮</button>
        </header>

        <div className="w-full h-80 bg-[#dcdbe5] relative overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full opacity-40 stroke-gray-500 stroke-[5]" fill="none">
            <path d="M-20 40 L120 180 L200 400" />
            <path d="M120 180 L350 20 L450 100" />
            <path d="M180 0 L150 120 L300 280 L400 320" />
            <path d="M0 250 L180 160 L280 200 L380 180" />
            <path d="M220 120 L280 30" />
            <path d="M80 300 L250 280 L320 380" />
          </svg>

          <div className="absolute w-7 h-7 bg-[#5e5b6e] rounded-full border-2 border-white shadow-md"></div>
        </div>

        <main className="flex-1 p-5 space-y-6">
          <h2 className="text-2xl font-normal text-center text-black">Safe Zones</h2>

          <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar">
            {['Filter', 'Filter', 'Filter', 'Filter'].map((f, i) => (
              <button
                key={i}
                style={{
                    borderRadius: '16px',
                    backgroundColor: '#f4f3f8',
                    border: '1px solid #e0e0e0',
                    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.08)',
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#000',
                    flexShrink: 0
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">

                <div className="w-20 h-20 bg-[#e5e3eb] rounded-2xl shrink-0"></div>

                <div>
                  <h3 className="text-xl font-normal text-black">Place Name</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Category • $$ • 1.2 miles away
                  </p>
                  <p className="text-xs text-gray-500">Distance</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="w-[50px] h-[50px] rounded-full border border-gray-400 flex items-center justify-center text-xs text-black font-medium hover:bg-gray-50">
                  Call
                </button>
                <button className="w-[50px] h-[50px] rounded-full border border-gray-400 flex items-center justify-center text-xs text-black font-medium hover:bg-gray-50">
                  Route
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">

                <div className="w-20 h-20 bg-[#e5e3eb] rounded-2xl shrink-0"></div>

                <div>
                  <h3 className="text-xl font-normal text-black">Place Name</h3>
                  <p className="text-xs text-gray-500 mt-1">Distance</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="w-[50px] h-[50px] rounded-full border border-gray-400 flex items-center justify-center text-xs text-black font-medium hover:bg-gray-50">
                  Call
                </button>
                <button className="w-[50px] h-[50px] rounded-full border border-gray-400 flex items-center justify-center text-xs text-black font-medium hover:bg-gray-50">
                  Route
                </button>
              </div>
            </div>

          </div>

          <div className="pt-2 pb-6">
            <button className="w-[400px] mx-auto h-[50px] flex items-center justify-center text-[18px] border border-gray-400 rounded-full">
                Guide Me to Nearest Safe Zone
            </button>
          </div>
        </main>
      </div>

      <BottomNav activeTab="map" />
    </div>
  );
}