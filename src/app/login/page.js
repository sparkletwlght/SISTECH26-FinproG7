"use client";

import { useRouter } from "next/navigation";
import MobileContainer from "@/components/MobileContainer";
import HeaderNav from "@/components/HeaderNav";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { User, Lock, Mail, Home, Phone, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <MobileContainer>
      <HeaderNav 
        backUrl="/" 
        title="Create Account" 
        description="Fill in your details to register" 
      />

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between py-4">
        <div className="space-y-3 my-auto">
          <InputField icon={User} placeholder="Username" type="text" required />
          <InputField icon={Lock} placeholder="Password" type="password" required />
          <InputField icon={Mail} placeholder="Email" type="email" required />
          <InputField icon={Home} placeholder="Address" type="text" />
          <InputField icon={Phone} placeholder="Contact" type="text" />
        </div>

        <div className="space-y-3 pb-4 pt-6">
          <Button type="submit" variant="primary" className="w-full">
            <Check className="w-4 h-4 mr-2" /> Create Account
          </Button>

          <p className="pt-2 text-center text-xs text-gray-500 font-medium">
            or login with
          </p>
        </div>
      </form>
    </MobileContainer>
  );
}