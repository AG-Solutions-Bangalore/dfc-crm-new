import React from "react";
import dfcPng from "../../assets/Companylogo/dfc.png";

/**
 * Header Component
 * Compact top-left brand lockup:
 * - Orange DFC truck logo
 * - "DFC GROUP"
 * - Thin orange horizontal line + "MOVING BUSINESSES FORWARD"
 */
export const Header = ({ className = "" }) => {
  return (
    <header className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* DFC Logo Wordmark with Truck Underline */}
      <div className="flex-shrink-0 flex items-center">
        <img
          src={dfcPng}
          alt="DFC Logo"
          className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-sm select-none"
        />
      </div>

      {/* Brand Text Lockup */}
      <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-0.5">
        <div className="flex items-center gap-1 leading-none">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-orange font-montserrat">
            DFC
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0A1D3D] font-montserrat">
            GROUP
          </span>
        </div>

        {/* Thin Orange Horizontal Divider + Tagline */}
        <div className="flex items-center gap-2">
          <div className="w-5 sm:w-8 h-[2px] bg-brand-orange rounded-full" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-slate-700 uppercase select-none font-montserrat whitespace-nowrap">
            MOVING BUSINESSES FORWARD
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
