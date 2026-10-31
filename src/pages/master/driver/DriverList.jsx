import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Users, Search } from "lucide-react";
import ViewDriver from "./ViewDriver";
import {
  MasterDriverCreate,
  MasterDriverEdit,
  MasterDriverView,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";

const SAMPLE_DRIVERS = [
  {
    id: 1,
    full_name: "RAMESH KUMAR",
    user_branch: "KORAMANGALA OFFICE",
    user_company: "DFC",
    mobile: "9845012345",
    dl_no: "KA0120190012345",
    driver_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 2,
    full_name: "SURESH PATIL",
    user_branch: "HPC DHARWAD",
    user_company: "ARPL",
    mobile: "9845023456",
    dl_no: "KA2520180023456",
    driver_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 3,
    full_name: "MANJUNATH B",
    user_branch: "IOC THIMMAPUR",
    user_company: "DFC",
    mobile: "9845034567",
    dl_no: "KA2720200034567",
    driver_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 4,
    full_name: "ANAND SHARMA",
    user_branch: "ELECTRIC CARS",
    user_company: "DFCY",
    mobile: "9845045678",
    dl_no: "KA0520210045678",
    driver_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
];

const DriverList = () => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = searchParams.get("page") || "1";
  const initialPageIndex = parseInt(pageQuery, 10) - 1;
  const searchQuery = searchParams.get("search") || "";

  const [globalFilter, setGlobalFilter] = useState(searchQuery);
  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: 10,
  });

  // Sync URL with state (for browser back/forward and initial load)
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10) - 1;

    if (search !== globalFilter) {
      setGlobalFilter(search);
    }
    if (page !== pagination.pageIndex) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page,
      }));
    }
  }, [searchParams]);

  const fetchDriverData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-driver-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const list =
        response.data?.driver ||
        response.data?.drivers ||
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : null);

      if (list && list.length > 0) {
        setDriverData(list);
      } else {
        setDriverData(SAMPLE_DRIVERS);
      }
    } catch (error) {
      console.error("Error fetching driver data", error);
      setDriverData(SAMPLE_DRIVERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: "DRIVER NAME",
        size: 180,
        Cell: ({ row }) => (
          <span className="font-bold text-slate-900 text-sm">{row.original.full_name}</span>
        ),
      },
      {
        accessorKey: "user_branch",
        header: "BRANCH",
        size: 180,
        Cell: ({ row }) => (
          <span className="text-slate-800 text-sm font-medium">{row.original.user_branch}</span>
        ),
      },
      {
        accessorKey: "user_company",
        header: "COMPANY",
        size: 110,
        Cell: ({ row }) => (
          <span className="font-semibold text-slate-800 text-sm">{row.original.user_company}</span>
        ),
      },
      {
        accessorKey: "mobile",
        header: "MOBILE",
        size: 130,
        Cell: ({ row }) => (
          <span className="text-slate-700 text-sm">{row.original.mobile}</span>
        ),
      },
      {
        accessorKey: "driver_status",
        header: "STATUS",
        size: 90,
        Cell: ({ row }) => (
          <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            {row.original.driver_status || "Active"}
          </span>
        ),
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
        size: 90,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-2">
              <MasterDriverEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  const searchStr = searchParams.toString();
                  navigate(
                    `/master/driver-edit/${encodeURIComponent(
                      encryptedId,
                    )}${searchStr ? `?${searchStr}` : ""}`,
                  );
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#F56616] hover:bg-orange-50 transition-colors"
              />
              <MasterDriverView
                onClick={() => {
                  setSelectedVehicleId(id);
                  setIsViewExpanded(true);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              />
            </div>
          );
        },
      },
    ],
    [location.search, navigate],
  );

  const table = useMantineReactTable({
    columns,
    data: driverData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false, // Turned off to eliminate duplicate toolbar, search is now placed right before + Add Driver
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;

        if (next.pageIndex === 0 && prev.pageIndex > 0) {
          if (!driverData || driverData.length === 0) {
            return prev;
          }
        }
        if (next.pageIndex !== prev.pageIndex) {
          const params = new URLSearchParams(searchParams);
          params.set("page", (next.pageIndex + 1).toString());
          setSearchParams(params, { replace: true });
        }
        return next;
      });
    },
    autoResetPagination: false,
    autoResetGlobalFilter: false,
    autoResetAll: false,
    mantineTableContainerProps: { sx: { maxHeight: "calc(100vh - 190px)" } },
    enableColumnFilters: false,
    initialState: {
      columnVisibility: { address: false },
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: 10,
      },
    },
  });

  return (
    <Layout>
      <div className="max-w-screen space-y-3">
        {/* All in One Line: Title on Left, Search + Add Button on Right */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-row justify-between items-center gap-4">
            {/* Left: Brand Icon + Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F56616] flex items-center justify-center border border-orange-100 shadow-2xs shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Driver List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Driver Profiles, Licenses & Compliance Records
                </span>
              </div>
            </div>

            {/* Right: Search Input Box immediately BEFORE Add Driver Button in the Same Line */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={globalFilter || ""}
                  onChange={(e) => {
                    const nextFilter = e.target.value;
                    setGlobalFilter(nextFilter);
                    const params = new URLSearchParams(searchParams);
                    if (nextFilter) {
                      params.set("search", nextFilter);
                    } else {
                      params.delete("search");
                    }
                    params.set("page", "1");
                    setSearchParams(params, { replace: true });
                  }}
                  placeholder="Search driver..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <MasterDriverCreate
                onClick={() => {
                  const searchStr = searchParams.toString();
                  navigate(
                    `/master/createDriver${searchStr ? `?${searchStr}` : ""}`,
                  );
                }}
                className={CreateButton}
              />
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
            {driverData ? (
              <MantineReactTable table={table} />
            ) : (
              <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F56616]"></div>
              </div>
            )}
          </div>

          {isViewExpanded && (
            <div
              className="w-full lg:w-[32%] bg-white rounded-2xl border border-slate-200/80 shadow-md p-4 transition-all duration-300 ease-in-out shrink-0"
            >
              <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Driver Profile
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
              <ViewDriver driverId={selectedVehicleId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DriverList;
