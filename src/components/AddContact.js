'use client';

import { useState } from "react";
import { Upload, Phone, MessageCircle, Send, Plus, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/services/supabase";

export default function AddContact({ isOpen, onClose, formData, setFormData, onSubmit }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const selectedPlatform = formData.platform || "whatsapp";

  const handlePlatformChange = (platformId) => {
    setFormData({ ...formData, platform: platformId });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitWithImage = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image_url || "";

      // Kalau user milih file gambar baru, upload ke Supabase Storage
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('contact-avatars') // Pastikan nama bucket lu sesuai di Supabase
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicURLData } = supabase.storage
          .from('contact-avatars')
          .getPublicUrl(filePath);

        imageUrl = publicURLData.publicUrl;
      }

      const updatedFormData = { ...formData, image_url: imageUrl };
      setFormData(updatedFormData);

      await onSubmit(e, updatedFormData);
      setFile(null);
    } catch (error) {
      alert("Gagal mengupload gambar: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-[28px] bg-[#2b2533] p-5 text-white shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/25 transition-colors cursor-pointer">
          <X size={15} />
        </button>

        <h3 className="text-base font-bold text-white mb-3 text-center">Add Trusted Contacts</h3>

        <form onSubmit={handleSubmitWithImage} className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1">Name</label>
            <input 
              type="text" 
              required 
              placeholder="Input name" 
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1">Number</label>
            <input 
              type="text" 
              required 
              placeholder="Input phone number" 
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-white/80 mb-1">Profile Picture</label>
            <label className="border border-dashed border-white/20 rounded-xl p-3 text-center bg-white flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition-colors">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <p className="text-[10px] text-gray-400 mb-1.5 truncate max-w-[200px]">
                {file ? file.name : "Choose a file or drag file here"}
              </p>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-pink-200 text-pink-500 bg-white shadow-sm text-[11px] font-semibold">
                <Upload size={11} />
                <span>Browse Files</span>
              </div>
            </label>
          </div>

          <div>
            <p className="text-[10px] font-medium text-white/80 text-center mb-2">What platform are they most active?</p>
            <div className="flex justify-center gap-2">
              {[
                { id: "phone", icon: Phone },
                { id: "chat", icon: MessageCircle },
                { id: "telegram", icon: Send },
                { id: "whatsapp", icon: FaWhatsapp },
              ].map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedPlatform === item.id;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePlatformChange(item.id)}
                    className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected 
                        ? "border-pink-500 text-pink-500 bg-pink-500/10 scale-105" 
                        : "border-white/20 text-white/70 hover:border-white/40"
                    }`}>
                    <Icon size={14} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <button 
              type="submit"
              disabled={uploading}
              className="w-full flex items-center justify-center gap-1.5 rounded-full border border-pink-500 py-2 text-xs font-bold text-pink-500 bg-transparent hover:bg-pink-500/10 transition-colors cursor-pointer disabled:opacity-50">
              <Plus size={13} />
              <span>{uploading ? "Uploading..." : "Add"}</span>
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="w-full rounded-full border border-white/20 py-2 text-xs font-bold text-white bg-transparent hover:bg-white/10 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}