
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { Warehouse, Search } from "lucide-react";
import {
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import {
  MasterBranchCreate,
  MasterBranchEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";

const SAMPLE_BRANCHES = [
  {
    id: 1,
    branch_name: "KORAMANGALA OFFICE",
    branch_company: "DFC",
    branch_mobile: "9845012345",
    branch_email: "koramangala@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 2,
    branch_name: "ELECTRIC CARS",
    branch_company: "DFCY",
    branch_mobile: "9845023456",
    branch_email: "electriccars@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 3,
    branch_name: "HPC HAZARWADI",
    branch_company: "ARPL",
    branch_mobile: "9845034567",
    branch_email: "hpc.hazarwadi@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 4,
    branch_name: "HPC DHARWAD",
    branch_company: "ARPL",
    branch_mobile: "9845045678",
    branch_email: "dharwad@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 5,
    branch_name: "BPC DHARWAD",
    branch_company: "DFC",
    branch_mobile: "9845056789",
    branch_email: "bpcdharwad@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 6,
    branch_name: "HOSKOTE GARAGE",
    branch_company: "RK",
    branch_mobile: "9845067890",
    branch_email: "hoskote@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
  {
    id: 7,
    branch_name: "IOC THIMMAPUR",
    branch_company: "DFC",
    branch_mobile: "9845078901",
    branch_email: "thimmapur@dfcgroup.in",
    branch_status: "Active",
    created_by: "Admin",
    updated_by: "Admin",
  },
];

const BranchList = () => {
  const [branchData, setBranchData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = searchParams.get("page") || "1";
  const initialPageIndex = parseInt(pageQuery, 10) - 1;
  const searchQuery = searchParams.get("search") || "";

  const [globalFilter, setGlobalFilter] = useState(searchQuery);

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: 10,
  });

  // Sync URL with state
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

  // Fetch Branch Data
  const fetchBranchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-branch-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const list =
        response.data?.branch ||
        response.data?.branches ||
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : null);

      if (list && list.length > 0) {
        setBranchData(list);
      } else {
        setBranchData(SAMPLE_BRANCHES);
      }
    } catch (error) {
      console.error("Error fetching Branch data", error);
      setBranchData(SAMPLE_BRANCHES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchData();
  }, []);

  // TABLE COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: "branch_name",
        header: "Branch Name",
        size: 180,
        Cell: ({ row }) => (
          <span className="font-bold text-[#0A1D3D]">
            {row.original.branch_name}
          </span>
        ),
      },
      {
        accessorKey: "branch_company",
        header: "Company",
        size: 100,
        Cell: ({ row }) => (
          <span className="font-semibold text-slate-700">
            {row.original.branch_company}
          </span>
        ),
      },
      {
        accessorKey: "branch_mobile",
        header: "Mobile",
        size: 120,
      },
      {
        accessorKey: "branch_email",
        header: "Email",
        size: 180,
      },
      {
        accessorKey: "branch_status",
        header: "Status",
        size: 80,
        Cell: ({ row }) => (
          <span
            className="
              inline-flex items-center justify-center
              rounded-md
              border border-emerald-200
              bg-emerald-50
              px-3 py-1
              text-[11px]
              font-bold
              text-emerald-700
            "
          >
            {row.original.branch_status || "Active"}
          </span>
        ),
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
            <div className="flex items-center gap-2">
              <MasterBranchEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  const searchStr = searchParams.toString();

                  navigate(
                    `/master/branch-edit/${encodeURIComponent(
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
    [location.search, navigate]
  );

  // TABLE CONFIGURATION
  const table = useMantineReactTable({
    columns,
    data: branchData || [],

    enableTopToolbar: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableGlobalFilter: true,

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

        if (next.pageIndex === 0 && prev.pageIndex > 0) {
          if (!branchData || branchData.length === 0) {
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
        maxHeight: "calc(100vh - 210px)",
      },
    },

    enableColumnFilters: false,

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
      <div className="crm-layout max-w-screen space-y-3">

        {/* =================================
            BRANCH PAGE HEADER
        ================================= */}
        <div
          className="
            flex flex-col gap-3
            rounded-2xl
            border border-slate-200
            bg-white
            px-4 py-3
            shadow-[0_4px_18px_rgba(10,29,61,0.05)]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* LEFT: ICON + TITLE */}
          <div className="flex min-w-0 items-center gap-3">

            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl
                border border-orange-200
                bg-orange-50
                text-[#F56616]
              "
            >
              <Warehouse className="h-6 w-6" strokeWidth={1.9} />
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <h1 className="text-lg font-bold tracking-tight text-[#0A1D3D]">
                Branch List
              </h1>

              <span className="hidden text-slate-300 sm:inline">
                •
              </span>

              <p className="text-xs font-medium text-slate-600">
                Operational Hubs, Garages & Branch Locations
              </p>
            </div>
          </div>

          {/* RIGHT: SEARCH + CREATE */}
          <div className="flex w-full shrink-0 items-center gap-3 sm:w-auto">

            {/* SEARCH INPUT */}
            <div className="relative min-w-0 flex-1 sm:w-[260px] sm:flex-none">
              <Search
                className="
                  absolute left-4 top-1/2
                  h-5 w-5 -translate-y-1/2
                  text-[#0A1D3D]
                "
              />

              <input
                type="text"
                value={globalFilter}
                onChange={(e) => {
                  table.setGlobalFilter(e.target.value);
                }}
                placeholder="Search..."
                className="
                  h-12 w-full
                  rounded-xl
                  border border-slate-200
                  bg-white
                  pl-11 pr-4
                  text-sm font-medium
                  text-[#0A1D3D]
                  shadow-sm
                  outline-none
                  transition-all duration-200
                  placeholder:text-slate-400
                  hover:border-slate-300
                  focus:border-[#F56616]
                  focus:ring-4
                  focus:ring-orange-100
                "
              />
            </div>

            {/* CREATE BUTTON */}
            <div className="shrink-0">
              <MasterBranchCreate
                onClick={() => {
                  const searchStr = searchParams.toString();

                  navigate(
                    `/master/CreateBranch${searchStr ? `?${searchStr}` : ""}`
                  );
                }}
                className={CreateButton}
              />
            </div>

          </div>
        </div>

        {/* =================================
            BRANCH TABLE
        ================================= */}
        
        <div
          className="
            crm-layout
            overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-[0_4px_18px_rgba(10,29,61,0.06)]
          "
        >
          <MantineReactTable table={table} />
        </div>

      </div>
    </Layout>
  );
};

export default BranchList;
