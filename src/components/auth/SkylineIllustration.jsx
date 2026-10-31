import React from "react";

/**
 * SkylineIllustration Component (Compact for perfect 100% zoom fit)
 * Light blue logistics line illustration:
 * - Warehouse with rollup doors
 * - Shipping containers
 * - Freight truck
 * - Forklift with pallet
 * Footer: "PEOPLE | PLACES | POSSIBILITIES" with short orange underline under "PLACES"
 */
export const SkylineIllustration = ({ className = "" }) => {
  return (
    <div className={`w-full flex flex-col items-center select-none pt-0.5 ${className}`}>
      {/* Light Blue Vector Line Illustration */}
      <div className="w-full h-11 sm:h-13 overflow-hidden relative">
        <svg
          viewBox="0 0 500 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#7BA6D9]"
        >
          {/* Subtle Ground Horizon Line */}
          <line
            x1="8"
            y1="85"
            x2="492"
            y2="85"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="opacity-70"
          />

          {/* Background City Skyline & Port Cranes (Faint) */}
          <path
            d="M 25 85 L 25 60 L 40 60 L 40 45 L 55 45 L 55 35 L 70 35 L 70 85
               M 70 85 L 80 52 L 95 52 L 95 85
               M 105 85 L 105 30 L 120 30 L 120 85
               M 385 85 L 385 40 L 400 30 L 415 40 L 415 85
               M 425 85 L 425 25 L 440 25 L 440 85
               M 450 85 L 450 48 L 465 48 L 465 85
               M 475 85 L 475 55 L 490 55 L 490 85"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="2 2"
            className="opacity-40"
          />

          {/* Warehouse Building with Pitched Roof & Loading Dock */}
          <path
            d="M 130 85 L 130 48 L 160 34 L 190 48 L 190 85
               M 190 48 L 225 48 L 225 85"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Warehouse Roller Doors */}
          <rect
            x="140"
            y="60"
            width="17"
            height="24"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line x1="140" y1="66" x2="157" y2="66" stroke="currentColor" strokeWidth="0.8" />
          <line x1="140" y1="72" x2="157" y2="72" stroke="currentColor" strokeWidth="0.8" />
          <line x1="140" y1="78" x2="157" y2="78" stroke="currentColor" strokeWidth="0.8" />

          <rect
            x="165"
            y="60"
            width="17"
            height="24"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line x1="165" y1="66" x2="182" y2="66" stroke="currentColor" strokeWidth="0.8" />
          <line x1="165" y1="72" x2="182" y2="72" stroke="currentColor" strokeWidth="0.8" />
          <line x1="165" y1="78" x2="182" y2="78" stroke="currentColor" strokeWidth="0.8" />

          {/* Forklift with Mast & Pallet */}
          <path
            d="M 238 85 L 238 54 M 234 85 L 234 58
               M 228 83 L 241 83"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          {/* Box on pallet */}
          <rect
            x="226"
            y="66"
            width="10"
            height="14"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Forklift Body */}
          <path
            d="M 241 70 L 251 70 L 261 74 L 265 85
               M 245 70 L 247 58 L 259 60 L 261 72"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Forklift Wheels */}
          <circle cx="242" cy="85" r="3.2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="260" cy="85" r="3.2" stroke="currentColor" strokeWidth="1.3" />

          {/* Delivery Truck */}
          {/* Cargo Container */}
          <rect
            x="280"
            y="44"
            width="56"
            height="34"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line x1="291" y1="48" x2="291" y2="74" stroke="currentColor" strokeWidth="0.8" />
          <line x1="302" y1="48" x2="302" y2="74" stroke="currentColor" strokeWidth="0.8" />
          <line x1="313" y1="48" x2="313" y2="74" stroke="currentColor" strokeWidth="0.8" />
          <line x1="324" y1="48" x2="324" y2="74" stroke="currentColor" strokeWidth="0.8" />

          {/* Cabin & Windshield */}
          <path
            d="M 336 58 L 347 58 L 354 68 L 357 80 L 336 80"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M 346 60 L 351 68 L 341 68 L 341 60 Z"
            stroke="currentColor"
            strokeWidth="1"
          />

          {/* Wheels */}
          <circle cx="290" cy="83" r="3.8" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="324" cy="83" r="3.8" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="349" cy="83" r="3.8" stroke="currentColor" strokeWidth="1.3" />

          {/* Crane Line Accent */}
          <path
            d="M 445 25 L 468 14 L 478 14
               M 456 20 L 456 36"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      </div>

      {/* Footer Motto Text with Orange Underline under "PLACES" */}
      <div className="mt-0.5 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.2em] text-slate-500 uppercase font-montserrat">
          <span>PEOPLE</span>
          <span className="text-slate-300 font-light">|</span>
          <span className="relative text-[#0A1F44]">
            PLACES
            {/* Short Orange Underline directly under PLACES */}
            <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#F26A1B] rounded-full"></span>
          </span>
          <span className="text-slate-300 font-light">|</span>
          <span>POSSIBILITIES</span>
        </div>
      </div>
    </div>
  );
};

export default SkylineIllustration;
