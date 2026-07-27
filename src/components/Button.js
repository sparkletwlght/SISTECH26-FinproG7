import React from "react";

export default function Button({
  children,
  variant = "secondary",
  className = "",
  ...props
}) {
  const baseStyles =
    "w-full py-2 px-4 rounded-full font-medium transition-all text-center flex items-center justify-center gap-2 active:scale-[0.98]";

  const variants = {
    primary: "bg-slate-600 text-white hover:bg-slate-700 shadow-sm",
    secondary:
      "bg-white text-gray-800 border border-purple-200 hover:bg-purple-50 shadow-sm",
    outline:
      "bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 text-sm shadow-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.secondary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
