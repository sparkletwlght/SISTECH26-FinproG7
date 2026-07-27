'use client';

import Link from 'next/link';
import BottomNav from '../BottomNav';

export default function DashboardPage() {
  const menu = [
    { name: 'Map', desc: 'Find nearby safe zones', path: '/map', icon: '📍' },
    { name: 'Contacts', desc: 'Your close contacts & hotlines', path: '/contacts', icon: '👥' },
    { name: 'Reports', desc: 'Active alerts near you', path: '/reports', icon: '⚠️' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-black">
      <header className="p-4 border-b w-full">
        <h1 className="text-xl font-bold">ByHerSide</h1>
      </header>

      <main className="flex-1 w-full p-4 space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="flex items-center gap-3 p-4 border rounded-2xl hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          </Link>
        ))}
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
