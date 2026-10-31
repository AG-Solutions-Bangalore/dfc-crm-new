
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { Search, SlidersHorizontal, X, Building2 } from "lucide-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import ViewVendor from "./ViewVendor";
import {
  MasterVendorCreate,
  MasterVendorEdit,
  MasterVendorView,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";

const VendorList = () => {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  // Search and Filter states
  const [globalFilter, setGlobalFilter] = useState("");
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const fetchVendorData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vendor-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVendorData(response.data?.vendor);
    } catch (error) {
      console.error("Error fetching Vendor data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "vendor_name",
        header: "Vendor Name",
        size: 180,
      },
      {
        accessorKey: "vendor_type",
        header: "Vendor Type",
        size: 150,
      },
      {
        accessorKey: "vendor_branch",
        header: "Branch",
        size: 130,
      },
      {
        accessorKey: "vendor_mobile",
        header: "Mobile",
        size: 140,
      },
      {
        accessorKey: "vendor_status",
        header: "Status",
        size: 110,
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 120,
      },
      {
        accessorKey: "updated_by",
        header: "Update By",
        size: 120,
      },
      {
        id: "id",
        header: "Action",
        size: 100,
        enableHiding: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-2">
              <MasterVendorEdit
                onClick={() => {
                  const encryptedId = encryptId(id);

                  navigate(
                    `/master/vendor-edit/${encodeURIComponent(encryptedId)}`
                  );
                }}
                className="flex items-center space-x-2"
              />

              <MasterVendorView
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
    [navigate]
  );

  const table = useMantineReactTable({
    columns,
    data: vendorData || [],

    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,

    // Remove separate table toolbar
    enableTopToolbar: false,
    enableBottomToolbar: true,

    // Search and column filters
    enableGlobalFilter: true,
    enableColumnFilters: true,

    state: {
      globalFilter,
      showColumnFilters,
    },

    onGlobalFilterChange: setGlobalFilter,

    mantineTableContainerProps: {
  sx: {
    height: "calc(100vh - 290px)",
    maxHeight: "calc(100vh - 290px)",
    minHeight: "450px",
    overflowY: "auto",
  },
},

    initialState: {
      columnVisibility: { address: false },
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },

    mantinePaperProps: {
      shadow: "none",
      radius: "xl",
      sx: {
        border: "none",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      },
    },

    mantineTableProps: {
      striped: false,
      highlightOnHover: true,
      withColumnBorders: false,
      sx: {
        tableLayout: "auto",
      },
    },

    mantineTableHeadCellProps: {
      sx: {
        backgroundColor: "#142747",
        color: "#FFFFFF",
        fontSize: "13px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.3px",
        padding: "15px 16px",
        borderBottom: "3px solid #F56616",
        whiteSpace: "nowrap",

        "& .mantine-TableHeadCell-Content": {
          color: "#FFFFFF",
        },

        "& .mantine-TableHeadCell-Content-Labels": {
          color: "#FFFFFF",
        },

        "& button": {
          color: "#FFFFFF",
        },

        "& svg": {
          color: "#F56616",
        },
      },
    },

    mantineTableBodyCellProps: {
      sx: {
        padding: "15px 16px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#263449",
        borderBottom: "1px solid #E2E8F0",
      },
    },

    mantineTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor: row.index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
        transition: "background-color 150ms ease",

        "&:hover": {
          backgroundColor: "#FFF7ED !important",
        },
      },
    }),

    mantineBottomToolbarProps: {
      sx: {
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #F1F5F9",
        padding: "8px 16px",
      },
    },

    mantinePaginationProps: {
      rowsPerPageOptions: ["10", "20", "30", "50"],
      withEdges: true,
      radius: "md",
      size: "sm",
    },
  });

  return (
    <Layout>
      <div className="w-full space-y-4">

        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-[#F56616]">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-[#0A1F44]">
                    Vendor List
                  </h1>

                  <span className="hidden text-xs text-slate-300 sm:inline">
                    •
                  </span>

                  <p className="hidden text-xs font-medium text-slate-500 sm:block">
                    Vendor Management & Supplier Details
                  </p>
                </div>
              </div>
            </div>

            {/* Search + Filter + Add Vendor */}
            <div className="flex flex-wrap items-center gap-2">

              {/* Search */}
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search vendors..."
                  className="h-10 w-[180px] rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100 sm:w-[210px]"
                />

                {globalFilter && (
                  <button
                    type="button"
                    onClick={() => setGlobalFilter("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    title="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Filter */}
              <button
                type="button"
                onClick={() =>
                  setShowColumnFilters((prev) => !prev)
                }
                className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition ${
                  showColumnFilters
                    ? "border-orange-200 bg-orange-50 text-[#F56616]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-[#F56616]"
                }`}
                title="Toggle column filters"
              >
                <SlidersHorizontal size={17} />
                <span className="hidden sm:inline">Filter</span>
              </button>

              {/* Add Vendor */}
              <MasterVendorCreate
                onClick={() => navigate("/master/createVendor")}
                className={CreateButton}
              />
            </div>
          </div>
        </div>

        {/* Table and View Panel */}
        <div className="relative flex w-full items-start gap-4">

          <div
            className={`min-w-0 transition-all duration-300 ${
              isViewExpanded ? "w-full lg:w-[68%]" : "w-full"
            }`}
          >
            {vendorData ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <MantineReactTable table={table} />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#F56616]" />
              </div>
            )}
          </div>

          {/* Vendor View Side Panel */}
          {isViewExpanded && (
            <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 lg:w-[32%]">

              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#142747]">
                    Vendor Details
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    View vendor information
                  </p>
                </div>

                <button
                  type="button"
                  title="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-orange-50 hover:text-[#F56616]"
                  onClick={() => {
                    setIsViewExpanded(false);
                    setSelectedVehicleId(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <ViewVendor vendorId={selectedVehicleId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VendorList;
