
import React from "react";
import { Truck } from "lucide-react";

export const CompanyCard = ({
  iconType = "truck",
  title = "DELHI FREIGHT CARRIERS",
  subtitle = "Reliable Surface Transportation",
  theme = "orange",
  onClick,
}) => {
  const isOrange = theme === "orange";

  const renderIcon = () => {
    switch (iconType) {
      case "container":
      case "boxes":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-4 h-4 text-white"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="6" y1="5" x2="6" y2="19" />
            <line x1="10" y1="5" x2="10" y2="19" />
            <line x1="14" y1="5" x2="14" y2="19" />
            <line x1="18" y1="5" x2="18" y2="19" />
          </svg>
        );

      case "road":
      case "route":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4 text-white"
          >
            <path
              d="M4 21 L9 3 L15 3 L20 21"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="6"
              x2="12"
              y2="18"
              strokeWidth="2"
              strokeDasharray="2.5 2.5"
              strokeLinecap="round"
            />
          </svg>
        );

      case "truck":
      default:
        return (
          <Truck className="w-4 h-4 text-white stroke-[2]" />
        );
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="
        group relative flex items-center
        w-full max-w-[350px]
        h-[48px] sm:h-[50px] lg:h-[52px]
        px-4 py-1.5
        bg-white/95 backdrop-blur-md
        rounded-full
        border border-white/90
        shadow-md
        hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200
        cursor-pointer
        focus:outline-none
        focus:ring-2 focus:ring-brand-orange/50
      "
    >
      <div className="flex items-center gap-3 min-w-0 w-full">

        {/* Icon Tile */}
        <div
          className={`
            w-9 h-9
            rounded-xl
            flex items-center justify-center
            flex-shrink-0
            transition-transform duration-200
            group-hover:scale-105
            ${
              isOrange
                ? "bg-[#F56616] shadow-sm shadow-orange-500/25"
                : "bg-[#0A1F44] shadow-sm shadow-navy-900/25"
            }
          `}
        >
          {renderIcon()}
        </div>

        {/* Company Information */}
        <div className="flex flex-col min-w-0 flex-1">

          <h3
            className={`
              font-montserrat
              font-bold
              text-[11px] sm:text-[12px] lg:text-[12.5px]
              tracking-wide
              uppercase
              truncate
              leading-tight
              transition-colors duration-200
              ${
                isOrange
                  ? "text-[#F26A1B] group-hover:text-brand-orange-dark"
                  : "text-[#0A1F44] group-hover:text-brand-navy-light"
              }
            `}
          >
            {title}
          </h3>

          <p className="
            text-[9.5px] sm:text-[10px]
            text-slate-600
            font-medium
            truncate
            mt-0.5
            leading-tight
          ">
            {subtitle}
          </p>

        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
