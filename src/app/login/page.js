"use client";

import Link from "next/link";
import MobileContainer from "@/components/MobileContainer";
import HeaderNav from "@/components/HeaderNav";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { User, Lock, Mail, Home, Phone, Check } from "lucide-react";

export default function LoginPage() {
  return (
    <MobileContainer>
      <HeaderNav backUrl="/" title="Create Account" description="Description" />
      <div className="space-y-3 my-auto">
        <InputField icon={User} placeholder="Username" type="text" />
        <InputField icon={Lock} placeholder="Password" type="password" />
        <InputField icon={Mail} placeholder="Email" type="email" />
        <InputField icon={Home} placeholder="Address" type="text" />
        <InputField icon={Phone} placeholder="Contact" type="text" />
      </div>
      <div className="space-y-3 pb-4 pt-4">
        <Link href="/dashboard">
          <Button variant="primary">
            <Check className="w-4 h-4" /> Create Account
          </Button>
        </Link>
        <p className="pt-4 text-center text-xs text-gray-500 font-medium">
          or login with
        </p>
      </div>
    </MobileContainer>
  );
}
