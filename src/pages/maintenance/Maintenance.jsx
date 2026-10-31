import React from "react";
import { Wrench } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-[#0A1D3D]/5 rounded-2xl flex items-center justify-center mx-auto border border-[#0A1D3D]/10">
          <Wrench className="h-8 w-8 text-[#F56616]" />
        </div>
        <h1 className="text-xl font-bold text-[#0A1D3D]">
          System Under Maintenance
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          The DFC CRM portal is currently undergoing scheduled maintenance and upgrades.
          Normal service will resume shortly. Please try again later.
        </p>
        <div className="pt-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-orange-50 text-[#F56616] border border-orange-200">
            DFC Fleet & CRM System
          </span>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
