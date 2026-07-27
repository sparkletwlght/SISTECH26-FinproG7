"use client";

import MobileContainer from "@/components/MobileContainer";
import HeaderNav from "@/components/HeaderNav";
import Button from "@/components/Button";
import Link from "next/link";
import { ArrowRight, Home, MapPin, PhoneCall, FileText } from "lucide-react";

export default function DashboardPage() {
  return (
    <MobileContainer>
      <div className="flex-1 flex flex-col justify-between overflow-y-auto pb-16 -mx-6 px-6">
        <HeaderNav backUrl="/login" title="Welcome, User" />
        
        <div className="flex justify-center my-2">
          <button className="w-36 h-36 rounded-full border-4 border-gray-300 bg-white flex items-center justify-center shadow-md active:scale-95 hover:border-red-400 transition-all group">
            <span className="text-2xl font-bold tracking-widest text-gray-700 group-hover:text-red-500">
              SOS
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 my-4">
          <Button variant="outline">Share Location</Button>
          <Button variant="outline">Quick Call</Button>
          <Button variant="outline">Nearby Help</Button>
          <Button variant="outline">Safety Tips</Button>
        </div>

        <div className="mt-2">
          <Link href="/map" className="block group">
            <div className="flex items-center space-x-2 mb-2 w-fit">
              <span className="font-semibold text-gray-800 text-sm group-hover:text-purple-600 transition-colors">Map</span>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:translate-x-1 group-hover:text-purple-600 transition-transform" />
            </div>
            <div className="w-full h-36 bg-slate-200 rounded-2xl relative overflow-hidden border border-gray-200 flex items-center justify-center cursor-pointer hover:border-purple-300 transition-colors">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute w-full h-2 bg-gray-300 rotate-45 top-1/2 -left-4"></div>
              <div className="absolute w-full h-2 bg-gray-300 -rotate-12 top-1/3"></div>
              <div className="w-5 h-5 bg-slate-600 rounded-full border-2 border-white shadow-md z-10 animate-pulse"></div>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-4 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-2 border border-purple-100 flex items-center justify-around shadow-md">
          <Link href="/dashboard" className="flex flex-col items-center bg-purple-100 text-purple-900 px-4 py-1.5 rounded-full">
            <Home className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Home</span>
          </Link>

          <Link href="/map" className="flex flex-col items-center text-gray-500 hover:text-purple-600 px-3 py-1.5 transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">Map</span>
          </Link>

          <Link href="/contacts" className="flex flex-col items-center text-gray-500 hover:text-purple-600 px-3 py-1.5 transition-colors">
            <PhoneCall className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">Contacts</span>
          </Link>

          <Link href="/reports" className="flex flex-col items-center text-gray-500 hover:text-purple-600 px-3 py-1.5 transition-colors">
            <FileText className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">Reports</span>
          </Link>
        </div>
      </div>
    </MobileContainer>
  );
}