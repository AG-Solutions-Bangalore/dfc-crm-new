
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  MasterTyreMakeCreate,
  MasterTyreMakeEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { RotateCcw, Search } from "lucide-react";

const TyreMakeList = () => {
  const [tyreMakeData, setTyreMakeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );

  const pageQuery = searchParams.get("page") || "1";
  const initialPageIndex = parseInt(pageQuery, 10) - 1;

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: 10,
  });

  // Sync URL with table state
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

  // Fetch Tyre Make Data
  const fetchTyreMakeData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-make-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTyreMakeData(response.data?.tyreMake);
    } catch (error) {
      console.error("Error fetching tyre make data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTyreMakeData();
  }, []);

  // Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "tyre_make",
        header: "Tyre Make",
        size: 50,
      },
      {
        accessorKey: "tyre_make_status",
        header: "Status",
        size: 50,
      },
      {
        id: "id",
        header: "Action",
        size: 20,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex gap-2">
              <MasterTyreMakeEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  const searchStr = searchParams.toString();

                  navigate(
                    `/master/tyremake-edit/${encodeURIComponent(
                      encryptedId
                    )}${searchStr ? `?${searchStr}` : ""}`
                  );
                }}
                className="flex items-center space-x-2"
              />
            </div>
          );
        },
      },
    ],
    [navigate, searchParams]
  );

  // Table Configuration
  const table = useMantineReactTable({
    columns,
    data: tyreMakeData || [],

    enableTopToolbar: false,
    enableToolbarInternalActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableColumnFilters: false,

    state: {
      showGlobalFilter: false,
      globalFilter,
      pagination,
      isLoading: loading,
    },

    onGlobalFilterChange: (value) => {
      const nextFilter = value || "";

      if (nextFilter !== globalFilter) {
        setGlobalFilter(nextFilter);

        const params = new URLSearchParams(searchParams);

        if (nextFilter) {
          params.set("search", nextFilter);
        } else {
          params.delete("search");
        }

        params.set("page", "1");
        setSearchParams(params, { replace: true });
      }
    },

    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next =
          typeof updater === "function" ? updater(prev) : updater;

        // Prevent unwanted pagination reset while loading
        if (next.pageIndex === 0 && prev.pageIndex > 0) {
          if (!tyreMakeData || tyreMakeData.length === 0) {
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

    mantineTableContainerProps: {
      sx: {
        maxHeight: "400px",
      },
    },

    initialState: {
      columnVisibility: {
        address: false,
      },
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: 10,
      },
    },
  });

  return (
    <Layout>
      <div className="max-w-screen space-y-3">
        {/* PAGE HEADER */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F56616] flex items-center justify-center border border-orange-100 shadow-2xs shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Tyre Make List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Manage and view tyre make records
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => table.setGlobalFilter(e.target.value)}
                  placeholder="Search tyre make..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <MasterTyreMakeCreate
                onClick={() => {
                  const searchStr = searchParams.toString();
                  navigate(
                    `/master/createTyremake${searchStr ? `?${searchStr}` : ""}`
                  );
                }}
                className={CreateButton}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        {tyreMakeData ? (
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

export default TyreMakeList;
