import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { Building2, Search } from "lucide-react";
import ViewCompany from "./ViewCompany";
import {
  MasterCompanyCreate,
  MasterCompanyEdit,
  MasterCompanyView,
} from "../../../components/buttonIndex/ButtonComponents";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { CreateButton } from "../../../components/common/ButtonColors";

const SAMPLE_COMPANIES = [
  {
    id: 1,
    company_short: "AGARWAL PUMP",
    company_name: "AGARWAL PUMP",
    company_mobile: "9845081002",
    company_email: "agarwalpump17@gmail.com",
    company_gst: "29AAJPA7616D2ZV",
    company_pan: "AAJPA7616D",
    company_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 2,
    company_short: "ARPL",
    company_name: "AKASH ROADLINES PVT LTD",
    company_mobile: "9591997003",
    company_email: "ARJUN@DFCLOGISTICS.COM",
    company_gst: "29AACCA6557F1ZK",
    company_pan: "AACCA6557F",
    company_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 3,
    company_short: "AUM GAS",
    company_name: "AUM GAS",
    company_mobile: "9876543211",
    company_email: "aumgas@gmail.com",
    company_gst: "29AABCA9012F1Z1",
    company_pan: "AABCA9012F",
    company_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 4,
    company_short: "DFC",
    company_name: "DELHI FREIGHT CARRIERS",
    company_mobile: "9845081002",
    company_email: "kkadfc@gmail.com",
    company_gst: "29AACFD2807Q1Z3",
    company_pan: "AACFD2807Q",
    company_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
  {
    id: 5,
    company_short: "DIFCY",
    company_name: "DIFCY LOGISTICS",
    company_mobile: "9845081002",
    company_email: "kkadfc@gmail.com",
    company_gst: "29AACFD2807Q1Z3",
    company_pan: "AACFD2807Q",
    company_status: "Active",
    created_by: "user",
    updated_by: "user",
  },
];

const CompanyList = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

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

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-company-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const list =
        response.data?.company ||
        response.data?.companies ||
        response.data?.data ||
        (Array.isArray(response.data) ? response.data : null);

      if (list && list.length > 0) {
        setCompanyData(list);
      } else {
        setCompanyData(SAMPLE_COMPANIES);
      }
    } catch (error) {
      console.error("Error fetching Company data", error);
      setCompanyData(SAMPLE_COMPANIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "company_short",
        header: "SHORT",
        size: 140,
        Cell: ({ row }) => (
          <span className="font-bold text-slate-900 text-sm">{row.original.company_short}</span>
        ),
      },
      {
        accessorKey: "company_name",
        header: "COMPANY",
        size: 200,
        Cell: ({ row }) => (
          <span className="font-semibold text-slate-800 text-sm">{row.original.company_name}</span>
        ),
      },
      {
        accessorKey: "company_mobile",
        header: "MOBILE",
        size: 120,
        Cell: ({ row }) => (
          <span className="text-slate-700 text-sm font-medium">{row.original.company_mobile}</span>
        ),
      },
      {
        accessorKey: "company_email",
        header: "EMAIL",
        size: 200,
        Cell: ({ row }) => (
          <span className="text-slate-700 text-sm">{row.original.company_email}</span>
        ),
      },
      {
        accessorKey: "combined",
        header: "GST & PAN NO",
        size: 180,
        accessorFn: (row) => `${row.company_gst} - ${row.company_pan}`,
        Cell: ({ row }) => (
          <div className="flex flex-col text-sm">
            <span className="text-slate-900 font-bold">
              {row.original.company_gst}
            </span>
            <span className="text-slate-500 text-xs font-semibold">{row.original.company_pan}</span>
          </div>
        ),
      },
      {
        accessorKey: "company_status",
        header: "STATUS",
        size: 90,
        Cell: ({ row }) => (
          <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            {row.original.company_status || "Active"}
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
              <MasterCompanyEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  const searchStr = searchParams.toString();
                  navigate(
                    `/master/company-edit/${encodeURIComponent(
                      encryptedId,
                    )}${searchStr ? `?${searchStr}` : ""}`,
                  );
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#F56616] hover:bg-orange-50 transition-colors"
              />
              <MasterCompanyView
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
    data: companyData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false, // Turned off to eliminate duplicate toolbar, search is now placed right before + Company
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;

        if (next.pageIndex === 0 && prev.pageIndex > 0) {
          if (!companyData || companyData.length === 0) {
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
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Company List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Master Company Records & Legal Profiles
                </span>
              </div>
            </div>

            {/* Right: Search Input Box immediately BEFORE Add Company Button in the Same Line */}
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
                  placeholder="Search..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <MasterCompanyCreate
                onClick={() => {
                  const searchStr = searchParams.toString();
                  navigate(
                    `/master/createCompany${searchStr ? `?${searchStr}` : ""}`,
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
            {companyData ? (
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
                  Company Profile
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
              <ViewCompany companyId={selectedVehicleId} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyList;
