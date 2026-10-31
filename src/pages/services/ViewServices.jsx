import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconArrowBack,
  IconInfoCircle,
  IconPrinter,
} from "@tabler/icons-react";
import BASE_URL from "../../base/BaseUrl";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import axios from "axios";
import { decryptId } from "../../components/common/EncryptionDecryption";
import { Wrench } from "lucide-react";

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <Layout>
      <div className="bg-white p-4 rounded-2xl border border-slate-200 animate-pulse">
        {/* Header Skeleton */}
        <div className="sticky top-0 mb-4 rounded-xl bg-slate-100 p-4">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-slate-200 w-1/3 rounded"></div>
            <div className="flex space-x-4">
              <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[...Array(2)].map((_, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-center">
                  <div className="h-4 bg-slate-200 w-1/3 mr-4 rounded"></div>
                  <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {[...Array(3)].map((_, index) => (
                  <th key={index} className="p-3 bg-slate-200 text-left">
                    <div className="h-4 bg-slate-300 w-3/4 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-100">
                  {[...Array(3)].map((_, colIndex) => (
                    <td key={colIndex} className="p-3">
                      <div className="h-4 bg-slate-200 w-3/4 rounded"></div>
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

const ViewServices = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const navigate = useNavigate();
  const [service, setService] = useState({});
  const [serviceSub, setServiceSub] = useState([]);
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
    const fetchServiceDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-services-by-id/${decryptedId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setService(response.data?.services || {});
        setServiceSub(response.data?.servicesSub || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service details:", error);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id, navigate, decryptedId]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <Layout>
      <div className="w-full space-y-4">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
              <Wrench size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Service Voucher View
              </h2>
              <p className="text-xs text-slate-300">
                Vehicle: {service?.service_truck_no || "-"} • Date:{" "}
                {service?.service_date
                  ? moment(service.service_date).format("DD-MMMM-YYYY")
                  : "-"}
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
              onClick={() => navigate("/service-list")}
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
            {/* Overview Information */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F56616]"></span>
                Service Log Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <table className="w-full">
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Date</td>
                      <td className="py-2.5 font-bold text-slate-900">
                        {service?.service_date
                          ? moment(service.service_date).format("DD-MMMM-YYYY")
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Truck No</td>
                      <td className="py-2.5 font-bold text-slate-900">
                        {service?.service_truck_no || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Company</td>
                      <td className="py-2.5 font-medium text-slate-800">
                        {service?.service_company || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Branch</td>
                      <td className="py-2.5 font-medium text-slate-800">
                        {service?.service_branch || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="w-full">
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Garage / Vendor</td>
                      <td className="py-2.5 font-bold text-slate-900">
                        {service?.service_garage || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">KM Reading</td>
                      <td className="py-2.5 font-bold text-[#F56616]">
                        {service?.service_km || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Total Amount</td>
                      <td className="py-2.5 font-bold text-emerald-700">
                        ₹ {Number(service?.service_amount || 0).toLocaleString("en-IN")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-600 w-1/3">Remarks</td>
                      <td className="py-2.5 font-medium text-slate-700">
                        {service?.service_remarks || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service Breakdown Heads */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#142747]"></span>
                Service Heads & Cost Breakup ({serviceSub.length})
              </h3>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#0A1D3D] text-white">
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-left">
                        Service Type / Task Head
                      </th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-right">
                        Amount (₹)
                      </th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-left">
                        Description / Part Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {serviceSub.map((sub, index) => (
                      <tr key={index} className="hover:bg-orange-50/40 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">
                          {sub.service_sub_type}
                        </td>
                        <td className="p-3 text-right font-bold text-slate-800">
                          ₹ {Number(sub.service_sub_amount || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="p-3 text-slate-600">
                          {sub.service_sub_details || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewServices;
