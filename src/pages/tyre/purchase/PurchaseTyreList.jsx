import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment/moment";
import {
  MasterPurchaseCreate,
  MasterPurchaseEdit,
  MasterPurchaseView,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { Disc, Search } from "lucide-react";

const PurchaseTyreList = () => {
  const [purchaseTyreData, setPurchaseTyreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const navigate = useNavigate();

  const fetchPurchaseTyreData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPurchaseTyreData(
        response.data?.tyre?.map((item) => ({
          ...item,
          tyre_sub_no_list:
            item.subs?.map((sub) => sub.tyre_sub_no).join(", ") || "",
        }))
      );
    } catch (error) {
      console.error("Error fetching Purchase Tyre data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseTyreData();
  }, []);

  // Filter data based on search
  useEffect(() => {
    if (!purchaseTyreData) return;

    if (!searchTerm.trim()) {
      setFilteredData(purchaseTyreData);
    } else {
      const term = searchTerm.toLowerCase().trim();

      const filtered = purchaseTyreData.filter((item) => {
        // Check tyre_sub_no_list
        if (item.tyre_sub_no_list) {
          const subNos = item.tyre_sub_no_list.toLowerCase();
          if (subNos.includes(term)) {
            return true;
          }
        }

        // Check individual tyre_sub_no
        if (item.subs && Array.isArray(item.subs)) {
          const hasMatchingSub = item.subs.some((sub) => {
            if (sub.tyre_sub_no) {
              return sub.tyre_sub_no.toLowerCase().includes(term);
            }
            return false;
          });

          if (hasMatchingSub) return true;
        }

        // Check string fields
        const stringFields = [
          "tyre_bill_ref",
          "tyre_supplier",
          "tyre_company",
          "tyre_branch",
          "tyre_status",
          "tyre_reference",
        ];

        for (const field of stringFields) {
          const value = item[field];
          if (
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(term)
          ) {
            return true;
          }
        }

        // Check numeric fields
        const numericFields = [
          "tyre_bill_amount",
          "tyre_count",
          "id",
        ];

        for (const field of numericFields) {
          const value = item[field];
          if (
            value !== null &&
            value !== undefined &&
            String(value).includes(term)
          ) {
            return true;
          }
        }

        // Check date
        if (item.tyre_date) {
          const formattedDate = moment(item.tyre_date)
            .format("DD-MMM-YYYY")
            .toLowerCase();

          if (formattedDate.includes(term)) {
            return true;
          }
        }

        return false;
      });

      setFilteredData(filtered);
    }
  }, [searchTerm, purchaseTyreData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tyre_date",
        header: "Date",
        size: 110,
        Cell: ({ row }) => {
          const tyre_date = row.original.tyre_date;
          return tyre_date
            ? moment(tyre_date).format("DD-MMM-YYYY")
            : "";
        },
      },
      {
        accessorKey: "combined",
        header: "Company/Branch",
        size: 180,
        accessorFn: (row) =>
          `${row.tyre_company} - ${row.tyre_branch}`,
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800">
              {row.original.tyre_company} / {row.original.tyre_branch}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "tyre_supplier",
        header: "Supplier",
        size: 130,
      },
      {
        accessorKey: "tyre_bill_ref",
        header: "Bill Ref",
        size: 100,
      },
      {
        accessorKey: "tyre_bill_amount",
        header: "Amount",
        size: 100,
        Cell: ({ row }) => {
          const amount = row.original.tyre_bill_amount;
          return <span className="font-semibold text-slate-900">&#8377; {amount}</span>;
        },
      },
      {
        accessorKey: "tyre_count",
        header: "No. of Tyre",
        size: 90,
      },
      {
        accessorKey: "tyre_status",
        header: "Status",
        size: 90,
        Cell: ({ row }) => {
          const status = row.original.tyre_status;
          return (
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                status === "Active"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {status || "Active"}
            </span>
          );
        },
      },
      {
        accessorKey: "tyre_sub_no_list",
        header: "Tyre Sub No",
        enableHiding: true,
        enableColumnVisibility: false,
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
      {
        id: "id",
        header: "Action",
        size: 80,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex items-center gap-1.5">
              <MasterPurchaseEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(
                    `/tyre/purchase-edit/${encodeURIComponent(
                      encryptedId
                    )}`
                  );
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#F56616] hover:bg-orange-50 transition-colors"
              />

              <MasterPurchaseView
                onClick={() =>
                  navigate(`/tyre/purchase-view/${id}`)
                }
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
    data: filteredData || purchaseTyreData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false,
    mantineTableContainerProps: {
      sx: {
        maxHeight: "calc(100vh - 190px)",
      },
    },
    initialState: {
      columnVisibility: {
        tyre_sub_no_list: false,
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
                <Disc className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2 truncate">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  Purchase Tyre List
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden md:inline truncate">
                  • Procurement, Inward Stock & Invoices
                </span>
              </div>
            </div>

            {/* Right: Search Box immediately BEFORE Add Button */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search purchases..."
                  className="w-40 sm:w-60 pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <MasterPurchaseCreate
                onClick={() => navigate("/tyre/createPurchase")}
                className={CreateButton}
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full">
          {loading && !purchaseTyreData ? (
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

export default PurchaseTyreList;
