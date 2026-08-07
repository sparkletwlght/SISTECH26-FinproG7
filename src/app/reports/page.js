'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MapBackground from "@/components/MapBackground";
import OngoingRoutePopup from "@/components/OngoingRoutePopup";
import ReportItem from "@/components/ReportItem";
import { supabase } from "@/services/supabase";
import Footer from "@/components/Footer";

export default function ReportsPage() {
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error("gagal ambil data:", error);
      } else {
        setReportList(data || []);
      }
      setLoading(false);
    }

    fetchReports();

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); 
  };

  const handleShuffle = () => {
    setReportList((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const filteredReports = reportList.filter((report) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      report.title?.toLowerCase().includes(query) ||
      report.location?.toLowerCase().includes(query) ||
      report.description?.toLowerCase().includes(query);

    const matchesStatus = selectedStatus === "All" || report.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <MapBackground>
      <Navbar />

      <div className="pt-[280px] px-6 md:px-16 max-w-7xl mx-auto flex flex-col relative">

        <div className="relative pb-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
            <p className="text-sm text-gray-600 mt-1">
              Explore safety updates, risk alerts, and incident reports shared anonymously by users in your community.
            </p>
          </div>

          <div className="hidden lg:block absolute -top-[160px] right-0 w-[345px] z-30">
            <OngoingRoutePopup isLight={true} />
          </div>

          <div className="lg:hidden mt-6 w-full">
            <OngoingRoutePopup isLight={true} />
          </div>
        </div>

        {/* search bar dengan icon pink di dalamnya */}
        <div className="flex items-center gap-3 mt-2 relative">
          <div className="flex-1 max-w-md relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text"
              placeholder="search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <button 
            onClick={handleShuffle}
            title="shuffle reports"
            className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              title="filter status"
              className={`p-2.5 rounded-full border shadow-sm cursor-pointer transition-colors ${selectedStatus !== "All" ? "bg-pink-50 text-pink-500 border-pink-300" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">filter by status</div>
                {["All", "Safe", "Caution", "Dangerous"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${selectedStatus === status ? "bg-pink-50 text-pink-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedStatus !== "All" && (
          <div className="mt-2 text-xs text-pink-600 font-medium">
            showing status: {selectedStatus} <button onClick={() => setSelectedStatus("All")} className="underline ml-1 cursor-pointer">reset</button>
          </div>
        )}

        <div className="flex flex-col mt-4">
          {loading ? (
            <p className="py-8 text-sm text-gray-500">loading reports...</p>
          ) : filteredReports.length === 0 ? (
            <p className="py-8 text-sm text-gray-500">no reports found.</p>
          ) : (
            filteredReports.slice(0, visibleCount).map((report) => (
              <ReportItem key={report.id} report={report} />
            ))
          )}
        </div>

        <div className="flex flex-col items-center pb-20 gap-4 py-10">
          {visibleCount < filteredReports.length && (
            <button 
              onClick={handleLoadMore}
              className="px-6 py-2.5 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
              load more
            </button>
          )}
        </div>

        {/* new report melayang */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <Link
            href="/anonymous"
            className="px-8 py-3 rounded-full text-white font-semibold text-sm bg-pink-500 shadow-lg shadow-pink-500/30 hover:bg-pink-600 hover:shadow-pink-500/50 transition-all text-center flex items-center justify-center">
            New Report
          </Link>
        </div>

      </div>
      <div className="relative z-20 mt-12">
         <Footer />
       </div>
    </MapBackground>
  );
}