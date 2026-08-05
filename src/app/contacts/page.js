'use client';

import { useState, useEffect } from "react";
import { Phone, MessageCircle, UserPlus, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import AddContact from "@/components/AddContact";
import { supabase } from "@/services/supabase";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [hotlines, setHotlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", relationship: "", image: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: hotlineData } = await supabase.from("hotlines").select("*");
        const { data: contactData } = await supabase.from("trusted_contacts").select("*");

        setHotlines(hotlineData || []);
        setContacts(contactData || []);
      } catch (err) {
        console.error("Terjadi kesalahan:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddContact = async (e, updatedFormData) => {
    e.preventDefault();
    const dataToSubmit = updatedFormData || formData;

    if (!dataToSubmit.name || !dataToSubmit.phone) return;

    if (contacts.length >= 5) {
      alert("Maksimal hanya 5 contact person!");
      return;
    }

    const { data, error } = await supabase
      .from("trusted_contacts")
      .insert([dataToSubmit])
      .select();

    if (error) {
      alert("Gagal menyimpan kontak: " + error.message);
    } else if (data) {
      setContacts([...contacts, data[0]]);
      setFormData({ name: "", phone: "", relationship: "", image: "" });
      setIsModalOpen(false);
    }
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

        {/* Contacts List */}
        <div className="max-w-5xl mx-auto space-y-5">
          {loading ? (
            <p className="text-center text-gray-400 py-10">Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p className="text-center text-gray-400 py-6">Belum ada trusted contact.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id}
                className="flex items-center justify-between border-b border-gray-100 pb-5 pt-3 px-4 transition-colors hover:bg-gray-50/50 rounded-xl">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 overflow-hidden border border-gray-200">
                    {contact.image ? (
                      <img src={contact.image} alt={contact.name} className="h-full w-full object-cover" />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-400">{contact.phone}</p>
                    <p className="text-sm text-gray-400">{contact.relationship}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a href={`tel:${contact.phone}`} aria-label="Call contact"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-transform hover:scale-105">
                    <Phone size={18} />
                  </a>
                  <a href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer" aria-label="Message contact"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-transform hover:scale-105">
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            ))
          )}

          {/* Add contact button */}
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

      {/* Hotlines Section */}
      <div className="max-w-5xl mx-auto w-full mt-20 border-t border-gray-200 pt-10 mb-4">
        <h3 className="text-center text-base font-semibold uppercase tracking-wider text-gray-400 mb-8">
          Hotlines
        </h3>

        <div className="space-y-5">
          {hotlines.map((hotline) => {
            const isYourGuard = hotline.name.toLowerCase().includes("guard");
            return (
              <div key={hotline.id} className="flex items-center justify-between px-4 py-3">
                <span className="text-base font-bold text-gray-900">{hotline.name}</span>
                <a href={`tel:${hotline.number}`} 
                  className="rounded-full bg-gradient-to-r from-[#ff4191] to-[#ff60b6] px-6 py-2 text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-transform hover:scale-105 text-center">
                  {isYourGuard ? "CALL US" : `CALL ${hotline.number}`}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Add Contact */}
      <AddContact
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddContact}
      />
    </div>
  );
}