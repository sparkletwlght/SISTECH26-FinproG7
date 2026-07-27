"use client";

import Link from "next/link";
import { ArrowLeft, MoreVertical } from "lucide-react";

export default function HeaderNav({ backUrl, title, description }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between pt-2 pb-2">
        {backUrl ? (
          <Link
            href={backUrl}
            className="p-1 hover:bg-purple-50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
        ) : (
          <div />
        )}
        <button className="p-1 hover:bg-purple-50 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mt-2">{title}</h2>
      )}
      {description && (
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      )}
    </div>
  );
}
