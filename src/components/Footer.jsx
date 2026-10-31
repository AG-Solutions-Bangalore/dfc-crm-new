import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs px-4 py-2.5 mt-auto">
      <div className="flex flex-row items-center justify-between text-slate-500 font-medium text-[11px]">
        <span>Current Year: 2025</span>
        <span>
          Handcrafted with love by{" "}
          <Link
            to="https://ag-solutions.in/"
            target="_blank"
            className="text-[#F56616] font-semibold hover:underline"
          >
            AG Solutions
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default Footer;
