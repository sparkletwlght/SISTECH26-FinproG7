import React from "react";

export default function InputField({ icon: Icon, ...props }) {
  return (
    <div className="relative flex items-center w-full">
      {Icon && (
        <Icon className="w-4 h-4 text-gray-500 absolute left-4 pointer-events-none" />
      )}
      <input
        className={`w-full py-3 pr-4 ${Icon ? "pl-11" : "pl-4"} rounded-full border border-purple-100/80 bg-white/80 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all shadow-sm`}
        {...props}
      />
    </div>
  );
}
