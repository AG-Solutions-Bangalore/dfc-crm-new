
import axios from "axios";
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Building2, UserRound, Phone, Mail, MapPin, FileText } from "lucide-react";
import BASE_URL from "../../../base/BaseUrl";

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-1 gap-1 border-b border-slate-100 py-3 last:border-b-0 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-3">
    <span className="text-sm font-semibold text-slate-500">
      {label}
    </span>
    <span className="break-words text-sm font-medium text-[#142747] sm:text-right">
      {value || "-"}
    </span>
  </div>
);

const DetailSection = ({ title, icon: Icon, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F56616]">
        <Icon size={17} />
      </div>
      <h3 className="text-sm font-bold text-[#142747]">
        {title}
      </h3>
    </div>

    <div>{children}</div>
  </section>
);

const ViewVendor = ({ vendorId }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-vendor-by-id/${vendorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVendor(response.data.vendor);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Vendor View details:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (vendorId) {
      fetchVehicleDetails();
    }
  }, [vendorId]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-[#F56616]" />
        <p className="text-sm font-medium text-[#142747]">
          Loading vendor details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
        <InformationCircleIcon className="h-6 w-6 shrink-0 text-red-500" />
        <p className="text-sm font-medium text-red-600">
          Unable to fetch Vendor details
        </p>
      </div>
    );
  }

  if (!vendorId) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
        <InformationCircleIcon className="h-6 w-6 shrink-0 text-yellow-500" />
        <p className="text-sm font-medium text-yellow-700">
          No Vendor Id selected
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">

      {/* Vendor Header */}
      <div className="rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-orange-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-white text-[#F56616]">
            <Building2 size={22} />
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-base font-bold text-[#142747]">
              {vendor?.vendor_name || "-"}
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Vendor Information
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            {vendor?.vendor_type || "-"}
          </span>

          <span
            className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
              vendor?.vendor_status === "Active"
                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {vendor?.vendor_status || "-"}
          </span>
        </div>
      </div>

      {/* Vendor Information */}
      <DetailSection title="Vendor Information" icon={Building2}>
        <DetailRow label="Branch" value={vendor?.vendor_branch} />
        <DetailRow label="Vendor Type" value={vendor?.vendor_type} />
        <DetailRow label="GST" value={vendor?.vendor_gst} />
        <DetailRow label="PAN No" value={vendor?.vendor_pan} />
      </DetailSection>

      {/* Contact Information */}
      <DetailSection title="Contact Information" icon={UserRound}>
        <DetailRow
          label="Contact Person"
          value={vendor?.vendor_contact_person}
        />
        <DetailRow label="Mobile No" value={vendor?.vendor_mobile} />
        <DetailRow label="Email" value={vendor?.vendor_email} />
      </DetailSection>

      {/* Address Information */}
      <DetailSection title="Address Information" icon={MapPin}>
        <DetailRow label="Address" value={vendor?.vendor_address} />
      </DetailSection>

    </div>
  );
};

export default ViewVendor;
