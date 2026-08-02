"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Settings } from "lucide-react";

export default function Navbar({ isSidebarOpen }) {
  const pathname = usePathname();
  const darkPages = ["/map", "/dashboard", "/reports"];
  const isDarkPage = darkPages.includes(pathname);
  const isMap = pathname === "/map";

  const navItems = [
    { href: "/dashboard", label: "Home" },
    { href: "/map", label: "Map" },
    { href: "/contacts", label: "Contacts" },
    { href: "/reports", label: "Reports" },
  ];

  return(
    <header className={`flex fixed z-50 transition-all duration-300 px-3 sm:px-6 top-3 md:top-6 inset-x-3 md:inset-x-auto ${
      isMap 
        ? isSidebarOpen 
          ? "justify-center md:left-[420px] md:right-0 md:flex md:justify-center" 
          : "justify-center md:left-0 md:right-0 md:flex md:justify-center"      
        : "justify-center md:left-1/2 md:-translate-x-1/2 md:w-[92%] md:max-w-4xl" 
    }`}>
      <nav className={`flex items-center justify-between px-4 sm:px-6 py-1.5 rounded-full transition-all duration-300 w-full max-w-2xl ${
        isDarkPage 
          ? "bg-[#251838]/60 backdrop-blur-xl border border-white/15 shadow-[0_8px_25px_0_rgba(0,0,0,0.40)]"
          : "bg-gradient-to-r from-white/80 via-pink-50/70 to-white/80 backdrop-blur-md backdrop-saturate-150 border border-pink-200/60 shadow-lg shadow-pink-500/5"
      }`}>
          <div className="flex items-center">
            <div className={`p-1 rounded-full transition-all ${
              isDarkPage ? "text-white/80 hover:text-white hover:bg-white/10"
              : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
            }`}>
              <img 
                src={isDarkPage ? "/logo-pink.png" : "/logo-fullpink.png"} 
                alt="Logo" 
                className="w-6 h-7 object-contain scale-110" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

              return(
                <Link key={item.href} href={item.href} className={`text-[11px] sm:text-xs md:text-sm font-medium transition-colors ${
                  isActive ? "text-[#FF538A] font-semibold" : isDarkPage ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-950"
                }`}>
                  {item.label}
                </Link>
              );
              })}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/settings" type="button" className={`p-1.5 transition-all ${
                isDarkPage ? "text-white/70 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
              }`}>
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
      </nav>
    </header>
  );
}