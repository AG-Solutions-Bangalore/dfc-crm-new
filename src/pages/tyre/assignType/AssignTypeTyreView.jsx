import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconInfoCircle,
  IconArrowBack,
  IconPrinter,
} from "@tabler/icons-react";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { decryptId } from "../../../components/common/EncryptionDecryption";
import { Disc } from "lucide-react";

const SkeletonLoading = () => {
  return (
    <Layout>
      <div className="bg-white p-4 rounded-2xl border border-slate-200 animate-pulse">
        {/* Header Skeleton */}
        <div className="sticky top-0 mb-4 rounded-xl bg-slate-100 p-4">
          <div className="h-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
              <div className="w-48 h-6 bg-slate-300 rounded"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Vehicle Info Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[1, 2].map((col) => (
            <div key={col} className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((row) => (
                <div key={row} className="flex justify-between">
                  <div className="w-1/3 h-8 bg-slate-200 rounded"></div>
                  <div className="w-1/2 h-8 bg-slate-300 rounded"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Tyre Details Skeleton */}
        <div className="mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[1, 2, 3, 4, 5, 6].map((header) => (
                  <th key={header} className="p-2 border border-slate-200">
                    <div className="h-6 bg-slate-300 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row}>
                  {[1, 2, 3, 4, 5, 6].map((col) => (
                    <td key={col} className="p-2 border border-slate-200">
                      <div className="h-6 bg-slate-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const AssignTypeTyreView = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({});
  const [tyre, setTyre] = useState({});
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: auto;
        margin: 5mm;
      }
      @media print {
        body {
          border: 1px solid #000;
          margin: 1mm;
          padding: 1mm;
          min-height: 100vh;
        }
        .print\\:hidden {
          display: none !important;
        }
      }
    `,
  });

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const token = localStorage.getItem("token");

        const vehicleResponse = await axios.get(
          `${BASE_URL}/api/web-fetch-tyre-vehicle-by/${decryptedId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setVehicle(vehicleResponse.data.vehicles || {});

        // Fetch tyre data using vehicle registration number
        const tyreResponse = await axios.get(
          `${BASE_URL}/api/web-fetch-vehicles-tyre-sub/${vehicleResponse.data.vehicles.reg_no}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTyre(tyreResponse.data.vehiceltyresub || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id, navigate, decryptedId]);

  const renderTyreRows = () => {
    const vehicleType = vehicle.vehicle_type;
    const tyreData = tyre;

    const tyrePositions = {
      Other: [
        { position: "1. Front Left", prefix: "tyre_assign_1_front_left" },
        { position: "2. Front Right", prefix: "tyre_assign_2_front_right" },
        { position: "3. Stephany Tyre", prefix: "tyre_assign_stepney_no" },
      ],
      Car: [
        { position: "1. Front Left", prefix: "tyre_assign_1_front_left" },
        { position: "2. Front Right", prefix: "tyre_assign_2_front_right" },
        { position: "3. Back Left", prefix: "tyre_assign_3_back_left" },
        { position: "4. Back Right", prefix: "tyre_assign_5_back_right" },
        { position: "5. Stephany Tyre", prefix: "tyre_assign_stepney_no" },
      ],
      "6W Truck": [
        { position: "1. Front Left", prefix: "tyre_assign_1_front_left" },
        { position: "2. Front Right", prefix: "tyre_assign_2_front_right" },
        { position: "3. Back Left", prefix: "tyre_assign_3_back_left" },
        { position: "4. Back Left", prefix: "tyre_assign_4_back_left" },
        { position: "5. Back Right", prefix: "tyre_assign_5_back_right" },
        { position: "6. Back Right", prefix: "tyre_assign_6_back_right" },
        { position: "7. Stephany Tyre", prefix: "tyre_assign_stepney_no" },
      ],
      "10W Truck": [
        { position: "1. Front Left", prefix: "tyre_assign_1_front_left" },
        { position: "2. Front Right", prefix: "tyre_assign_2_front_right" },
        {
          position: "3. Back Housing Left",
          prefix: "tyre_assign_3_back_housing_left",
        },
        {
          position: "4. Back Housing Left",
          prefix: "tyre_assign_4_back_housing_left",
        },
        {
          position: "5. Back Dummy Left",
          prefix: "tyre_assign_5_back_dummy_left",
        },
        {
          position: "6. Back Dummy Left",
          prefix: "tyre_assign_6_back_dummy_left",
        },
        {
          position: "7. Back Housing Right",
          prefix: "tyre_assign_7_back_housing_right",
        },
        {
          position: "8. Back Housing Right",
          prefix: "tyre_assign_8_back_housing_right",
        },
        {
          position: "9. Back Dummy Right",
          prefix: "tyre_assign_9_back_dummy_right",
        },
        {
          position: "10. Back Dummy Right",
          prefix: "tyre_assign_10_back_dummy_right",
        },
        { position: "11. Stephany Tyre", prefix: "tyre_assign_stepney_no" },
      ],
    };

    const positionsToRender = tyrePositions[vehicleType] || [];

    return positionsToRender.map((pos, index) => {
      const getField = (suffix) => {
        if (pos.prefix === "tyre_assign_stepney_no") {
          return suffix === "no"
            ? tyreData[pos.prefix]
            : tyreData[`tyre_assign_stepney_${suffix}`];
        }
        return tyreData[`${pos.prefix}_${suffix}`];
      };

      const tyreNo = getField("no");
      const tyreType = getField("type");
      const tyreMake = getField("make");
      const tyreDate = getField("date");
      const tyreKm = getField("km");
      const tyrePreKm = getField("pre_km");
      const tyreStatus = getField("status");
      const diffKm = tyrePreKm && tyreKm ? Number(tyrePreKm) - Number(tyreKm) : "-";

      return (
        <tr key={index} className="hover:bg-orange-50/40 transition-colors text-center text-xs">
          <td className="p-2.5 border border-slate-200 text-left font-semibold text-slate-900">
            {pos.position}
          </td>
          <td className="p-2.5 border border-slate-200 font-bold text-slate-800">
            {tyreNo || "-"}
          </td>
          <td className="p-2.5 border border-slate-200 text-slate-600">
            {tyreType || "-"}
          </td>
          <td className="p-2.5 border border-slate-200 text-slate-600">
            {tyreMake || "-"}
          </td>
          <td className="p-2.5 border border-slate-200 text-slate-600">
            {tyreDate ? moment(tyreDate).format("DD-MM-YYYY") : "-"}
          </td>
          <td className="p-2.5 border border-slate-200 font-medium text-slate-800">
            {tyreKm || "-"}
          </td>
          <td className="p-2.5 border border-slate-200 font-medium text-slate-800">
            {tyrePreKm || "-"}
          </td>
          <td className="p-2.5 border border-slate-200 font-bold text-[#F56616]">
            {diffKm}
          </td>
          <td className="p-2.5 border border-slate-200">
            <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {tyreStatus || "Fitted"}
            </span>
          </td>
        </tr>
      );
    });
  };

  if (loading) return <SkeletonLoading />;

  return (
    <Layout>
      <div className="w-full space-y-4">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
              <Disc size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Fitted Tyre Details
              </h2>
              <p className="text-xs text-slate-300">
                Vehicle: {vehicle?.reg_no || "-"} ({vehicle?.vehicle_type || "-"})
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
              title="Print"
            >
              <IconPrinter size={20} />
            </button>
            <button
              onClick={() => navigate("/tyre/assign-list")}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
              title="Go Back"
            >
              <IconArrowBack size={20} />
            </button>
          </div>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
          <div ref={printRef} className="space-y-6">
            {/* Vehicle Details Overview */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F56616]"></span>
                Vehicle Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <table className="w-full">
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { label: "Branch", value: vehicle.vehicle_branch },
                      { label: "Company", value: vehicle.vehicle_company },
                      { label: "Vehicle Type", value: vehicle.vehicle_type },
                      { label: "Model Year", value: vehicle.mfg_year },
                      { label: "Vehicle Open KM", value: vehicle.vehicle_open_km },
                      { label: "Vehicle Open HSD", value: vehicle.vehicle_hsd_open },
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="py-2.5 font-semibold text-slate-600 w-1/3">{row.label}</td>
                        <td className="py-2.5 font-bold text-slate-900">{row.value || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="w-full">
                  <tbody className="divide-y divide-slate-200">
                    {[
                      {
                        label: "Insurance Due",
                        value: vehicle.ins_due
                          ? moment(vehicle.ins_due).format("DD-MM-YYYY")
                          : "-",
                      },
                      {
                        label: "Permit Due",
                        value: vehicle.permit_due
                          ? moment(vehicle.permit_due).format("DD-MM-YYYY")
                          : "-",
                      },
                      {
                        label: "FC Due",
                        value: vehicle.fc_due
                          ? moment(vehicle.fc_due).format("DD-MM-YYYY")
                          : "-",
                      },
                      { label: "Mileage", value: vehicle.vehicle_mileage },
                      {
                        label: "Driver",
                        value: `${vehicle.vehicle_driver || "-"} - ${vehicle.vehicle_driver_no || "-"}`,
                      },
                      {
                        label: "No of Cylinder",
                        value: vehicle.no_of_gas_cylinder,
                      },
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="py-2.5 font-semibold text-slate-600 w-1/3">{row.label}</td>
                        <td className="py-2.5 font-bold text-slate-900">{row.value || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tyre Position Breakup Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#142747]"></span>
                Mounted Tyre Positions
              </h3>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#0A1D3D] text-white">
                      {[
                        "Position",
                        "Tyre No",
                        "Type",
                        "Make",
                        "Date",
                        "Fitted KM",
                        "Present KM",
                        "KM Run",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{renderTyreRows()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssignTypeTyreView;
