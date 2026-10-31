import React from "react";
import dfcPng from "../../assets/Companylogo/dfc.png";

/**
 * DfcLogo Component
 * Renders the DFC brand logo with crisp vector fallback
 */
export const DfcLogo = ({ className = "h-10", variant = "default", showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Logo Image with smooth rendering */}
      <img
        src={dfcPng}
        alt="DFC Logo"
        className="h-full w-auto object-contain max-h-16"
        onError={(e) => {
          // If image fails to load, replace with inline vector SVG
          e.currentTarget.style.display = "none";
          const sibling = e.currentTarget.nextElementSibling;
          if (sibling) sibling.style.display = "flex";
        }}
      />

      {/* Vector SVG Fallback */}
      <div className="hidden items-center gap-1.5" aria-hidden="true">
        <div className="relative flex items-center">
          <span className="text-3xl font-black italic tracking-tighter text-brand-orange">
            dfc
          </span>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-orange rounded-full flex items-center justify-between px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy"></span>
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="text-2xl font-black tracking-tight text-brand-orange font-montserrat">
              DFC
            </span>
            <span className="text-2xl font-black tracking-tight text-brand-navy font-montserrat">
              GROUP
            </span>
          </div>
          <div className="h-[2px] w-full bg-brand-orange my-1"></div>
          <span className="text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase">
            MOVING BUSINESSES FORWARD
          </span>
        </div>
      )}
    </div>
  );
};

export default DfcLogo;
