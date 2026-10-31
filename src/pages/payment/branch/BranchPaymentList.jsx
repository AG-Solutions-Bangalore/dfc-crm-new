import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment";
import {
  PaymentBranchCreate,
  PaymentBranchEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { Building2, Search } from "lucide-react";

const BranchPaymentList = () => {
  const [branchPaymentData, setBranchPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchBranchPaymentData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-payment-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBranchPaymentData(response.data?.payment);
    } catch (error) {
      console.error("Error fetching Branch Payment data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchPaymentData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "payment_date",
        header: "Payment Date",
        size: 140,
        Cell: ({ row }) => {
          const date = row.original.payment_date;
          return (
            <span className="text-[#0A1D3D] font-bold text-xs">
              {date ? moment(date).format("DD-MMM-YYYY") : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "payment_branch",
        header: "Branch",
        size: 160,
        Cell: ({ row }) => (
          <span className="text-gray-800 font-semibold text-xs">
            {row.original.payment_branch}
          </span>
        ),
      },
      {
        accessorKey: "payment_amount",
        header: "Total Amount",
        size: 130,
        Cell: ({ row }) => {
          const amount = row.original.payment_amount;
          return (
            <span className="font-bold text-emerald-700 text-xs">
              ₹ {amount}
            </span>
          );
        },
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 100,
        Cell: ({ row }) => (
          <span className="text-gray-600 text-xs">
            {row.original.created_by || "—"}
          </span>
        ),
      },
      {
        accessorKey: "updated_by",
        header: "Updated By",
        size: 100,
        Cell: ({ row }) => (
          <span className="text-gray-600 text-xs">
            {row.original.updated_by || "—"}
          </span>
        ),
      },
      {
        id: "id",
        header: "Action",
        size: 60,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex gap-2 items-center">
              <PaymentBranchEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(
                    `/payment/edit-branchpay/${encodeURIComponent(encryptedId)}`
                  );
                }}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
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
    data: branchPaymentData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: false,
    mantineTableContainerProps: { sx: { maxHeight: "calc(100vh - 210px)" } },
    initialState: { columnVisibility: { address: false } },
    state: { globalFilter: searchQuery },
    onGlobalFilterChange: setSearchQuery,
  });

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0A1D3D]/5 text-[#0A1D3D] rounded-xl border border-[#0A1D3D]/10">
                <Building2 className="h-5 w-5 text-[#F56616]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A1D3D]">
                  Branch Payment List
                </h1>
                <p className="text-xs text-gray-500">
                  Track and manage financial disbursements to branch offices
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search branch payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747]"
                />
              </div>

              <PaymentBranchCreate
                onClick={() => navigate("/payment/createBranchPay")}
                className={CreateButton}
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 overflow-hidden">
          <MantineReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default BranchPaymentList;
