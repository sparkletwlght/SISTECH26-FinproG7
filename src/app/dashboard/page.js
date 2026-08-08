'use client';

<<<<<<< Updated upstream
import { useState, useEffect } from "react";
=======
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
>>>>>>> Stashed changes
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MapBackground from "@/components/MapBackground";
import SosPopup from "@/components/SosPopup";
import ReportItem from "@/components/ReportItem";
import { supabase } from "@/services/supabase";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .order("id", { ascending: false })
          .limit(3); // 3 laporan terbaru untuk sneak peak dashboard

        if (error) throw error;
        setReports(data || []);
      } catch (err) {
        console.error("Gagal memuat reports:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  return (
    <>
      <MapBackground variant="dashboard">
        <Navbar />

        {/* Main Container */}
        <div className="pt-[460px] px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col relative">

          <div className="relative pb-4">
            <div className="hidden lg:block absolute -top-[360px] left-0 w-[380px] z-30">
              <SosPopup />
            </div>

            <div className="lg:hidden mb-6 w-full">
              <SosPopup />
            </div>
          </div>

          {/* quick action */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-4 mb-14 relative z-30">
            <Link href="/call" className="px-7 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/30 hover:opacity-95 transition cursor-pointer">
              Quick Call
            </Link>
            <Link href="/map" className="px-7 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/30 hover:opacity-95 transition cursor-pointer">
              Route Planner
            </Link>
            <Link href="/contacts" className="px-7 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/30 hover:opacity-95 transition cursor-pointer">
              Trusted Contacts
            </Link>
            <Link href="/anonymous" className="px-7 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/30 hover:opacity-95 transition cursor-pointer">
              Report Incident
            </Link>
          </div>

          {/* recent reports */}
          <div className="w-full pb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Recent Reports</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Stay updated with real-time safety alerts and community reports near your location.
                </p>
              </div>
              <Link href="/reports" className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition cursor-pointer">
                View All →
              </Link>
            </div>

            {/* report list / grid menggunakan komponen ReportItem */}
            {loading ? (
              <p className="text-center text-gray-400 py-10">Loading reports...</p>
            ) : reports.length === 0 ? (
              <p className="text-center text-gray-400 py-10">Belum ada laporan saat ini.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reports.map((item) => (
                  <ReportItem key={item.id} report={item} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </MapBackground>
    </>
  );
}