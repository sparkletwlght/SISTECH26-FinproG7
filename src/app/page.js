"use client";

import Link from "next/link";
import MobileContainer from "@/components/MobileContainer";
import Button from "@/components/Button";

export default function SplashPage() {
  return (
    <MobileContainer>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          ByHerSide
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center my-auto space-y-8">
        <div className="w-28 h-28 rounded-full border-[10px] border-slate-300 flex items-center justify-center p-2">
          <div className="w-full h-full rounded-full border-[10px] border-slate-300"></div>
        </div>
        <p className="text-gray-600 text-lg font-base text-center">Quote</p>
      </div>
      <div className="pb-4">
        <Link href="/login">
          <Button variant="secondary">Sign in / Log in</Button>
        </Link>
      </div>
    </MobileContainer>
  );
}
