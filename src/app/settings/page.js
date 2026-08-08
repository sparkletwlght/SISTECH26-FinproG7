"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const settingsMenu = [
  { title: "Account", icon: "/user.svg", route: "/settings/account" },
  {
    title: "Notifications",
    icon: "/ringtone.svg",
    route: "/settings/notifications",
  },
  {
    title: "Privacy & Security",
    icon: "/lock.svg",
    route: "/settings/privacy",
  },
  {
    title: "Appearance",
    icon: "/photo.svg",
    route: "/settings/appearance",
  },
  {
    title: "My History",
    icon: "/history.svg",
    route: "/settings/history",
  },
  {
    title: "Languages",
    icon: "/languages.svg",
    route: "/settings/languages",
  },
  { title: "Help & Support", icon: "/help.svg", route: "/settings/help" },
  {
    title: "Log Out",
    icon: "/logout.svg",
    route: "/login",
    isDanger: true,
  },
];

export default function SettingsPage() {
  const router = useRouter();

  return (
    <section
      id="splashpage"
      className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 py-10 bg-black"
    >
      <Image
        fill
        priority
        src="/sign-up.png"
        alt="background"
        sizes="100vw"
        className="object-cover object-center pointer-events-none z-0"
      />
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
        <div className="w-full flex items-center justify-between text-white/80 mb-6 px-2">
          <button
            onClick={() => router.back()}
            className="p-2 hover:text-white transition-colors"
            aria-label="Go back"
          >
            <span className="text-2xl">←</span>
          </button>
          <button
            className="p-2 hover:text-white transition-colors"
            aria-label="More options"
          >
            <span className="text-xl">⋮</span>
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide text-center">
          Settings
        </h1>
        <p className="text-white/80 text-center text-sm sm:text-base mt-2 mb-8 max-w-md">
          Manage your personal profile, notification preferences, and app
          settings.
        </p>
        <div className="w-full flex flex-col gap-3">
          {settingsMenu.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => router.push(item.route)}
              className="w-full flex items-center gap-3.5 px-5 py-3.5 bg-white/80 hover:bg-white/95 backdrop-blur-md rounded-2xl text-left transition-all duration-200 shadow-sm"
            >
              <div className="relative w-5 h-5 flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className={`text-sm sm:text-base font-semibold ${
                  item.isDanger ? "text-red-500" : "text-gray-800"
                }`}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
