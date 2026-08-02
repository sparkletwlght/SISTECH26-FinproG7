import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  variant = "secondary",
  className = "",
  link,
  href,
  ...props
}) {
  const targetUrl = link || href;
  const baseStyles =
    "py-2.5 px-6 rounded-full font-medium transition-all text-center flex items-center justify-center gap-2 text-white active:scale-[0.98] w-full";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#FF82AB] to-[#E53888] hover:from-[#E53888] hover:to-[#C2185B] shadow-md shadow-pink-500/20 border border-pink-300/30",
    secondary:
      "bg-gradient-to-r from-[#7D6B8D] to-[#5C4A6B] hover:from-[#6B5A7B] hover:to-[#4A3959] shadow-md shadow-purple-900/20 border border-purple-300/20",
    outline:
      "bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 text-sm shadow-sm",
  };
  const combinedStyles = cn(
    baseStyles,
    variants[variant] || variants.secondary,
    className,
  );
  if (targetUrl) {
    return (
      <Link href={targetUrl} className={combinedStyles}>
        {children}
      </Link>
    );
  }
  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
