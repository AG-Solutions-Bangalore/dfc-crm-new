import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../../base/BaseUrl";
import {
  MasterUnderInspectDelete,
  MasterUnderInspectEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import Layout from "../../../layout/Layout";
import { Disc, Search } from "lucide-react";

const InspectionTyreList = () => {
  const [inspectionTyreData, setInspectionTyreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: null,
  });
  const navigate = useNavigate();

  const fetchInspectionData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-inspection-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInspectionTyreData(response.data?.tyre || []);
    } catch (error) {
      console.error("Error fetching inspection Tyre data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspectionData();
  }, []);

  const handleTyreUpdate = async (e, id) => {
    e.preventDefault();
    setDialogConfig({
      title: "Update Tyre",
      message: "Are you sure you want to update this tyre from inspection?",
      onConfirm: async () => {
        try {
          setLoading(true);
          await axios({
            url: `${BASE_URL}/api/web-update-tyre-inspection/${id}`,
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          toast.success("Tyre Updated Successfully");
          setDialogOpen(false);
          fetchInspectionData();
        } catch (error) {
          toast.error("Failed to update tyre");
        } finally {
          setLoading(false);
        }
      },
    });
    setDialogOpen(true);
  };

  const handleTyreDelete = async (e, id) => {
    e.preventDefault();
    setDialogConfig({
      title: "Delete Tyre Record",
      message: "Are you sure you want to delete this tyre inspection record?",
      onConfirm: async () => {
        try {
          setLoading(true);
          await axios({
            url: `${BASE_URL}/api/web-delete-tyre-inspection/${id}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          toast.success("Tyre Deleted Successfully");
          setDialogOpen(false);
          fetchInspectionData();
        } catch (error) {
          toast.error("Failed to delete tyre");
        } finally {
          setLoading(false);
        }
      },
    });
    setDialogOpen(true);
  };

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
        size: 110,
        Cell: ({ row }) => (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            {row.original.tyre_sub_status || "Inspection"}
          </span>
        ),
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
        size: 100,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-1.5">
              <MasterUnderInspectEdit
                onClick={(e) => handleTyreUpdate(e, id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#F56616] hover:bg-orange-50 transition-colors cursor-pointer"
              />
              <MasterUnderInspectDelete
                onClick={(e) => handleTyreDelete(e, id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
    data: inspectionTyreData || [],
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
      <Dialog
        open={dialogOpen}
        handler={() => setDialogOpen(false)}
        className="rounded-2xl p-2"
      >
        <DialogHeader className="text-base font-bold text-[#0A1D3D]">
          {dialogConfig.title}
        </DialogHeader>
        <DialogBody className="text-sm text-slate-600">
          {dialogConfig.message}
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => setDialogOpen(false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold capitalize"
          >
            Cancel
          </Button>
          <Button
            onClick={dialogConfig.onConfirm}
            className="rounded-xl bg-[#F56616] hover:bg-[#E85B0B] px-5 py-2 text-xs font-semibold text-white capitalize shadow-sm"
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>

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
                  Inspection Tyre List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Quality Control & Workshop Inspection
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
                  placeholder="Search inspection tyres..."
                  className="w-44 sm:w-64 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full">
          {loading && !inspectionTyreData ? (
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

export default InspectionTyreList;
