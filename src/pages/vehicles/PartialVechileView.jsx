import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Truck, AlertCircle, Loader2, Disc, Shield, Calendar, MapPin, Building2 } from "lucide-react";
import BASE_URL from "../../base/BaseUrl";
import { useNavigate } from "react-router-dom";
import { VechilesPVGototyre } from "../../components/buttonIndex/ButtonComponents";

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0 text-xs">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="font-bold text-slate-800 text-right">{value || "-"}</span>
  </div>
);

const PartialVechileView = ({ vehicleId }) => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tyre, setTyre] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-vehicles-by-id/${vehicleId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data =
          response.data?.vehicles ||
          response.data?.vehicle ||
          response.data?.data ||
          response.data;
        setVehicle(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Vehicle View details:", err);
        setError(err);
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicleDetails();
    }
  }, [vehicleId]);

  useEffect(() => {
    const fetchTyreVechile = async () => {
      try {
        if (!vehicle?.reg_no) return;
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-vehicles-tyre-sub/${vehicle.reg_no}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTyre(response.data?.vehiceltyresub || {});
      } catch (err) {
        console.error("Error fetching Vechile partial View details:", err);
      }
    };

    if (vehicle?.reg_no) {
      fetchTyreVechile();
    }
  }, [vehicle?.reg_no]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50 rounded-xl border border-slate-100">
        <Loader2 className="w-6 h-6 animate-spin text-[#F56616]" />
        <span className="text-xs font-semibold text-slate-600">Loading vehicle details...</span>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
        <span>Unable to load vehicle details.</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 font-sans">
      {/* Brand Header Banner */}
      <div className="bg-[#081735] text-white p-3.5 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-white leading-tight">
            {vehicle?.reg_no}
          </h3>
          <span className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase">
            {vehicle?.vehicle_type || "Commercial Freight"}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-emerald-400 border border-white/10">
          {vehicle?.vehicle_status || "Active"}
        </span>
      </div>

      {/* Compliance & Due Dates */}
      <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-3 space-y-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Compliance & Registration
        </span>
        <DetailRow label="Company" value={vehicle?.vehicle_company} />
        <DetailRow label="Branch" value={vehicle?.vehicle_branch} />
        <DetailRow label="Model Year" value={vehicle?.mfg_year} />
        <DetailRow
          label="Insurance Due"
          value={vehicle?.ins_due ? moment(vehicle.ins_due).format("DD-MM-YYYY") : "-"}
        />
        <DetailRow
          label="Permit Due"
          value={vehicle?.permit_due ? moment(vehicle.permit_due).format("DD-MM-YYYY") : "-"}
        />
        <DetailRow
          label="FC Due"
          value={vehicle?.fc_due ? moment(vehicle.fc_due).format("DD-MM-YYYY") : "-"}
        />
      </div>

      {/* Operational Details */}
      <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-3 space-y-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Fleet Operations
        </span>
        <DetailRow label="Gas Cylinders" value={vehicle?.no_of_gas_cylinder} />
        <DetailRow label="Driver" value={vehicle?.vehicle_driver} />
        <DetailRow label="Present KM" value={vehicle?.vehicle_present_km} />
      </div>

      {/* Quick Action Button to Tyre */}
      <div className="pt-1">
        <button
          onClick={() => navigate(`/truckdetails-viewall/${vehicle?.id}`)}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-[#0A1D3D] hover:bg-[#15385E] rounded-xl shadow-2xs transition-all"
        >
          <Truck className="w-3.5 h-3.5" />
          <span>View Full Fleet Dossier</span>
        </button>
      </div>
    </div>
  );
};

export default PartialVechileView;
