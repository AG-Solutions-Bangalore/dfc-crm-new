
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import {
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MapPin, Search } from "lucide-react";

const TyrePositionList = () => {
  const [tyrePositionData, setTyrePositionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  // Fetch Tyre Position Data
  const fetchTyrePositionData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-position-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTyrePositionData(response.data?.tyrePosition || []);
    } catch (error) {
      console.error("Error fetching Tyre Position data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTyrePositionData();
  }, []);

  // Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "vehicle_type",
        header: "Vehicle",
        size: 150,
      },
      {
        accessorKey: "tyre_position",
        header: "Tyre Position",
        size: 150,
      },
      {
        accessorKey: "tyre_positioning_status",
        header: "Status",
        size: 100,
      },
    ],
    []
  );

  // Mantine React Table
  const table = useMantineReactTable({
    columns,
    data: tyrePositionData,

    enableTopToolbar: false,
    enableGlobalFilter: true,
    enableColumnFilters: false,
    enableColumnFilterModes: false,

    // Toolbar Controls
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,

    // Sorting
    enableSorting: true,

    // Table Features
    enableStickyHeader: true,
    enableStickyFooter: true,

    // Table Container
    mantineTableContainerProps: {
      sx: {
        maxHeight: "400px",
        overflow: "auto",
      },
    },

    // Pagination
    enablePagination: true,
    positionPagination: "right",
    mantinePaginationProps: {
      rowsPerPageOptions: ["6", "10", "15", "20"],
      withEdges: true,
    },

    initialState: {
      showGlobalFilter: false,
      showColumnFilters: false,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },

    state: {
      isLoading: loading,
      globalFilter,
    },

    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Layout>
      <div className="max-w-screen space-y-3">
        {/* PAGE HEADER */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F56616] flex items-center justify-center border border-orange-100 shadow-2xs shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Tyre Position List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Manage and view vehicle tyre position records
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        {tyrePositionData.length > 0 || !loading ? (
          <MantineReactTable table={table} />
        ) : (
          <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F56616]"></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TyrePositionList;
