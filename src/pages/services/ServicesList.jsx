import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment/moment";
import {
  ServiceCreate,
  ServiceEdit,
  ServiceView,
} from "../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../components/common/ButtonColors";
import { encryptId } from "../../components/common/EncryptionDecryption";
import { Wrench, Search } from "lucide-react";

const ServicesList = () => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-services-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServiceData(response.data?.services || []);
    } catch (error) {
      console.error("Error fetching Service data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "service_date",
        header: "Date",
        size: 110,
        Cell: ({ row }) => {
          const date = row.original.service_date;
          return date ? moment(date).format("DD-MMM-YYYY") : "";
        },
      },
      {
        accessorKey: "combined",
        header: "Truck No & Company",
        size: 180,
        accessorFn: (row) => `${row.service_truck_no} - ${row.service_company}`,
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">
              {row.original.service_truck_no}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {row.original.service_company}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "service_garage",
        header: "Garage",
        size: 150,
      },
      {
        accessorKey: "service_km",
        header: "KM",
        size: 90,
      },
      {
        accessorKey: "service_amount",
        header: "Total Amount",
        size: 110,
        Cell: ({ row }) => {
          const amount = row.original.service_amount;
          return (
            <span className="font-bold text-slate-900">
              ₹ {Number(amount || 0).toLocaleString("en-IN")}
            </span>
          );
        },
      },
      {
        accessorKey: "service_count",
        header: "No of Change",
        size: 100,
        Cell: ({ row }) => (
          <span className="font-semibold text-slate-800">
            {row.original.service_count}
          </span>
        ),
      },
      {
        accessorKey: "service_status",
        header: "Status",
        size: 90,
        Cell: ({ row }) => {
          const status = row.original.service_status;
          return (
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                status === "Active"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {status || "Active"}
            </span>
          );
        },
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 100,
      },
      {
        accessorKey: "updated_by",
        header: "Update By",
        size: 100,
      },
      {
        id: "id",
        header: "Action",
        size: 90,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-1.5">
              <ServiceEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(`/service-edit/${encodeURIComponent(encryptedId)}`);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#F56616] hover:bg-orange-50 transition-colors cursor-pointer"
              />

              <ServiceView
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(`/service-view/${encodeURIComponent(encryptedId)}`);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: serviceData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false,
    state: {
      globalFilter,
    },
    mantineTableContainerProps: { sx: { maxHeight: "calc(100vh - 190px)" } },
    initialState: { columnVisibility: { address: false } },
  });

  return (
    <Layout>
      <div className="max-w-screen space-y-3">
        {/* Header Section */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-row justify-between items-center gap-4">
            {/* Left: Brand Icon + Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F56616] flex items-center justify-center border border-orange-100 shadow-2xs shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Service List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Vehicle Maintenance & Garage Logs
                </span>
              </div>
            </div>

            {/* Right: Search Box immediately BEFORE Add Button */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search services..."
                  className="w-40 sm:w-60 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <ServiceCreate
                onClick={() => navigate("/createService")}
                className={CreateButton}
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full">
          {loading && !serviceData ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F56616]"></div>
            </div>
          ) : (
            <MantineReactTable table={table} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesList;
