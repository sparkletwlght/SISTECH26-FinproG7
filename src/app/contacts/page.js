"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, UserPlus, X } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [hotlines, setHotlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", relationship: "" });

  // fetch data dari API endpoint
  useEffect(() => {
    fetch("/api/contacts") //data belum ada
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setContacts(data.contacts || []);
          setHotlines(data.hotlines || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data dari API:", err);
        setLoading(false);
      });
  }, []);

  // post data new contact ke API
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setContacts([...contacts, data.data]);
          setFormData({ name: "", phone: "", relationship: "" });
          setIsModalOpen(false);
        } else {
          alert(data.message || "Gagal menyimpan kontak");
        }
      })
      .catch((err) => {
        console.error("Terjadi kesalahan saat mengirim data ke API:", err);
        alert("Gagal terhubung ke server API.");
      });
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 pt-20 sm:pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto font-sans relative">
      
      <div>
        <div className="flex justify-center w-full mb-8">
          <Navbar />
        </div>

        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-6">
          My Close Contacts
        </h2>

        {/* contacts List */}
        <div className="max-w-5xl mx-auto space-y-5">
          {loading ? (
            <p className="text-center text-gray-400 py-10"> Load data from API...</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id}
                className="flex items-center justify-between border-b border-gray-100 pb-5 pt-3 px-4 transition-colors hover:bg-gray-50/50 rounded-xl">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                    <div className="h-6 w-6 rounded-sm border border-current" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-400">{contact.phone}</p>
                    <p className="text-sm text-gray-400">{contact.relationship}</p>
                  </div>
                </div>

                {/* buttons call & message */}
                <div className="flex items-center gap-3">
                  <button aria-label="Call contact"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-transform hover:scale-105">
                    <Phone size={18} />
                  </button>
                  <button aria-label="Message contact"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-transform hover:scale-105">
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* add contact */}
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={contacts.length >= 5}
            className={`w-full flex items-center justify-between pb-5 pt-3 px-4 transition-colors rounded-xl ${
              contacts.length >= 5 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50/50 cursor-pointer"
            }`}>
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                <UserPlus size={22} />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-900">Add Contact</p>
                <p className="text-sm text-gray-400">Max. 5 contacts ({contacts.length}/5)</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* hotlines data from API */}
      <div className="max-w-5xl mx-auto w-full mt-20 border-t border-gray-200 pt-10 mb-4">
        <h3 className="text-center text-base font-semibold uppercase tracking-wider text-gray-400 mb-8">
          Hotlines
        </h3>

        <div className="space-y-5">
          {hotlines.map((hotline) => (
            <div key={hotline.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-base font-bold text-gray-900">{hotline.name}</span>
              <button className="rounded-full bg-gradient-to-r from-[#ff4191] to-[#ff60b6] px-6 py-2 text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-transform hover:scale-105">
                CALL ***
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* popup add contact */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Contact</h3>

            <form onSubmit={handleAddContact} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Contact Name</label>
                <input type="text" required placeholder="e.g. John Doe" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-900 focus:border-pink-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Phone Number</label>
                <input type="text" required placeholder="e.g. 08123456789" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-900 focus:border-pink-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Relationship</label>
                <input type="text" placeholder="e.g. Parent, Friend, Partner" value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-900 focus:border-pink-500 focus:outline-none" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-full border border-gray-200 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 rounded-full bg-gradient-to-r from-[#ff4191] to-[#ff60b6] py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition-transform hover:scale-105">
                  Save Contact
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}