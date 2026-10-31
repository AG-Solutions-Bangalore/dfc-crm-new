import React from "react";

/**
 * BackgroundEffects Component
 * Complete Master Redesign Background:
 * - Bright, clean sunset sky on the left (so headline text has 100% contrast)
 * - Sunset sun glow on the left horizon
 * - Distant coastal harbor skyline and port cranes
 * - Multi-lane perspective asphalt highway with lane markings across the bottom
 * - Subtle dotted world map in the sky with orange flight arcs, 5 pins, and airplane
 * - Top-right navy & orange diagonal swooshes and bottom-right orange wave
 */
export const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Base Sunset Sky Gradient (Bright Sky Blue at top to Warm Golden Peach at Horizon) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(174deg, #C2E2FB 0%, #D8EDFB 26%, #F8EDE2 52%, #FED7B7 76%, #FDBB8A 100%)",
        }}
      />

      {/* Setting Sun on the Left Horizon */}
      <div className="absolute bottom-[28%] left-[8%] w-[420px] h-[220px] bg-gradient-to-t from-amber-300/40 via-orange-300/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[32%] left-[12%] w-24 h-24 bg-white/70 rounded-full blur-xl pointer-events-none" />

      {/* 2. Coastal Harbor Silhouette & Port Cranes along the Horizon (Center-Right) */}
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="absolute bottom-[26%] left-0 right-0 w-full h-36 opacity-35 mix-blend-multiply pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Distant City Skyline & Shipping Cranes */}
        <path
          d="M 450 300 L 450 250 L 465 250 L 465 210 L 485 210 L 485 300
             M 495 300 L 495 230 L 515 230 L 515 300
             M 530 300 L 530 180 L 555 180 L 555 300
             M 570 300 L 570 240 L 590 240 L 590 300
             M 610 300 L 610 160 L 635 160 L 635 300
             M 650 300 L 650 220 L 675 220 L 675 300
             M 700 300 L 700 190 L 730 190 L 730 300
             M 750 300 L 750 250 L 780 250 L 780 300
             M 800 300 L 800 170 L 825 170 L 825 300
             M 840 300 L 840 230 L 870 230 L 870 300
             M 890 300 L 890 200 L 920 200 L 920 300"
          stroke="#0B2A57"
          strokeWidth="1.5"
          fill="#0B2A57"
          opacity="0.4"
        />
        {/* Shipping Cranes */}
        <path
          d="M 720 300 L 745 130 L 820 130 L 845 300
             M 740 160 L 830 145
             M 770 130 L 770 190
             M 920 300 L 940 140 L 1000 140 L 1020 300
             M 935 170 L 1010 155"
          stroke="#0B2A57"
          strokeWidth="2.2"
          fill="none"
          opacity="0.5"
        />
        {/* Harbor Water Line */}
        <line x1="400" y1="300" x2="1200" y2="300" stroke="#0B2A57" strokeWidth="2" opacity="0.3" />
      </svg>

      {/* 3. Multi-Lane Perspective Asphalt Highway across the bottom half */}
      <svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 w-full h-[55%] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="asphaltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#758A99" stopOpacity="0.5" />
            <stop offset="20%" stopColor="#414D5C" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#1E2631" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="sunsetRoadReflect" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9E4A" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#FFB366" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#FF8A3D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Asphalt Road Surface */}
        <polygon points="0,90 1200,90 1200,500 0,500" fill="url(#asphaltGrad)" />

        {/* Sunset Light Reflection on left highway lane */}
        <polygon points="0,90 450,90 320,500 0,500" fill="url(#sunsetRoadReflect)" />

        {/* Highway Lane Centerline Stripes (Perspective) */}
        <path
          d="M 460 90 L 380 500"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeDasharray="22 18"
          strokeOpacity="0.7"
        />
        <path
          d="M 680 90 L 760 500"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeDasharray="26 22"
          strokeOpacity="0.8"
        />
        <path
          d="M 880 90 L 1050 500"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeDasharray="28 24"
          strokeOpacity="0.8"
        />

        {/* Road Shoulder Solid Lines */}
        <path d="M 220 90 L 0 320" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.6" />
        <path d="M 1080 90 L 1200 240" stroke="#FFB03A" strokeWidth="3.5" strokeOpacity="0.75" />
      </svg>

      {/* 4. Dotted World Map in the Upper Sky */}
      <div className="absolute top-2 left-[26%] right-[18%] h-[48%] opacity-[0.22] mix-blend-multiply pointer-events-none">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="clean-dot-grid"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.15" fill="#0B2A57" opacity="0.85" />
            </pattern>
            <mask id="clean-world-mask">
              <ellipse cx="260" cy="100" rx="65" ry="45" fill="#fff" />
              <ellipse cx="310" cy="220" rx="75" ry="75" fill="#fff" />
              <ellipse cx="480" cy="130" rx="130" ry="70" fill="#fff" />
              <polygon points="440,165 480,165 460,235" fill="#fff" />
              <ellipse cx="570" cy="210" rx="60" ry="50" fill="#fff" />
              <ellipse cx="630" cy="300" rx="65" ry="48" fill="#fff" />
            </mask>
          </defs>

          <rect
            width="800"
            height="400"
            fill="url(#clean-dot-grid)"
            mask="url(#clean-world-mask)"
          />
        </svg>
      </div>

      {/* 5. Clean Commercial Airliner Ascending into the Sky */}
      <svg
        viewBox="0 0 1100 600"
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sleek Ascending Airplane - Flying Upwards-Right */}
        <g transform="translate(680, 110) rotate(-35)">
          <path
            d="M 0 -22 C 3 -22 6 -12 6 8 L 6 18 C 6 20 4 23 0 24 C -4 23 -6 20 -6 18 L -6 8 C -6 -12 -3 -22 0 -22 Z"
            fill="#1E2A38"
          />
          <path d="M 6 -2 L 34 8 L 34 13 L 6 6 Z" fill="#2B3E52" />
          <path d="M -6 -2 L -34 8 L -34 13 L -6 6 Z" fill="#2B3E52" />
          <path d="M 3 16 L 15 22 L 15 25 L 3 22 Z" fill="#141E28" />
          <path d="M -3 16 L -15 22 L -15 25 L -3 22 Z" fill="#141E28" />
          <rect x="14" y="2" width="3.5" height="9" rx="1.5" fill="#3D536B" />
          <rect x="-17.5" y="2" width="3.5" height="9" rx="1.5" fill="#3D536B" />
        </g>
      </svg>

      {/* 6. Top-Right Corner: Navy Polygon + Orange Diagonal Swoosh Stripe */}
      <div className="absolute top-0 right-0 w-80 h-72 sm:w-96 sm:h-80 pointer-events-none overflow-hidden z-[2]">
        <svg
          viewBox="0 0 380 320"
          className="w-full h-full transform translate-x-4 -translate-y-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 160 0 L 380 0 L 380 220 L 280 200 Z" fill="#0A1D3D" fillOpacity="0.98" />
          <path d="M 115 0 L 160 0 L 280 200 L 235 195 Z" fill="#F26A1B" fillOpacity="0.98" />
        </svg>
      </div>

      {/* 7. Bottom-Right Corner: Orange Wave Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-36 pointer-events-none overflow-hidden z-[2]">
        <svg
          viewBox="0 0 400 160"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 160 C 120 140 220 80 400 30 L 400 160 Z" fill="#F26A1B" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundEffects;
