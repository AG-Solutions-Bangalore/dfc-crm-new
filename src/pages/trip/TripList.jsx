import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import ViewTrip from "./ViewTrip";
import moment from "moment";
import {
  MasterTripCreate,
  MasterTripEdit,
  MasterTripView,
} from "../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../components/common/ButtonColors";
import { encryptId } from "../../components/common/EncryptionDecryption";
import { Navigation, Search, Fuel, Gauge, DollarSign, X } from "lucide-react";

const TripList = () => {
  const [tripData, setTripData] = useState(null);
  const [tripFooter, setTripFooter] = useState({
    trip_km: "",
    trip_hsd: "",
    trip_hsd_supplied: "",
    trip_advance: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const fetchTodoData = async () => {
    const data = {
      trip_date_from: localStorage.getItem("trip_date_from"),
      trip_date_to: localStorage.getItem("trip_date_to"),
      trip_branch: localStorage.getItem("trip_branch"),
      trip_driver: localStorage.getItem("trip_driver"),
    };
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/web-fetch-trip-lists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTripData(response.data?.trip);
      setTripFooter(response.data?.trip_footer);
    } catch (error) {
      console.error("Error fetching trip data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "combined3",
        header: "Date / Truck No",
        size: 150,
        accessorFn: (row) => `${row.trip_date} - ${row.trip_vehicle}`,
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-[#0A1D3D] font-bold text-xs">
              {row.original.trip_date
                ? moment(row.original.trip_date).format("DD-MM-YYYY")
                : ""}
            </span>
            <span className="text-gray-700 font-semibold text-xs mt-0.5">
              {row.original.trip_vehicle}
            </span>
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          const combinedValue = `${row.original.trip_date} - ${row.original.trip_vehicle}`;
          return combinedValue
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
      },
      {
        accessorKey: "combined",
        header: "Company / Branch",
        size: 150,
        accessorFn: (row) => `${row.trip_company} - ${row.trip_branch}`,
        Cell: ({ row }) => (
          <div className="flex flex-col text-xs">
            <span className="text-[#0A1D3D] font-semibold">
              {row.original.trip_company}
            </span>
            <span className="text-gray-500 text-xs">
              {row.original.trip_branch}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "trip_driver",
        header: "Driver",
        size: 110,
        Cell: ({ row }) => (
          <span className="text-gray-800 text-xs font-medium">
            {row.original.trip_driver}
          </span>
        ),
      },
      {
        accessorKey: "trip_agency",
        header: "Agencies",
        size: 110,
        Cell: ({ row }) => (
          <span className="text-gray-800 text-xs">
            {row.original.trip_agency}
          </span>
        ),
      },
      {
        accessorKey: "trip_km",
        header: "RT KM",
        size: 80,
        Cell: ({ row }) => (
          <span className="text-[#0A1D3D] font-bold text-xs">
            {row.original.trip_km}
          </span>
        ),
      },
      {
        accessorKey: "combined1",
        header: "HSD Fix / Sup",
        size: 130,
        accessorFn: (row) => `${row.trip_hsd} - ${row.trip_hsd_supplied}`,
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-gray-800 font-medium text-xs">
              Fix: <span className="font-bold text-[#0A1D3D]">{row.original.trip_hsd}</span>
            </span>
            <span className="text-gray-600 text-xs">
              Sup: <span className="font-bold text-[#F56616]">{row.original.trip_hsd_supplied}</span>
            </span>
          </div>
        ),
      },
      {
        accessorKey: "trip_advance",
        header: "Advance",
        size: 90,
        Cell: ({ row }) => (
          <span className="text-emerald-700 font-semibold text-xs">
            ₹{row.original.trip_advance || 0}
          </span>
        ),
      },
      {
        accessorKey: "trip_supplier",
        header: "Supplier",
        size: 110,
        Cell: ({ row }) => (
          <span className="text-gray-700 text-xs">
            {row.original.trip_supplier}
          </span>
        ),
      },
      {
        accessorKey: "trip_status",
        header: "Status",
        size: 90,
        Cell: ({ row }) => {
          const status = row.original.trip_status;
          let badgeClass = "bg-blue-50 text-blue-700 border-blue-200";
          if (status === "Finish" || status === "Accept") {
            badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
          } else if (status === "Cancel") {
            badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
          } else if (status === "Pending") {
            badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
          }
          return (
            <span
              className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full border ${badgeClass}`}
            >
              {status || "N/A"}
            </span>
          );
        },
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 90,
      },
      {
        accessorKey: "updated_by",
        header: "Update By",
        size: 90,
      },
      {
        id: "id",
        header: "Action",
        size: 80,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex gap-2 items-center">
              <MasterTripEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(`/edit-trip/${encodeURIComponent(encryptedId)}`);
                }}
                className="flex items-center space-x-2"
              />
              <MasterTripView
                onClick={() => {
                  setSelectedVehicleId(id);
                  setIsViewExpanded(true);
                }}
                className="flex items-center space-x-2"
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
    data: tripData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false,
    mantineTableContainerProps: { sx: { maxHeight: "calc(100vh - 270px)" } },
    initialState: { columnVisibility: { address: false } },
    state: { globalFilter: searchQuery },
    onGlobalFilterChange: setSearchQuery,
  });

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0A1D3D]/5 text-[#0A1D3D] rounded-xl border border-[#0A1D3D]/10">
                <Navigation className="h-5 w-5 text-[#F56616]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A1D3D]">Trip List</h1>
                <p className="text-xs text-gray-500">
                  Manage and monitor vehicle trips, drivers and fuel allocations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Box */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747]"
                />
              </div>

              <MasterTripCreate
                className={CreateButton}
                onClick={() => navigate(`/createTrip`)}
              />
            </div>
          </div>
        </div>

        {/* Trip Summary Metrics Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Total RT KM
              </p>
              <p className="text-base font-bold text-[#0A1D3D] mt-0.5">
                {tripFooter?.trip_km || "0"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-[#0A1D3D]">
              <Gauge className="h-4 w-4" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                HSD Fixed
              </p>
              <p className="text-base font-bold text-[#0A1D3D] mt-0.5">
                {tripFooter?.trip_hsd || "0"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 text-[#F56616]">
              <Fuel className="h-4 w-4" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                HSD Supplied
              </p>
              <p className="text-base font-bold text-[#F56616] mt-0.5">
                {tripFooter?.trip_hsd_supplied || "0"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Fuel className="h-4 w-4" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Total Advance
              </p>
              <p className="text-base font-bold text-emerald-700 mt-0.5">
                ₹{tripFooter?.trip_advance || "0"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex w-full gap-4 relative">
          <div
            className={`
              ${isViewExpanded ? "w-full lg:w-[68%]" : "w-full"} 
              transition-all duration-300 ease-in-out
            `}
          >
            <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 overflow-hidden">
              <MantineReactTable table={table} />
            </div>
          </div>

          {isViewExpanded && (
            <div
              className={`
                w-full lg:w-[32%]
                bg-white
                rounded-2xl
                shadow-xl
                border
                border-gray-200
                p-4
                transition-all
                duration-300
                ease-in-out
                ${
                  isViewExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }
              `}
            >
              <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-[#0A1D3D] uppercase tracking-wider">
                  Trip Overview
                </span>
                <button
                  title="Close panel"
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setIsViewExpanded(false);
                    setSelectedVehicleId(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ViewTrip tripId={selectedVehicleId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TripList;
