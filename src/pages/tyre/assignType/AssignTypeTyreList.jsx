import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MasterFittedTyreView } from "../../../components/buttonIndex/ButtonComponents";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { Disc, Search } from "lucide-react";

const AssignTypeTyreList = () => {
  const [assignTypeTyreData, setAssignTypeTyreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

  const fetchAssignTyreData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-assign-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssignTypeTyreData(response.data?.tyre || []);
    } catch (error) {
      console.error("Error fetching assign type tyre data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignTyreData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tyre_sub_no",
        header: "Tyre No",
        size: 140,
        Cell: ({ row }) => (
          <span className="font-bold text-slate-900">
            {row.original.tyre_sub_no}
          </span>
        ),
      },
      {
        accessorKey: "tyre_sub_branch",
        header: "Branch",
        size: 150,
      },
      {
        accessorKey: "tyre_sub_type",
        header: "Tyre Type",
        size: 110,
      },
      {
        accessorKey: "tyre_sub_make",
        header: "Tyre Make",
        size: 130,
      },
      {
        accessorKey: "tyre_sub_status",
        header: "Status",
        size: 100,
        Cell: ({ row }) => {
          const status = row.original.tyre_sub_status;
          return (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {status || "Fitted"}
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
        size: 80,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-2">
              <MasterFittedTyreView
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(
                    `/tyre/assign-view/${encodeURIComponent(encryptedId)}`
                  );
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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
    data: assignTypeTyreData || [],
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
                  Fitted Tyre List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Active Mounted Vehicle Tyres
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
                  placeholder="Search fitted tyres..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full">
          {loading && !assignTypeTyreData ? (
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

export default AssignTypeTyreList;
