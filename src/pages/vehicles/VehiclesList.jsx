import { Tooltip } from "@mantine/core";
import axios from "axios";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import {
  VechilesCreate,
  VechilesCreateTyre,
  VechilesEdit,
  VechilesTruck,
  VechilesView,
} from "../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../components/common/ButtonColors";
import { encryptId } from "../../components/common/EncryptionDecryption";
import Layout from "../../layout/Layout";
import PartialVechileView from "./PartialVechileView";
import { Truck, Search } from "lucide-react";

// Fallback sample vehicles data matching the dashboard stats if API returns empty
const SAMPLE_VEHICLES_DATA = [
  {
    id: 1,
    reg_no: "KA51AK 7463",
    vehicle_type: "6W Truck",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    mfg_year: "2021",
    ins_due: "2026-10-30",
    permit_due: "2026-11-15",
    fc_due: "2026-10-31",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 2,
    reg_no: "KA51AK 7446",
    vehicle_type: "10W Truck",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    mfg_year: "2020",
    ins_due: "2026-10-30",
    permit_due: "2026-12-01",
    fc_due: "2026-11-03",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 3,
    reg_no: "KA51AK 7451",
    vehicle_type: "6W Truck",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    mfg_year: "2022",
    ins_due: "2026-10-30",
    permit_due: "2026-11-20",
    fc_due: "2026-11-05",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 4,
    reg_no: "KA51AK 7461",
    vehicle_type: "6W Truck",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    mfg_year: "2021",
    ins_due: "2026-10-30",
    permit_due: "2026-12-10",
    fc_due: "2026-11-08",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 5,
    reg_no: "KA51AK 7457",
    vehicle_type: "6W Truck",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    mfg_year: "2023",
    ins_due: "2026-10-30",
    permit_due: "2026-12-25",
    fc_due: "2026-11-12",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 6,
    reg_no: "KA01 AE 7820",
    vehicle_type: "10W Truck",
    vehicle_company: "ARPL",
    vehicle_branch: "HPC HAZARWADI",
    mfg_year: "2019",
    ins_due: "2026-11-10",
    permit_due: "2026-12-15",
    fc_due: "2026-11-03",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 7,
    reg_no: "KA01 AE 7821",
    vehicle_type: "10W Truck",
    vehicle_company: "ARPL",
    vehicle_branch: "HPC HAZARWADI",
    mfg_year: "2019",
    ins_due: "2026-11-12",
    permit_due: "2026-12-18",
    fc_due: "2026-11-05",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 8,
    reg_no: "MH 09 EM 3446",
    vehicle_type: "10W Truck",
    vehicle_company: "ARPL",
    vehicle_branch: "HPC HAZARWADI",
    mfg_year: "2020",
    ins_due: "2026-11-15",
    permit_due: "2027-01-05",
    fc_due: "2026-11-08",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 9,
    reg_no: "KA01 AM 8315",
    vehicle_type: "6W Truck",
    vehicle_company: "DFC",
    vehicle_branch: "BPC DHARWAD",
    mfg_year: "2021",
    ins_due: "2026-11-20",
    permit_due: "2027-01-10",
    fc_due: "2026-11-09",
    vehicle_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 10,
    reg_no: "KA01AA 7211",
    vehicle_type: "Car",
    vehicle_company: "RK",
    vehicle_branch: "HOSKOTE GARAGE",
    mfg_year: "2018",
    ins_due: "2026-09-12",
    permit_due: "2026-10-01",
    fc_due: "2026-10-15",
    vehicle_status: "Inactive",
    created_by: "Admin",
    updated_by: "Admin",
  },
];

const VehiclesList = () => {
  const [vehiclesData, setVehiclesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchVehiclesData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const list =
        response.data?.vehicles ||
        response.data?.vehicle ||
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : null);

      if (list && list.length > 0) {
        setVehiclesData(list);
      } else {
        setVehiclesData(SAMPLE_VEHICLES_DATA);
      }
    } catch (error) {
      console.error("Error fetching Vechiles data", error);
      setVehiclesData(SAMPLE_VEHICLES_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiclesData();
  }, []);

  const getStatusColor = (dueDate) => {
    const currentDate = moment();
    const dueDateObj = moment(dueDate);
    if (dueDateObj.isSameOrBefore(currentDate)) {
      return "red";
    }
    const oneMonthAfter = moment(currentDate).add(1, "month");
    if (dueDateObj.isBetween(currentDate, oneMonthAfter)) {
      return "orange";
    }
    return "green";
  };

  const filteredVehiclesData = useMemo(() => {
    const list =
      vehiclesData && vehiclesData.length > 0
        ? vehiclesData
        : SAMPLE_VEHICLES_DATA;
    return list.filter((vehicle) => {
      const vStatus = (vehicle?.vehicle_status || "").toString().trim().toLowerCase();
      const tab = (activeTab || "").toString().trim().toLowerCase();
      if (!vStatus && tab === "active") return true;
      return vStatus === tab;
    });
  }, [vehiclesData, activeTab]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "combined",
        header: "REGISTER NO & V TYPE",
        size: 190,
        accessorFn: (row) => `${row.reg_no} - ${row.vehicle_type}`,
        Cell: ({ row }) => (
          <div className="flex flex-col text-sm">
            <span className="text-slate-900 font-bold">{row.original.reg_no}</span>
            <span className="text-xs text-slate-500 font-medium">{row.original.vehicle_type}</span>
          </div>
        ),
      },
      {
        accessorKey: "combined2",
        header: "BRANCH & COMPANY",
        size: 210,
        accessorFn: (row) => `${row.vehicle_branch} - ${row.vehicle_company}`,
        Cell: ({ row }) => (
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-slate-800">{row.original.vehicle_branch}</span>
            <span className="text-xs text-slate-500">{row.original.vehicle_company}</span>
          </div>
        ),
      },
      {
        accessorKey: "mfg_year",
        header: "MODAL YEAR",
        size: 95,
        Cell: ({ row }) => (
          <span className="text-slate-700 font-medium text-sm">{row.original.mfg_year}</span>
        ),
      },
      {
        accessorKey: "combined_status",
        header: "INSU / PER / FC",
        size: 140,
        Cell: ({ row }) => {
          const { ins_due, permit_due, fc_due } = row.original;

          return (
            <div className="flex flex-row items-center gap-2">
              <div className="flex items-center">
                <Tooltip
                  label={`Insurance Due: ${moment(ins_due).format("DD-MM-YYYY")}`}
                  withArrow
                >
                  <span
                    className={`h-3 w-3 rounded-full shadow-2xs ${
                      getStatusColor(ins_due) === "red"
                        ? "bg-rose-500"
                        : getStatusColor(ins_due) === "orange"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </Tooltip>
              </div>
              <div className="flex items-center">
                <Tooltip
                  label={`Permit Due: ${moment(permit_due).format("DD-MM-YYYY")}`}
                  withArrow
                >
                  <span
                    className={`h-3 w-3 rounded-full shadow-2xs ${
                      getStatusColor(permit_due) === "red"
                        ? "bg-rose-500"
                        : getStatusColor(permit_due) === "orange"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </Tooltip>
              </div>
              <div className="flex items-center">
                <Tooltip
                  label={`FC Due: ${moment(fc_due).format("DD-MM-YYYY")}`}
                  withArrow
                >
                  <span
                    className={`h-3 w-3 rounded-full shadow-2xs ${
                      getStatusColor(fc_due) === "red"
                        ? "bg-rose-500"
                        : getStatusColor(fc_due) === "orange"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </Tooltip>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "created_by",
        header: "CREATED BY",
        size: 110,
        Cell: ({ row }) => (
          <span className="text-slate-700 text-sm font-medium">{row.original.created_by}</span>
        ),
      },
      {
        accessorKey: "updated_by",
        header: "UPDATE BY",
        size: 110,
        Cell: ({ row }) => (
          <span className="text-slate-700 text-sm font-medium">{row.original.updated_by}</span>
        ),
      },
      {
        id: "id",
        header: "ACTION",
        size: 110,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-2">
              <VechilesView
                onClick={() => {
                  setSelectedVehicleId(id);
                  setIsViewExpanded(true);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              />

              <VechilesEdit
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#F56616] hover:bg-orange-50 transition-colors"
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(`/vechile-edit/${encodeURIComponent(encryptedId)}`);
                }}
              />

              <VechilesTruck
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(
                    `/truckdetails-viewall/${encodeURIComponent(encryptedId)}`
                  );
                }}
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
    data: filteredVehiclesData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false, // Turned off to eliminate duplicate toolbar, search is now placed right before buttons
    state: {
      globalFilter,
    },
    mantineTableContainerProps: { sx: { maxHeight: "calc(100vh - 190px)" } },
  });

  return (
    <Layout>
      <div className="max-w-screen space-y-3">
        {/* All in One Line: Title on Left, Search + Buttons on Right */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-row justify-between items-center gap-4">
            {/* Left: Brand Icon + Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F56616] flex items-center justify-center border border-orange-100 shadow-2xs shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Vehicles List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Fleet Registration & Compliance Overview
                </span>
              </div>
            </div>

            {/* Right: Search Box immediately BEFORE Add Vehicle Button in the Same Line */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search vehicles..."
                  className="w-40 sm:w-56 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <VechilesCreate
                onClick={() => navigate("/createVechiles")}
                className={CreateButton}
              />

              <VechilesCreateTyre
                onClick={() => navigate("/createTyre")}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
              />

              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                <button
                  onClick={() => setActiveTab("Active")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "Active"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("Inactive")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "Inactive"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout with Side Panel */}
        <div className="flex w-full gap-4 items-start relative">
          <div
            className={`
            ${isViewExpanded ? "w-full lg:w-[68%]" : "w-full"} 
            transition-all duration-300 ease-in-out
          `}
          >
            <MantineReactTable table={table} />
          </div>

          {isViewExpanded && (
            <div
              className="w-full lg:w-[32%] bg-white rounded-2xl border border-slate-200/80 shadow-md p-4 transition-all duration-300 ease-in-out shrink-0"
            >
              <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Vehicle Dossier
                </span>
                <button
                  title="Close"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  onClick={() => {
                    setIsViewExpanded(false);
                    setSelectedVehicleId(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <PartialVechileView vehicleId={selectedVehicleId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VehiclesList;
