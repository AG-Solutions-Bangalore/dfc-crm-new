import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment";
import { Truck, Info, AlertCircle, Loader2 } from "lucide-react";

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 text-xs">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="font-semibold text-gray-800 text-right">{value || "—"}</span>
  </div>
);

const ViewTrip = ({ tripId }) => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-trip-by-id/${tripId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrip(response.data.trip);
      } catch (error) {
        console.error("Error fetching trip View details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-500 text-xs">
        <Loader2 className="w-4 h-4 animate-spin text-[#F56616]" />
        <span>Loading trip details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
        <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
        <span>Unable to fetch trip details.</span>
      </div>
    );
  }

  if (!tripId || !trip) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-amber-700 text-xs">
        <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span>No trip selected.</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Banner */}
      <div className="bg-[#0A1D3D] text-white p-3.5 rounded-xl border-b-2 border-[#F56616] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-white/10 rounded-lg">
            <Truck className="h-4 w-4 text-[#F56616]" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide text-white">
              {trip.trip_vehicle}
            </h3>
            <p className="text-[11px] text-gray-300">
              {trip?.trip_vehicle_type || "Commercial Vehicle"}
            </p>
          </div>
        </div>
        {trip.trip_status && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/15 text-white border border-white/20">
            {trip.trip_status}
          </span>
        )}
      </div>

      {/* Body Details */}
      <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-1 space-y-4">
        <div className="bg-gray-50/60 p-3 rounded-xl border border-gray-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A1D3D] mb-2 border-b border-gray-200 pb-1">
            Trip Info
          </p>
          <DetailRow
            label="Date"
            value={
              trip?.trip_date
                ? moment(trip?.trip_date).format("DD-MMM-YYYY")
                : ""
            }
          />
          <DetailRow label="Company" value={trip?.trip_company} />
          <DetailRow label="Branch" value={trip?.trip_branch} />
          <DetailRow
            label="Salary Type"
            value={trip?.trip_branch_salary_type}
          />
          <DetailRow label="Agency" value={trip?.trip_agency} />
          <DetailRow label="Vendor" value={trip?.trip_supplier} />
          <DetailRow label="Driver" value={trip?.trip_driver} />
          <DetailRow label="Driver No" value={trip?.trip_driver_no} />
          <DetailRow label="Remarks" value={trip?.trip_remarks} />
        </div>

        <div className="bg-gray-50/60 p-3 rounded-xl border border-gray-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A1D3D] mb-2 border-b border-gray-200 pb-1">
            Performance & Fuel
          </p>
          <DetailRow label="RT KM" value={trip?.trip_km} />
          <DetailRow label="Mileage" value={trip?.trip_mileage} />
          <DetailRow label="HSD Fixed" value={trip?.trip_hsd} />
          <DetailRow label="HSD Supplied" value={trip?.trip_hsd_supplied} />
          <DetailRow label="Advance" value={trip?.trip_advance ? `₹${trip.trip_advance}` : "—"} />
        </div>
      </div>
    </div>
  );
};

export default ViewTrip;
