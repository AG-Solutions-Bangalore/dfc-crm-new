import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import BASE_URL from "../../../base/BaseUrl";
import Layout from "../../../layout/Layout";
import moment from "moment/moment";
import { Disc, Search } from "lucide-react";

const TyreHistroy = () => {
  const [TyreHistroyData, setTyreHistroyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchUnassignData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-tyre-history-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTyreHistroyData(response.data?.tyreHistory || []);
    } catch (error) {
      console.error("Error fetching tyre history data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnassignData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "history_reg_no",
        header: "Reg No",
        size: 130,
        Cell: ({ row }) => (
          <span className="font-bold text-slate-900">
            {row.original.history_reg_no}
          </span>
        ),
      },
      {
        accessorKey: "history_assign_positionL",
        header: "Position",
        size: 140,
      },
      {
        accessorKey: "history_assign_no",
        header: "Tyre No",
        size: 110,
        Cell: ({ row }) => (
          <span className="font-semibold text-slate-800">
            {row.original.history_assign_no}
          </span>
        ),
      },
      {
        accessorKey: "history_assign_type",
        header: "Type",
        size: 90,
      },
      {
        accessorKey: "history_assign_make",
        header: "Make",
        size: 110,
      },
      {
        accessorKey: "history_assign_date",
        header: "Fitted Date",
        size: 110,
        Cell: ({ row }) => {
          const date = row.original.history_assign_date;
          return date ? moment(date).format("DD-MMM-YYYY") : "-";
        },
      },
      {
        accessorKey: "history_assign_km",
        header: "Fitted KM",
        size: 90,
      },
      {
        accessorKey: "history_assign_pre_date",
        header: "Removed Date",
        size: 110,
        Cell: ({ row }) => {
          const date = row.original.history_assign_pre_date;
          return date ? moment(date).format("DD-MMM-YYYY") : "-";
        },
      },
      {
        accessorKey: "history_assign_pre_km",
        header: "Removed KM",
        size: 100,
      },
      {
        accessorKey: "history_assign_km_run",
        header: "Total KM Run",
        size: 100,
        Cell: ({ row }) => (
          <span className="font-bold text-[#F56616]">
            {row.original.history_assign_km_run || "-"}
          </span>
        ),
      },
      {
        accessorKey: "history_assign_status",
        header: "Status",
        size: 90,
        Cell: ({ row }) => (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {row.original.history_assign_status || "Retired"}
          </span>
        ),
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
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: TyreHistroyData || [],
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
        {/* Header Bar */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-row justify-between items-center gap-4">
            {/* Left: Brand Icon + Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F56616] flex items-center justify-center border border-orange-100 shadow-2xs shrink-0">
                <Disc className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Tyre History List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Historical Tyre Fitment, Movement & KM Run Records
                </span>
              </div>
            </div>

            {/* Right: Search Box */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search tyre history..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full">
          {loading && !TyreHistroyData ? (
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

export default TyreHistroy;
