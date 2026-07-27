'use client';

import Link from 'next/link';
import BottomNav from '../BottomNav';

export default function ReportsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight text-black">Reports</h1>
              <p className="text-sm text-gray-600 mt-1">Description</p>
            </div>
          </div>
          <button className="text-xl font-bold text-black pt-1 px-2">⋮</button>
        </header>

        <main className="flex-1 p-5 space-y-6">
        
          <div className="flex justify-between items-center pt-2">
            <h2 className="text-2xl font-normal text-black">Active Alerts</h2>
            <Link 
              href="/map"
              className="w-[50px] h-[50px] rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium text-black no-underline hover:bg-gray-50 transition-colors"
            >
              Map
            </Link>
          </div>

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

          <div className="space-y-8">
            {[1, 2].map((_, i) => (
              <div key={i} className="space-y-4 pb-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-[#e5e3eb] rounded-2xl shrink-0"></div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-normal text-black">Report Title</h3>
                    <p className="text-xs text-gray-600">
                      Time reported • Distance
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed pt-1">
                      Report description. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Vivamus malesuada lacus nec rutrum dapibus.
                      Phasellus eget elit eu purus viverra pharetra.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#f4f3f8] rounded-2xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#e5e3eb] rounded-xl shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-black">Place Name</h4>
                    <p className="text-xs text-gray-500">Location name</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 pb-6">
            <button className="w-full h-[50px] flex items-center justify-center text-[18px] border border-gray-400 rounded-full text-black hover:bg-gray-50 transition-colors">
              Report
            </button>
          </div>

        </main>
      </div>

      <BottomNav activeTab="reports" />
    </div>
  );
}