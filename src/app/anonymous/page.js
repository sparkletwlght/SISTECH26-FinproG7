// app/anonymous/page.jsx
'use client';

import { useState, useEffect, useRef } from "react"; 
import { Calendar as CalendarIcon, UploadCloud, AlertCircle, Check, ChevronDown, Search } from "lucide-react"; 
import Navbar from "@/components/Navbar";

export default function AnonymousReportPage() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    dateTime: "",
    description: "",
    severity: "Dangerous",
  });

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  // fitur custom searchable dropdown location
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationRef = useRef(null);

  // nutup dropdown kalo user klik di luar area kotak location
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // dummy data lokasi dropdown location-nya terisi & bisa jalan waktu dites
  useEffect(() => {
    setLocations([
      { name: "Lobby Utama" },
      { name: "Lantai 2 - Area IT" },
      { name: "Parkiran Basement" }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiPayload = new FormData();
      apiPayload.append("title", formData.title);
      apiPayload.append("location", formData.location);
      apiPayload.append("dateTime", formData.dateTime);
      apiPayload.append("description", formData.description);
      apiPayload.append("severity", formData.severity);

      files.forEach((file, index) => {
        apiPayload.append(`evidence_${index}`, file);
      });

      console.log(Object.fromEntries(apiPayload));

      const res = await fetch('https://jsonplaceholder.typicode.com/posts', { 
        method: 'POST', 
        body: apiPayload 
      });
      
      if (!res.ok) throw new Error('Failed');

      alert("Success!");

      setFormData({ title: "", location: "", dateTime: "", description: "", severity: "Dangerous" });
      setFiles([]);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error submitting report!");
      setIsLoading(false);
    }
  };

  return (
    // Tanpa MapBackground, jadi murni putih polos ke bawah
    <div className="min-h-screen w-full bg-white text-gray-800">
      <Navbar />

      <div className="pt-28 sm:pt-32 max-w-5xl mx-auto w-full pb-20 px-4 sm:px-8">
        
        {/* header */}
        <div className="mb-10 border-b border-gray-100 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Anonymous Report
          </h1>
          <p className="text-sm text-gray-500">
            Submit a safety report or incident confidentially. Your identity is 100% protected and will never be shared.
          </p>
        </div>

        {/* main form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            
            {/* title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Input"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all placeholder-gray-400 bg-white" />
            </div>

            {/* location */}
            <div className="flex flex-col gap-2 relative" ref={locationRef}>
              <label className="text-sm font-semibold text-gray-800">Location</label>
              
              <div 
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all bg-white flex justify-between items-center cursor-pointer ${
                  isLocationOpen ? 'ring-2 ring-pink-400/50 border-pink-400' : 'border-gray-200'
                }`}>
                <span className={formData.location ? "text-gray-800" : "text-gray-400"}>
                  {formData.location || "Select Location"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
              </div>

              {isLocationOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 flex flex-col overflow-hidden">
                  <div className="flex items-center px-3 py-2 border-b border-gray-100 bg-gray-50">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search location..." 
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full text-sm bg-transparent focus:outline-none py-1 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {locations
                      .filter(loc => (loc.name || loc.lokasi).toLowerCase().includes(locationSearch.toLowerCase()))
                      .map((loc, index) => (
                        <div 
                          key={index}
                          onClick={() => {
                            handleChange({ target: { name: 'location', value: loc.name || loc.lokasi } });
                            setIsLocationOpen(false);
                            setLocationSearch("");
                          }}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 cursor-pointer transition-colors"
                        >
                          {loc.name || loc.lokasi}
                        </div>
                      ))}
                    {locations.filter(loc => (loc.name || loc.lokasi).toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-400 text-center">Location not found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* time & date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-800">Time & Date</label>
              <div className="relative">
                <input type="text" onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)} name="dateTime" value={formData.dateTime} onChange={handleChange} placeholder="dd/mm/yy"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all text-gray-500 bg-white" />
                {!formData.dateTime && (
                  <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>
          </div>

          {/* report desc */}
          <div className="flex flex-col gap-2 w-full border-t border-gray-100 pt-6">
            <label className="text-sm font-semibold text-gray-800">Report Description</label>
            <textarea name="description" rows={5} value={formData.description} onChange={handleChange} placeholder="Input description of the incident..."
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all placeholder-gray-400 resize-none bg-white" />
          </div>

          {/* report severity */}
          <div className="flex flex-col gap-4 w-full border-t border-gray-100 pt-6">
            <label className="text-sm font-semibold text-gray-800">Report Severity</label>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-gray-700">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="severity" value="Safe" checked={formData.severity === "Safe"} onChange={handleChange}
                  className="accent-pink-500 w-4 h-4 cursor-pointer" /> Safe
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="severity" value="Approach with caution" checked={formData.severity === "Approach with caution"} onChange={handleChange}
                  className="accent-pink-500 w-4 h-4 cursor-pointer" /> Approach with caution
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="severity" value="Dangerous" checked={formData.severity === "Dangerous"} onChange={handleChange}
                  className="accent-pink-500 w-4 h-4 cursor-pointer" /> Dangerous
              </label>
            </div>
          </div>

          {/* report evidence */}
          <div className="flex flex-col gap-2 w-full border-t border-gray-100 pt-6">
            <label className="text-sm font-semibold text-gray-800">Report Evidence</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl py-12 text-center hover:border-pink-300 transition-colors bg-white group w-full">
              <input type="file" multiple onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center justify-center pointer-events-none space-y-3">
                <p className="text-sm text-gray-400"> Choose a file or drag file here </p>
                <UploadCloud className="w-6 h-6 text-pink-400" />
                <button type="button" className="px-5 py-2 border border-pink-400 text-pink-500 text-sm font-medium rounded-lg group-hover:bg-pink-50 transition-colors flex items-center gap-2">
                  Browse Files
                </button>
                {files.length > 0 && (
                  <p className="text-xs text-pink-600 font-semibold mt-2">
                    {files.length} file(s) selected
                  </p>
                )}
              </div>
            </div>          
          </div>

          {/* live prev */}
          <div className="flex flex-col gap-6 w-full border-t border-gray-200 pt-8 mt-4">
            <h2 className="text-xl font-bold text-pink-500">Preview</h2>
            
            <div className="flex flex-row gap-4 sm:gap-6 w-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
                 <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-lg"></div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                
                <div className="flex flex-row items-start justify-between gap-3 w-full">
                  <div>
                    <h3 className="font-bold text-pink-600 text-lg">
                      {formData.title || "Report Title"}
                    </h3>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">
                      {formData.dateTime ? new Date(formData.dateTime).toLocaleDateString() : "Time reported"} • {formData.location || "Distance"}
                    </p>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full border w-fit ${
                    formData.severity === "Dangerous" ? "text-red-500 border-red-500 bg-white" :
                    formData.severity === "Approach with caution" ? "text-yellow-500 border-yellow-500 bg-white" :
                    "text-green-500 border-green-500 bg-white"
                  }`}>
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formData.severity}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed max-w-4xl">
                  {formData.description || "Report description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada lacus nec rutrum dapibus. Phasellus eget elit eu purus viverra pharetra."}
                </p>

                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl w-full sm:w-72 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                     <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-sm text-gray-800 truncate"> Location Name </span>
                    <span className="text-xs text-gray-400 truncate"> {formData.location || "Location address"} </span>
                  </div>
                </div>
                
                {/* dummy photo */}
                <div className="grid grid-cols-3 sm:flex sm:flex-row gap-2 sm:gap-4 pt-2">
                  <div className="aspect-video sm:w-32 sm:h-24 border border-gray-200 rounded-xl bg-white shadow-sm"></div>
                  <div className="aspect-video sm:w-32 sm:h-24 border border-gray-200 rounded-xl bg-white shadow-sm"></div>
                  <div className="aspect-video sm:w-32 sm:h-24 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium bg-gray-50 shadow-sm">
                    +3 more
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* submit button */}
          <div className="w-full flex justify-center pt-8 pb-10">
            <button type="submit" disabled={isLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer">
              {isLoading ? "Submitting..." : "Submit Anonymous Report"}
              <Check className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}