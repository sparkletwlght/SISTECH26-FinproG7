"use client";

import { useState } from "react";
import {
  X,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Link2,
  Mic,
  Send,
  Phone,
  Building2,
  Cog,
} from "lucide-react";

const PINK = "#E31C79";
const PURPLE = "#453768";
const CREAM = "#FAF9F6";

const contacts = [
  { occupation: "Occupation", name: "Name", info: "Information" },
  { occupation: "Occupation", name: "Name", info: "Information" },
  { occupation: "Occupation", name: "Name", info: "Information" },
  { occupation: "Occupation", name: "Name", info: "Information" },
];

const hotlines = [{ name: "Hotline Name" }, { name: "Hotline Name" }];

const guideOptions = [
  "Guide Option",
  "Guide Option",
  "Guide Option",
  "Guide Option",
];

const evidenceImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop",
];

function ContactCard({ label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
        <Building2 className="h-6 w-6 text-gray-400" strokeWidth={1.5} />
      </div>
      <span className="text-xs font-semibold text-gray-800">{label}</span>
    </div>
  );
}

function ContactRow({ occupation, name, info }) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        <Cog className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-gray-900">{occupation}</p>
        <p className="text-sm text-gray-500">{name}</p>
        <p className="text-sm text-gray-400">{info}</p>
      </div>
    </div>
  );
}

function HotlineRow({ name }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{name}</span>
      <button
        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: PINK }}
      >
        <Phone className="h-3 w-3" strokeWidth={2} />
        CALL ***
      </button>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-6 pb-5 pt-6">
        <h1 className="text-xl font-bold text-gray-900">Recovery Assistant</h1>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          Connect with verified authorities, campus security, or support
          specialists for post-incident help.
        </p>
        <div className="mt-5 flex gap-6">
          <ContactCard label="Contact Name" />
          <ContactCard label="Contact Name" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        {contacts.map((c, i) => (
          <ContactRow key={i} {...c} />
        ))}
      </div>

      <div className="border-t border-gray-100 px-6 py-5">
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
          Hotlines
        </p>
        {hotlines.map((h, i) => (
          <HotlineRow key={i} name={h.name} />
        ))}
      </div>
    </aside>
  );
}

function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Occupation <span className="text-gray-400">•</span> Name
          </p>
          <p className="text-xs text-gray-400">Sent today at 11:45 AM</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  );
}

function IntroCard() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-semibold text-gray-900">
        You are now talking with a recovery assistant.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-gray-400">
        We&rsquo;re here to assist you. Choose how you&rsquo;d like to proceed
        or share details about your incident safely.
      </p>
      <div
        className="mx-auto mt-4 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: "#FCE4EF" }}
      >
        <div
          className="h-5 w-5 rounded-full"
          style={{ backgroundColor: PINK }}
        />
      </div>
      <button
        className="mx-auto mt-4 flex items-center justify-center gap-1.5 rounded-full px-8 py-2 text-sm font-semibold text-white"
        style={{ backgroundColor: PINK }}
      >
        Button
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Timestamp({ children }) {
  return <p className="my-2 text-center text-xs text-gray-400">{children}</p>;
}

function TemplateBubble() {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[280px] rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white"
        style={{ backgroundColor: PURPLE }}
      >
        <p className="font-semibold">Template Text Here</p>
        <div className="mt-2 space-y-1 text-white/70">
          <p className="border-b border-white/20 pb-1">Name:</p>
          <p className="border-b border-white/20 pb-1">Title:</p>
          <p className="border-b border-white/20 pb-1">Date:</p>
          <p className="border-b border-white/20 pb-1">Information:</p>
        </div>
        <p className="mt-3">I would like help with...</p>
      </div>
    </div>
  );
}

function GuideOptionsBubble() {
  return (
    <div className="flex justify-start">
      <div
        className="w-[260px] overflow-hidden rounded-2xl rounded-tl-sm text-sm text-white"
        style={{ backgroundColor: PINK }}
      >
        {guideOptions.map((label, i) => (
          <button
            key={i}
            className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-black/5 ${
              i !== guideOptions.length - 1 ? "border-b border-white/20" : ""
            }`}
          >
            {label}
            <ChevronRight className="h-4 w-4 opacity-80" />
          </button>
        ))}
      </div>
    </div>
  );
}

function TextBubble({ align, color, children }) {
  return (
    <div
      className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[280px] rounded-2xl px-4 py-3 text-sm leading-relaxed text-white ${
          align === "right" ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
}

function EvidenceBubble() {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[280px] rounded-2xl rounded-tr-sm p-3 text-white"
        style={{ backgroundColor: PURPLE }}
      >
        <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
          {evidenceImages.map((src, i) => (
            <div
              key={i}
              className="relative h-20 w-full overflow-hidden bg-white/10"
            >
              <img
                src={src}
                alt="Evidence"
                className="h-full w-full object-cover"
              />
              {i === evidenceImages.length - 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold">
                  +6
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/10 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/90 text-[10px] font-bold">
            PDF
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Evidence.pdf</p>
            <p className="text-xs text-white/60">123 KB</p>
          </div>
        </div>

        <p className="mt-2 text-sm text-white/90">Text here</p>
      </div>
    </div>
  );
}

function YesNoBubble({ onSelect }) {
  return (
    <div className="flex justify-start">
      <div
        className="w-[220px] overflow-hidden rounded-2xl rounded-tl-sm text-sm text-white"
        style={{ backgroundColor: PINK }}
      >
        {["Yes", "No"].map((label, i) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-black/5 ${
              i === 0 ? "border-b border-white/20" : ""
            }`}
          >
            {label}
            <ChevronRight className="h-4 w-4 opacity-80" />
          </button>
        ))}
      </div>
    </div>
  );
}
function ChatInput() {
  const [value, setValue] = useState("");

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3 rounded-full border border-gray-200 px-4 py-2.5">
        <button className="text-gray-400 hover:text-gray-600">
          <Link2 className="h-4 w-4" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <Mic className="h-4 w-4" />
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start chatting"
          className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
        <button
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: PINK }}
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
export default function RecoveryAssistantPage() {
  const [answered, setAnswered] = useState(null);

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />

      <main
        className="flex min-w-0 flex-1 flex-col"
        style={{ backgroundColor: CREAM }}
      >
        <ChatHeader />

        <div className="flex-1 space-y-4 overflow-y-auto px-8 py-6">
          <IntroCard />
          <Timestamp>3:00 PM</Timestamp>

          <TemplateBubble />
          <GuideOptionsBubble />

          <TextBubble align="left" color={PINK}>
            Thank you, your evidence will be collected safely and reviewed by
            our moderation team. Do you need further assistance?
          </TextBubble>

          <EvidenceBubble />

          {!answered ? (
            <YesNoBubble onSelect={setAnswered} />
          ) : (
            <TextBubble align="left" color={PINK}>
              {answered === "Yes"
                ? "Got it — connecting you with the next available specialist."
                : "Understood. We're here whenever you're ready to continue."}
            </TextBubble>
          )}
        </div>

        <ChatInput />
      </main>
    </div>
  );
}
