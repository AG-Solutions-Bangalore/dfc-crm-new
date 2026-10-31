import React from "react";
import Header from "./Header";
import CompanyCard from "./CompanyCard";
import FeatureStrip from "./FeatureStrip";

/**
 * HeroSection Component (Master Redesign)
 * - Top Header: DFC Group logo + tagline
 * - Exact 3-line Headline: TRUSTED | LOGISTICS PARTNER | FOR A STRONGER TOMORROW
 *   (Positioned over the bright, clean sunset sky on the left - 100% contrast)
 * - Spaced category tags
 * - 3 Company Cards in pill shape (no arrows)
 * - White DFC LPG truck driving on the highway in the center-right open space
 * - Bottom Unified Navy Card (Feature columns + Head Office & phone footer)
 */
export const HeroSection = ({ className = "" }) => {
  const companyCards = [
    {
      id: "dfc",
      iconType: "truck",
      title: "DELHI FREIGHT CARRIERS",
      subtitle: "Reliable Surface Transportation",
      theme: "orange",
    },
    {
      id: "difcy",
      iconType: "boxes",
      title: "DIFCY LOGISTICS LTD",
      subtitle: "End-to-End Logistics Solutions",
      theme: "navy",
    },
    {
      id: "akash",
      iconType: "road",
      title: "AKASH ROADLINES PVT LTD",
      subtitle: "Pan India Road Transportation",
      theme: "orange",
    },
  ];

  const categories = [
    "TRANSPORTATION",
    "LOGISTICS",
    "ROADLINES",
    "SUPPLY CHAIN",
  ];

  return (
    <div
      className={`relative flex flex-col justify-between h-full w-full px-4 sm:px-6 xl:px-10 pt-2.5 sm:pt-3 pb-0 overflow-hidden select-none z-10 ${className}`}
    >
      {/* 1. Top Header (Logo & Tagline) */}
      <div className="flex-shrink-0">
        <Header />
      </div>

      {/* 2. Middle Content Area (Headline + Categories + Cards + Truck) */}
      <div className="relative my-auto py-1 flex-1 flex flex-col justify-center">
        {/* Exact 3-Line Headline Stack on the clean sky */}
        <div className="max-w-xl">
          <h1
            className="font-montserrat font-black leading-[1.06] tracking-tight uppercase select-none text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.85rem] xl:text-[2.2rem]"
          >
            <span className="block text-[#0A1F44] whitespace-nowrap leading-none drop-shadow-sm">
              TRUSTED
            </span>
            <span className="block text-[#F26A1B] whitespace-nowrap leading-none mt-1 drop-shadow-sm">
              LOGISTICS PARTNER
            </span>
            <span className="block text-[#0A1F44] whitespace-nowrap leading-none mt-1 drop-shadow-sm">
              FOR A STRONGER TOMORROW
            </span>
          </h1>

          {/* Spaced Category Row */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] text-slate-800 uppercase font-montserrat">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                <span className="hover:text-brand-orange transition-colors">
                  {cat}
                </span>
                {idx < categories.length - 1 && (
                  <span className="text-slate-500 font-light select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Company Cards on Left & Truck on Highway (Center-Right) */}
        <div className="relative mt-2.5 sm:mt-3 flex items-end justify-between min-h-[190px]">
          {/* Left Column: 3 Company Cards (No Arrows) */}
          <div className="w-full max-w-[320px] sm:max-w-[340px] xl:max-w-[360px] space-y-1.5 z-20 flex-shrink-0">
            {companyCards.map((card) => (
              <CompanyCard
                key={card.id}
                iconType={card.iconType}
                title={card.title}
                subtitle={card.subtitle}
                theme={card.theme}
              />
            ))}
          </div>

          {/* Center-Right: White DFC LPG Truck Firmly Grounded on Asphalt Highway */}
          <div className="hidden md:flex absolute right-[-10px] xl:right-[15px] -bottom-4 w-[50%] lg:w-[52%] xl:w-[56%] max-w-[620px] pointer-events-none z-10 items-end justify-end">
            <div className="relative w-full flex items-end justify-end">
              {/* Ground Contact Shadows - Firmly landing the tires on the asphalt */}
              <div className="absolute -bottom-1 left-6 right-4 h-4 bg-black/60 rounded-full blur-[2px]" />
              <div className="absolute -bottom-2.5 left-10 right-8 h-7 bg-black/35 rounded-full blur-md" />
              {/* Truck Graphic */}
              <img
                src="/assets/hero-truck.png"
                alt="DFC LPG Truck"
                className="relative w-full h-auto max-h-[205px] lg:max-h-[235px] xl:max-h-[270px] object-contain select-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Unified Feature & Footer Card (Matches Image 2 exactly) */}
      <div className="flex-shrink-0 mt-auto z-20 w-full">
        <FeatureStrip />
      </div>
    </div>
  );
};

export default HeroSection;
