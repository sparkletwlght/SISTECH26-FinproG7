"use client";

import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Image from "next/image";
import { User, Lock, Mail, Home, Phone, Check, Calendar } from "lucide-react";

export function SocialLoginGroup() {
  const handleLogin = (providerId) => {
    switch (providerId) {
      case "google":
        console.log("Proses Login Google...");
        break;
      case "apple":
        console.log("Proses Login Apple...");
        break;
      case "mail":
        console.log("Proses Login Email / Magic Link...");
        break;
      case "phone":
        console.log("Proses Login No. HP / OTP...");
        break;
      default:
        break;
    }
  };

  const socialButtons = [
    { id: "mail", icon: "/mail.svg", link: "mailto:email@example.com" },
    {
      id: "google",
      icon: "/google.svg",
      link: "google-mailto:email@example.com",
    },
    { id: "phone", icon: "/phone.svg", link: "tel:+1234567890" },
    { id: "apple", icon: "/apple.svg", link: "apple-mailto:email@apple.com" },
  ];
  return (
    <div className="flex gap-3">
      {socialButtons.map((btn) => (
        <Button
          key={btn.id}
          type="button"
          variant="primary"
          className="w-fit rounded-full flex items-center px-3 py-3"
        >
          {btn.link ? (
            <a href={btn.link} target="_blank" rel="noopener noreferrer">
              <img src={btn.icon} className="w-5 h-5" />
            </a>
          ) : (
            <img src={btn.icon} className="w-5 h-5" />
          )}
        </Button>
      ))}
    </div>
  );
}

export default function LoginPage() {
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
          Create Account
        </h4>
        <p className="text-white text-center text-sm md:text-base mt-2">
          Sign up to join our community to access real-time safety routes,
          trusted alerts, and fast emergency support whenever you need it.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-between py-6 gap-6 max-w-3xl"
        >
          <div className="space-y-3">
            <InputField
              icon={User}
              placeholder="Username"
              type="text"
              required
            />
            <InputField
              icon={Lock}
              placeholder="Password"
              type="password"
              required
            />
            <InputField
              icon={Calendar}
              placeholder="Date of Birth"
              type="date"
              required
            />
            <InputField icon={Mail} placeholder="Email" type="email" required />
            <InputField
              icon={Home}
              placeholder="Address"
              type="text"
              required
            />
            <InputField
              icon={Phone}
              placeholder="Contact"
              type="text"
              required
            />
          </div>
          <div className="space-y-3 w-full flex flex-col items-center justify-center">
            <Button type="submit" variant="primary" className="w-fit">
              <Check className="w-4 h-4" /> Create Account
            </Button>
            <p className="pt-1 text-center text-sm md:text-base text-white font-medium">
              or login with
            </p>
            <SocialLoginGroup />
          </div>
        </form>
      </div>
    </section>
  );
}
