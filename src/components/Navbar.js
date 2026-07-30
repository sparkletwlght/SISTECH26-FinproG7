"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Settings } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const darkPages = ["/map", "/dashboard", "/reports"];
  const isDarkPage = darkPages.includes(pathname);

  const navItems = [
    { href: "/dashboard", label: "Home" },
    { href: "/map", label: "Map" },
    { href: "/contacts", label: "Contacts" },
    { href: "/reports", label: "Reports" },
  ];

  return(
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[420px] sm:max-w-4xl transition-all duration-300">
      <nav className={`flex items-center justify-between px-6 py-1 rounded-full transition-all duration-300 ${
        isDarkPage ? "bg-gradient-to-r from-[#31203d]/60 via-[#463057]/40 to-[#31203d] backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/45"
          : "bg-gradient-to-r from-white/80 via-pink-50/70 to-white/80 backdrop-blur-md backdrop-saturate-150 border border-pink-200/60 shadow-lg shadow-pink-500/5"
      }`}>
          <div className="flex items-center">
            <div className={`p-2 rounded-full transition-all ${
              isDarkPage ? "text-white/80 hover:text-white hover:bg-white/10"
              : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
            }`}>
              <img 
                src={isDarkPage ? "/logo-pink.png" : "/logo-fullpink.png"} 
                alt="Logo" 
                className="w-7 h-10 object-contain scale-125" 
              />
            </div>
          </div>

          <div className="flex items-center gap-8 sm:gap-10">
            <div className="flex items-center gap-4 sm:gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

              return(
                <Link key={item.href} href={item.href} className={`text-xs sm:text-base font-medium transition-colors ${
                  isActive ? "text-[#FF538A] font-semibold" : isDarkPage ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-950"
                }`}>
                  {item.label}
                </Link>
              );
              })}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* <button type="button" className={`p-1.5 sm:p-2 transition-all ${
                isDarkPage ? "text-white/70 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
              }`}>
                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button> */}
              <Link href="/settings" type="button" className={`p-1.5 sm:p-2 transition-all ${
                isDarkPage ? "text-white/70 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
              }`}>
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
      </nav>
    </header>
  );
}