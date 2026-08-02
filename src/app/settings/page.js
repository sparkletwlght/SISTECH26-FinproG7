"use client";

import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Image from "next/image";
import { User, Lock, Mail, Home, Phone, Check, Calendar } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <section
      id="splashpage"
      className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 py-8 bg-black"
    >
      <Image
        fill
        priority
        src="/sign-up.png"
        alt="background"
        sizes="100vw"
        className="object-cover object-center pointer-events-none z-0"
      />
      <div className="relative z-10 flex flex-col items-center w-full mx-auto">
        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide text-center">
          Settings
        </h4>
        <p className="text-white text-center text-sm md:text-base mt-2">
          Manage your personal profile, notification preferences, and app
          settings.
        </p>
        <div className="w-full flex flex-col justify-between py-6 gap-6 max-w-3xl">
          <div className="max-w-3xl flex flex-col gap-3">
            <Button type="button" variant="outline" className="items-start">
              Account
            </Button>
            <Button type="button" variant="outline">
              Notifications
            </Button>
            <Button type="button" variant="outline">
              Privacy & Security
            </Button>
            <Button type="button" variant="outline">
              Appearance
            </Button>
            <Button type="button" variant="outline">
              My History
            </Button>
            <Button type="button" variant="outline">
              Languages
            </Button>
            <Button type="button" variant="outline">
              Help & Support
            </Button>
            <Button type="button" variant="outline">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
