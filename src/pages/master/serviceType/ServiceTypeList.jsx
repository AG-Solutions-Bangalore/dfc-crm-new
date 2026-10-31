
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import {
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import {
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import {
  MasterServiceTypeCreate,
  MasterServiceTypeEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";

const ServiceTypeList = () => {
  const [serviceTypeData, setServiceTypeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = parseInt(searchParams.get("page") || "1", 10);
  const initialPageIndex = Math.max(
    0,
    (Number.isFinite(pageQuery) ? pageQuery : 1) - 1
  );

  const searchQuery = searchParams.get("search") || "";

  const [globalFilter, setGlobalFilter] = useState(searchQuery);

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: 10,
  });

  // Sync URL with search and pagination state
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const pageValue = parseInt(searchParams.get("page") || "1", 10);
    const page = Math.max(
      0,
      (Number.isFinite(pageValue) ? pageValue : 1) - 1
    );

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

  // Fetch Service Type Data
  const fetchServiceTypeData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-service-types-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServiceTypeData(response.data?.serviceTypes || []);
    } catch (error) {
      console.error("Error fetching service type data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceTypeData();
  }, []);

  // Search Handler
  const handleSearchChange = (value) => {
    setGlobalFilter(value);

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setSearchParams(params, { replace: true });
  };

  // Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "service_types",
        header: "Service Types",
        size: 250,
      },
      {
        accessorKey: "service_types_status",
        header: "Status",
        size: 120,
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 150,
      },
      {
        accessorKey: "updated_by",
        header: "Updated By",
        size: 150,
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
            <div className="flex items-center justify-center">
              <MasterServiceTypeEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  const searchStr = searchParams.toString();

                  navigate(
                    `/master/servicetype-edit/${encodeURIComponent(
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
    [searchParams, navigate]
  );

  // Mantine React Table
  const table = useMantineReactTable({
    columns,
    data: serviceTypeData,

    // Remove default toolbar
    enableTopToolbar: false,
    enableToolbarInternalActions: false,

    // Search
    enableGlobalFilter: true,
    enableColumnFilters: false,
    enableColumnFilterModes: false,
    globalFilterFn: "contains",

    // Table Controls
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,

    // Sorting
    enableSorting: true,

    // Sticky Header/Footer
    enableStickyHeader: true,
    enableStickyFooter: true,

    // State
    state: {
      globalFilter,
      pagination,
      isLoading: loading,
    },

    onGlobalFilterChange: handleSearchChange,

    // Pagination and URL Sync
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next =
          typeof updater === "function" ? updater(prev) : updater;

        if (next.pageIndex === 0 && prev.pageIndex > 0) {
          if (!serviceTypeData || serviceTypeData.length === 0) {
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

    // Paper Styling
    mantinePaperProps: {
      shadow: "none",
      sx: {
        padding: 0,
        margin: 0,
        border: "none",
        borderRadius: "16px",
        overflow: "hidden",
      },
    },

    // Table Container
    mantineTableContainerProps: {
      sx: {
        maxHeight: "400px",
        overflow: "auto",
        margin: 0,
        padding: 0,
      },
    },

    // Header Styling
    mantineTableHeadCellProps: {
      sx: {
        backgroundColor: "#142747",
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        padding: "9px 16px",
        borderBottom: "4px solid #F56616",

        "& .mantine-TableHeadCell-Content": {
          color: "#ffffff",
        },

        "& .mantine-TableHeadCell-Content-Wrapper": {
          color: "#ffffff",
        },

        "& button": {
          color: "#F56616",
        },

        "& svg": {
          color: "#F56616",
        },
      },
    },

    // Body Cell Styling
    mantineTableBodyCellProps: {
      sx: {
        fontSize: "13px",
        fontWeight: 500,
        color: "#1e293b",
        padding: "9px 16px",
        borderBottom: "1px solid #e2e8f0",
      },
    },

    // Row Styling
    mantineTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor:
          row.index % 2 === 0 ? "#ffffff" : "#f8fafc",

        "&:hover": {
          backgroundColor: "#fff4ed !important",
        },
      },
    }),

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
        pageIndex: initialPageIndex,
        pageSize: 10,
      },
    },
  });

  return (
    <Layout>
      <div className="w-full space-y-4">

        {/* Redesigned Page Header */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-6 py-4 shadow-sm">

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">

            {/* Left Section */}
            <div className="flex items-center gap-4 min-w-0">

              {/* Icon */}
              <div className="
                flex h-14 w-14 shrink-0 items-center justify-center
                rounded-2xl
                bg-orange-50
                border border-orange-100
              ">
                <IconSettings
                  size={27}
                  stroke={1.8}
                  className="text-[#F56616]"
                />
              </div>

              {/* Title and Subtitle */}
              <div className="min-w-0">

                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[#0A1F44]">
                  Service Type List
                </h1>

                <div className="flex items-center gap-2 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F56616]" />

                  <p className="text-sm text-slate-500 font-medium">
                    Manage and configure service types
                  </p>
                </div>

              </div>
            </div>

            {/* Right Section: Search + Add */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">

              {/* Search */}
              <div className="relative w-full sm:w-[240px] lg:w-[260px]">

                <IconSearch
                  size={21}
                  stroke={2}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#142747] pointer-events-none"
                />

                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search service type..."
                  className="
                    w-full h-12
                    pl-11 pr-4
                    rounded-xl
                    border border-slate-200
                    bg-slate-50/50
                    text-sm text-slate-700
                    placeholder:text-slate-400
                    outline-none
                    transition-all duration-200
                    focus:bg-white
                    focus:border-[#F56616]
                    focus:ring-2 focus:ring-orange-100
                  "
                />

              </div>

              {/* Add Service Type */}
              <MasterServiceTypeCreate
                onClick={() => {
                  const searchStr = searchParams.toString();

                  navigate(
                    `/master/createServicetype${searchStr ? `?${searchStr}` : ""}`
                  );
                }}
                className={`${CreateButton} h-12 px-6 rounded-xl whitespace-nowrap w-full sm:w-auto`}
              />

            </div>

          </div>
        </div>

        {/* Table Section - Unchanged */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <MantineReactTable table={table} />
        </div>

      </div>
    </Layout>
  );
};

export default ServiceTypeList;
