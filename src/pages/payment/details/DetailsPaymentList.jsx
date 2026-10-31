import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../layout/Layout";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import moment from "moment";
import {
  PaymentDetailsCreate,
  PaymentDetailsEdit,
} from "../../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../../components/common/ButtonColors";
import { encryptId } from "../../../components/common/EncryptionDecryption";
import { Receipt, Search } from "lucide-react";

const DetailsPaymentList = () => {
  const [deatailPaymentData, setDeatailPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchDetailsAdvanceData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-payment-details-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeatailPaymentData(response.data?.payment);
    } catch (error) {
      console.error("Error fetching Details Payment data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsAdvanceData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "payment_details_date",
        header: "Payment Date",
        size: 130,
        Cell: ({ row }) => {
          const date = row.original.payment_details_date;
          return (
            <span className="text-[#0A1D3D] font-bold text-xs">
              {date ? moment(date).format("DD-MMM-YYYY") : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "payment_details_company",
        header: "Company",
        size: 140,
        Cell: ({ row }) => (
          <span className="text-gray-800 font-semibold text-xs">
            {row.original.payment_details_company || "—"}
          </span>
        ),
      },
      {
        accessorKey: "payment_details_voucher_type",
        header: "Voucher Type",
        size: 130,
        Cell: ({ row }) => (
          <span className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-[#0A1D3D] border border-blue-200">
            {row.original.payment_details_voucher_type || "—"}
          </span>
        ),
      },
      {
        accessorKey: "payment_details_debit",
        header: "Debit (To)",
        size: 130,
        Cell: ({ row }) => (
          <span className="text-gray-700 text-xs font-medium">
            {row.original.payment_details_debit || "—"}
          </span>
        ),
      },
      {
        accessorKey: "payment_details_credit",
        header: "Credit (From)",
        size: 130,
        Cell: ({ row }) => (
          <span className="text-gray-700 text-xs font-medium">
            {row.original.payment_details_credit || "—"}
          </span>
        ),
      },
      {
        accessorKey: "payment_details_amount",
        header: "Amount",
        size: 110,
        Cell: ({ row }) => {
          const amount = row.original.payment_details_amount;
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
        size: 90,
        Cell: ({ row }) => (
          <span className="text-gray-600 text-xs">
            {row.original.created_by || "—"}
          </span>
        ),
      },
      {
        accessorKey: "updated_by",
        header: "Updated By",
        size: 90,
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
              <PaymentDetailsEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(
                    `/payment/edit-details/${encodeURIComponent(encryptedId)}`
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
    data: deatailPaymentData || [],
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
                <Receipt className="h-5 w-5 text-[#F56616]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A1D3D]">
                  Payment Details List
                </h1>
                <p className="text-xs text-gray-500">
                  Detailed vouchers, debit/credit ledger transactions and logs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payment details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747]"
                />
              </div>

              <PaymentDetailsCreate
                onClick={() => navigate("/payment/createDetailsPay")}
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

export default DetailsPaymentList;
