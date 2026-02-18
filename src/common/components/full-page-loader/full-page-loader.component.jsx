"use client";

import { Package } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Circular spinner */}
      <div className="relative w-20 h-20 mb-4">
        <svg
          className="absolute inset-0 w-full h-full animate-spin text-white"
          viewBox="0 0 50 50"
        >
          <circle
            className="opacity-25"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
          />
          <circle
            className="opacity-75"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="90,150"
          />
        </svg>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;
