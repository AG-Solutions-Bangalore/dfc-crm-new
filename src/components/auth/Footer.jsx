import React from "react";
import { MapPin, Phone } from "lucide-react";

/**
 * Footer Component (Matches Screenshot 2 exactly)
 * Below the navy strip:
 * - Solid orange map-pin icon + "Head Office: 702, 2nd Floor, 6th A Cross Rd, 3rd Block, Koramangala, Bengaluru, Karnataka 560034"
 * - Vertical divider line
 * - Solid orange phone icon + "080 2553 0784"
 * Compact height to fit on standard laptop screens without clipping.
 */
export const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`w-full bg-[#071630] border-t border-white/10 flex flex-wrap items-center justify-between text-[9.5px] sm:text-[10px] text-slate-300 py-1.5 px-3 sm:px-6 select-text ${className}`}
    >
      {/* Left: Head Office Address */}
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="w-4 h-4 rounded-full bg-[#F26A1B] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
          <MapPin className="w-2.5 h-2.5 text-white fill-white" />
        </div>
        <div className="flex items-baseline gap-1 min-w-0">
          <span className="font-bold text-[#F26A1B] uppercase tracking-wider text-[9.5px] flex-shrink-0">
            Head Office
          </span>
          <span className="text-slate-300 truncate max-w-[320px] sm:max-w-none text-[9.5px]">
            702, 2nd Floor, 6th A Cross Rd, 3rd Block, Koramangala, Bengaluru, Karnataka 560034
          </span>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block h-3 w-px bg-white/20"></div>

      {/* Right: Phone Contact */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-[#F26A1B] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
          <Phone className="w-2.5 h-2.5 text-white fill-white" />
        </div>
        <a
          href="tel:08025530784"
          className="font-semibold text-white hover:text-brand-orange transition-colors text-[10px]"
        >
          080 2553 0784
        </a>
      </div>
    </footer>
  );
};

export default Footer;
