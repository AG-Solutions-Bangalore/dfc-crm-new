import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../base/BaseUrl";
import { Building2, Loader2, AlertCircle } from "lucide-react";

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0 text-xs">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="font-bold text-slate-800 text-right">{value || "-"}</span>
  </div>
);

const ViewCompany = ({ companyId }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-company-by-id/${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data?.company || response.data?.data || response.data;
        setCompany(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Company View details:", err);
        setError(err);
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50 rounded-xl border border-slate-100">
        <Loader2 className="w-6 h-6 animate-spin text-[#F56616]" />
        <span className="text-xs font-semibold text-slate-600">Loading company details...</span>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
        <span>Unable to load company details.</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 font-sans">
      {/* Brand Header Banner */}
      <div className="bg-[#081735] text-white p-3.5 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-white leading-tight">
            {company?.company_name}
          </h3>
          <span className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase">
            {company?.company_short || "DFC GROUP"}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-emerald-400 border border-white/10">
          {company?.company_status || "Active"}
        </span>
      </div>

      {/* Details Box */}
      <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-3 space-y-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Company Information
        </span>
        <DetailRow label="Short Name" value={company?.company_short} />
        <DetailRow label="Mobile" value={company?.company_mobile} />
        <DetailRow label="Email" value={company?.company_email} />
        <DetailRow label="GST No" value={company?.company_gst} />
        <DetailRow label="PAN No" value={company?.company_pan} />
        <DetailRow label="Address" value={company?.company_address} />
      </div>
    </div>
  );
};

export default ViewCompany;
