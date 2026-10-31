import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL, { TEAM_URL } from "../../../base/BaseUrl";
import moment from "moment";
import { Users, Loader2, AlertCircle } from "lucide-react";

const DetailRow = ({ label, value, downloadUrl }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0 text-xs">
    <span className="text-slate-500 font-medium">{label}</span>
    {downloadUrl ? (
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-[#F56616] hover:underline"
        download
      >
        Download
      </a>
    ) : (
      <span className="font-bold text-slate-800 text-right">{value || "-"}</span>
    )}
  </div>
);

const ViewDriver = ({ driverId }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-driver-by-id/${driverId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data?.driver || response.data?.data || response.data;
        setDriver(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Driver View details:", err);
        setError(err);
        setLoading(false);
      }
    };

    if (driverId) {
      fetchDriverDetails();
    }
  }, [driverId]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50 rounded-xl border border-slate-100">
        <Loader2 className="w-6 h-6 animate-spin text-[#F56616]" />
        <span className="text-xs font-semibold text-slate-600">Loading driver profile...</span>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
        <span>Unable to load driver details.</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 font-sans">
      {/* Brand Header Banner */}
      <div className="bg-[#081735] text-white p-3.5 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-white leading-tight">
            {driver?.full_name}
          </h3>
          <span className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase">
            {driver?.user_branch || "DFC DRIVER"}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-emerald-400 border border-white/10">
          {driver?.driver_status || "Active"}
        </span>
      </div>

      {/* Driver Information */}
      <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-3 space-y-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Driver Details
        </span>
        <DetailRow label="Company" value={driver?.user_company} />
        <DetailRow label="Branch" value={driver?.user_branch} />
        <DetailRow label="Mobile" value={driver?.mobile} />
        <DetailRow label="DL No" value={driver?.dl_no} />
        <DetailRow
          label="DL Expiry"
          value={driver?.dl_expiry ? moment(driver.dl_expiry).format("DD-MM-YYYY") : "-"}
        />
        <DetailRow label="Vehicle Type" value={driver?.vehicle_type} />
        <DetailRow label="Address" value={driver?.user_address} />
      </div>
    </div>
  );
};

export default ViewDriver;
