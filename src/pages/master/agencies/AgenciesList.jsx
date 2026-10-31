
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import {
  Building2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import ViewAgencies from "./ViewAgencies";
import {
  MasterAgenciesCreate,
  MasterAgenciesEdit,
  MasterAgenciesView,
} from "../../../components/buttonIndex/ButtonComponents";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { CreateButton } from "../../../components/common/ButtonColors";

const SAMPLE_AGENCIES = [
  {
    id: 1,
    agency_name: "CHERRY AGENCIES PVT. LTD.",
    agency_mobile: "9845011223",
    agency_email: "contact@cherryagencies.com",
    agency_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 2,
    agency_name: "SPEED FREIGHT LOGISTICS",
    agency_mobile: "9845022334",
    agency_email: "info@speedfreight.com",
    agency_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 3,
    agency_name: "NATIONAL CARRIERS ASSOC.",
    agency_mobile: "9845033445",
    agency_email: "support@nca.com",
    agency_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 4,
    agency_name: "FAST TRACK ROADWAYS",
    agency_mobile: "9845044556",
    agency_email: "dispatch@fasttrack.in",
    agency_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
];

const AgenciesList = () => {
  const [agenciesData, setAgenciesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  // Search and filter states
  const [globalFilter, setGlobalFilter] = useState("");
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const fetchAgenciesData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-agencies-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const list =
        response.data?.agencies ||
        response.data?.agency ||
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : null);

      if (list && list.length > 0) {
        setAgenciesData(list);
      } else {
        setAgenciesData(SAMPLE_AGENCIES);
      }
    } catch (error) {
      console.error("Error fetching Agencies data", error);
      setAgenciesData(SAMPLE_AGENCIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgenciesData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "agency_name",
        header: "Agency Name",
        size: 180,
        Cell: ({ row }) => (
          <span className="font-bold text-slate-800">
            {row.original.agency_name}
          </span>
        ),
      },
      {
        accessorKey: "agency_mobile",
        header: "Mobile",
        size: 120,
      },
      {
        accessorKey: "agency_email",
        header: "Email",
        size: 180,
      },
      {
        accessorKey: "agency_status",
        header: "Status",
        size: 100,
        Cell: ({ row }) => {
          const currentStatus = row.original.agency_status || "Active";

          return (
            <span
              className={`inline-block rounded-md border px-2.5 py-1 text-xs font-semibold ${
                currentStatus === "Active"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              {currentStatus}
            </span>
          );
        },
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 110,
      },
      {
        accessorKey: "updated_by",
        header: "Update By",
        size: 110,
      },
      {
        id: "id",
        header: "Action",
        size: 90,
        enableHiding: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-2">
              <MasterAgenciesEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(
                    `/master/agencies-edit/${encodeURIComponent(encryptedId)}`
                  );
                }}
                className="flex items-center space-x-2"
              />

              <MasterAgenciesView
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
    data: agenciesData || [],

    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,

    enableTopToolbar: false,
    enableBottomToolbar: true,

    enableGlobalFilter: true,
    enableColumnFilters: true,

    state: {
      globalFilter,
      showColumnFilters,
    },

    onGlobalFilterChange: setGlobalFilter,

    mantineTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 285px)",
        minHeight: "300px",
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
        {/* Header with Search, Filter and Add Button */}
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-[#F56616]">
                <Building2 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-[#0A1F44]">
                    Agencies List
                  </h1>
                  <span className="hidden text-xs text-slate-300 sm:inline">
                    •
                  </span>
                  <p className="hidden text-xs font-medium text-slate-500 sm:block">
                    Partner Agencies & Supplier Networks
                  </p>
                </div>
              </div>
            </div>

            {/* Search + Filter + Add */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search agencies..."
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

              <button
                type="button"
                onClick={() => setShowColumnFilters((prev) => !prev)}
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

              <MasterAgenciesCreate
                onClick={() => navigate("/master/createAgency")}
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
            {agenciesData ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <MantineReactTable table={table} />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#F56616]" />
              </div>
            )}
          </div>

          {/* Agency View Side Panel */}
          {isViewExpanded && (
            <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 lg:w-[32%]">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-bold uppercase tracking-wide text-[#142747]">
                  Agency Details
                </span>

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

              <ViewAgencies agencyId={selectedVehicleId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgenciesList;
