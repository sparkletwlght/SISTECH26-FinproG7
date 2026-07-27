'use client';

import Link from 'next/link';
import BottomNav from '../BottomNav';

export default function ContactsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight text-black">Contacts</h1>
              <p className="text-sm text-gray-600 mt-1">Description</p>
            </div>
          </div>
          <button className="text-xl font-bold text-black pt-1 px-2">⋮</button>
        </header>

        <main className="flex-1 p-5 space-y-8">
        
          <div className="space-y-6">
            <h2 className="text-2xl font-normal text-center text-black">
              My Close Contacts
            </h2>

            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 pb-6 border-b border-gray-200"
                >
                  <div className="w-20 h-20 bg-[#e5e3eb] rounded-2xl shrink-0"></div>

                  <div>
                    <h3 className="text-xl font-normal text-black">Contact Name</h3>
                    <p className="text-sm text-gray-600 mt-0.5">08**********</p>
                    <p className="text-sm text-gray-600">Relationship</p>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 pb-6 border-b border-gray-200 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-20 h-20 bg-[#e5e3eb] rounded-2xl shrink-0 flex items-center justify-center text-gray-400 text-4xl font-light">
                  +
                </div>

                <div>
                  <h3 className="text-xl font-normal text-black">Add Contact</h3>
                  <p className="text-sm text-gray-600 mt-0.5">Max. 5 contacts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-6 text-center">
            <h2 className="text-2xl font-normal text-black">Hotlines</h2>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-normal text-black">Hotline Name</h3>
              
              <button className="w-[400px] mx-auto h-[50px] flex items-center justify-center text-[18px] border border-gray-400 rounded-full">
                CALL ***
              </button>
            </div>
          </div>

        </main>
      </div>

      <BottomNav activeTab="contacts" />
    </div>
  );
}