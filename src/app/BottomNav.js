'use client';

import Link from 'next/link';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaUserFriends, 
  FaExclamationTriangle 
} from 'react-icons/fa'; 

export default function BottomNav({ activeTab }) {
  const navs = [
    { name: 'Home', path: '/dashboard', key: 'home', icon: FaHome },
    { name: 'Map', path: '/map', key: 'map', icon: FaMapMarkerAlt },
    { name: 'Contacts', path: '/contacts', key: 'contacts', icon: FaUserFriends },
    { name: 'Reports', path: '/reports', key: 'reports', icon: FaExclamationTriangle },
  ];

  return (
    <footer className="sticky bottom-0 z-50 w-full bg-[#f9f8fa] border-t border-gray-200/60 py-4 px-4">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 text-center">
        {navs.map((nav) => {
          const isActive = activeTab === nav.key;
          const IconComponent = nav.icon;

          return (
            <Link
              key={nav.key}
              href={nav.path}
              className="flex flex-col items-center justify-center gap-1 group no-underline text-inherit select-none cursor-pointer"
            >
              <div
                className={`w-16 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#e8e6f0]' : 'bg-transparent'
                }`}
              >
                <IconComponent
                  className={`text-xl transition-colors ${
                    isActive ? 'text-[#38373d]' : 'text-gray-500'
                  }`}
                />
              </div>
              <span
                className={`text-xs font-medium no-underline ${
                  isActive ? 'text-[#1c1b1f] font-semibold' : 'text-gray-500'
                }`}
              >
                {nav.name}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}