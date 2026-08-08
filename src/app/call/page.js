"use client";

import { ArrowLeft, MoreVertical, Mic, Volume2, PhoneOff } from "lucide-react";
import Image from "next/image";
const PINK = "#E31C79";
const callData = {
  name: "Name",
  occupation: "Occupation",
  duration: "00:02",
  isMuted: false,
};
function CallControlButton({ icon: Icon, label, tone = "pink", onClick }) {
  const bg =
    tone === "pink"
      ? "bg-[#E31C79]/80 hover:bg-[#E31C79]"
      : "bg-[#E23A3A]/80 hover:bg-[#E23A3A]";

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg backdrop-blur-sm transition-colors ${bg}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

export default function CallPage() {
  return (
    <section
      id="callpage"
      className="relative w-full min-h-dvh flex flex-col overflow-hidden px-4 sm:px-6"
      style={{}}
    >
      <Image
        fill
        priority
        src="/call.png"
        alt="background"
        sizes="100vw"
        className="object-cover object-center pointer-events-none z-0"
      />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-3xl opacity-40" />
      <div className="relative z-10 flex items-center justify-between pt-6">
        <button aria-label="Back" className="text-white/90 hover:text-white">
          <ArrowLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button
          aria-label="More options"
          className="text-white/90 hover:text-white"
        >
          <MoreVertical className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="relative z-10 mt-4 flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Hotline call
        </h1>
        <p className="mt-2 max-w-sm text-sm text-white/80">
          Connected to live emergency calls. Your location is being securely
          monitored.
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2">
        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-b from-white to-white/70 shadow-lg" />

        <div className="mt-3 flex items-center gap-1.5">
          <p className="text-base font-semibold text-gray-900">
            {callData.name}
          </p>
          <Mic className="h-3.5 w-3.5 text-gray-900" strokeWidth={2} />
        </div>
        <p className="text-sm text-gray-800/80">{callData.occupation}</p>

        <p className="mt-8 text-sm font-medium text-gray-900/90">
          {callData.duration}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-5 pb-10">
        <CallControlButton icon={Mic} label="Mute" tone="pink" />
        <CallControlButton icon={Volume2} label="Speaker" tone="pink" />
        <CallControlButton icon={PhoneOff} label="End call" tone="red" />
      </div>
    </section>
  );
}
