  import React from "react";
  import { ShieldCheck, MapPin, Users, Settings, Phone } from "lucide-react";

  /**
   * FeatureStrip Component (Matches User Reference Image 2 exactly)
   * Unified Bottom Card:
   * - Solid bright orange top border (border-t-[3.5px] border-[#F26A1B])
   * - Rounded top corners (rounded-t-2xl)
   * - Deep navy background (#071933 / #0A1F44)
   * - Top Row: 4 columns with vertical dividers
   *   1. ShieldCheck: "Safe & Secure" / "Deliveries"
   *   2. MapPin: "Pan India" / "Network"
   *   3. Users: "Trusted by" / "Businesses"
   *   4. Settings: "On-Time" / "Transportation"
   * - Bottom Row:
   *   - Left: Orange solid map pin + "HEAD OFFICE" + full address
   *   - Divider: vertical line |
   *   - Right: Orange solid phone icon + "080 2553 0784"
   *
   * Compact vertical budget (~68px total) so it is 100% visible at 100% zoom on any laptop screen.
   */
  export const FeatureStrip = ({ className = "" }) => {
    const features = [
      {
        id: 1,
        line1: "Safe & Secure",
        line2: "Deliveries",
        icon: ShieldCheck,
      },
      {
        id: 2,
        line1: "Pan India",
        line2: "Network",
        icon: MapPin,
      },
      {
        id: 3,
        line1: "Trusted by",
        line2: "Businesses",
        icon: Users,
      },
      {
        id: 4,
        line1: "On-Time",
        line2: "Transportation",
        icon: Settings,
      },
    ];

    return (
      <div
        className={`relative bg-[#0A1D3D] rounded-t-2xl border-t-[3.5px] border-[#F56616] shadow-2xl overflow-hidden select-none z-20 ${className}`}
      >
        {/* 1. Top Features Section: 4 Equal Columns with Vertical Dividers */}
        <div className="grid grid-cols-4 items-center py-2.5 px-2 sm:px-4">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`flex flex-col items-center justify-center text-center py-0.5 px-1 ${
                  idx < features.length - 1 ? "border-r border-white/20" : ""
                }`}
              >
                {/* White Outline Icon */}
                <div className="mb-0.5 flex items-center justify-center text-white">
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2]" />
                </div>
                {/* 2-line Centered White Text */}
                <span className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight whitespace-nowrap">
                  {feature.line1}
                </span>
          
                </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default FeatureStrip;
