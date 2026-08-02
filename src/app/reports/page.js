// app/reports/page.jsx
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MapBackground from "@/components/MapBackground";
import OngoingRoutePopup from "@/components/OngoingRoutePopup";

const reports = [
  { status: "Safe" },
  { status: "Caution" },
  { status: "Dangerous" },
];

const statusStyle = {
  Safe: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Caution: "bg-amber-50 text-amber-600 border-amber-200",
  Dangerous: "bg-red-50 text-red-600 border-red-200",
};

export default function ReportsPage() {
  return (
    <MapBackground>
      <Navbar />

      {/* Konten Utama */}
      <div className="pt-[280px] px-6 md:px-16 max-w-7xl mx-auto flex flex-col relative">

        {/* Bagian Atas: Teks Reports & Card On-going Route Absolute */}
        <div className="relative pb-6">
          
          {/* Teks Reports di Kiri */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
            <p className="text-sm text-gray-600 mt-1">
              Explore safety updates, risk alerts, and incident reports shared anonymously by users in your community.
            </p>
          </div>

          {/* Card On-going Route dikunci pakai absolute di kanan atas khusus layar besar */}
          <div className="hidden lg:block absolute -top-[160px] right-0 w-[345px] z-30">
            <OngoingRoutePopup isLight={true} />
          </div>

          {/* Versi Mobile / Tablet di bawah teks */}
          <div className="lg:hidden mt-6 w-full">
            <OngoingRoutePopup isLight={true} />
          </div>

        </div>

        {/* Baris Tombol Aksi / Filter */}
        <div className="flex items-center gap-3 mt-2">
          <button className="p-2.5 rounded-full bg-pink-500 text-white shadow-md cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
          </button>
          <button className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          </button>
        </div>

        {/* Daftar List Laporan */}
        <div className="flex flex-col mt-4">
          {reports.map((report, i) => (
            <div key={i} className="py-6 border-t border-gray-200">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0"></div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-base font-bold text-pink-500">Report Title</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Time reported • Distance</p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 border text-xs font-semibold rounded-full ${statusStyle[report.status]}`}>
                      {report.status}
                    </span>
                  </div>

                  <p className="text-sm mt-2 text-gray-600">
                    Report description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada lacus nec rutrum dapibus. Phasellus eget elit eu purus viverra pharetra.
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 shrink-0"></div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">Location Name</h4>
                      <p className="text-[11px] text-gray-400">Location address</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3 max-w-md">
                    <div className="h-16 rounded-lg border border-gray-200 bg-gray-50/50"></div>
                    <div className="h-16 rounded-lg border border-gray-200 bg-gray-50/50"></div>
                    <div className="h-16 rounded-lg border border-gray-200 bg-gray-50/50 flex items-center justify-center text-xs font-semibold text-gray-400">
                      +3 more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Load More & New Report */}
        <div className="flex flex-col items-center gap-6 py-10">
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            Load more
          </button>

          <Link
            href="/anonymous"
            className="px-8 py-3.5 rounded-full text-white font-semibold text-base bg-pink-500 shadow-lg shadow-pink-500/30 hover:bg-pink-600 hover:shadow-pink-500/50 transition-all text-center">
            New Report
          </Link>
        </div>

      </div>
    </MapBackground>
  );
}