
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
import { TextInput } from "@mantine/core";

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
        size: 150,
        accessorFn: (row) =>
          `${row.tyre_company} - ${row.tyre_branch}`,
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-semibold text-black">
              {row.original.tyre_company}/
              {row.original.tyre_branch}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "tyre_supplier",
        header: "Supplier",
        size: 50,
      },
      {
        accessorKey: "tyre_bill_ref",
        header: "Bill Ref",
        size: 50,
      },
      {
        accessorKey: "tyre_bill_amount",
        header: "Amount",
        size: 50,
        Cell: ({ row }) => {
          const amount = row.original.tyre_bill_amount;

          return <span>&#8377; {amount}</span>;
        },
      },
      {
        accessorKey: "tyre_count",
        header: "No. of Tyre",
        size: 50,
      },
      {
        accessorKey: "tyre_status",
        header: "Status",
        size: 50,
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
        size: 50,
      },
      {
        accessorKey: "updated_by",
        header: "Update By",
        size: 50,
      },
      {
        id: "id",
        header: "Action",
        size: 20,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex gap-2">
              <MasterPurchaseEdit
                onClick={() => {
                  const encryptedId = encryptId(id);

                  navigate(
                    `/tyre/purchase-edit/${encodeURIComponent(
                      encryptedId
                    )}`
                  );
                }}
                className="flex items-center space-x-2"
              />

              <MasterPurchaseView
                onClick={() =>
                  navigate(`/tyre/purchase-view/${id}`)
                }
                className="flex items-center space-x-2"
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
    mantineTableContainerProps: {
      sx: {
        maxHeight: "400px",
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
      <div className="max-w-screen">

        {/* Header Section */}
        <div className="mb-4 flex w-full flex-nowrap items-center justify-between gap-4 rounded-xl bg-white px-6 py-5 shadow-md">

          {/* Page Title */}
          <h1 className="shrink-0 border-b-2 border-dashed border-[#F56616] pb-1 text-xl font-medium text-[#0A1F44]">
            Purchase Tyre List
          </h1>

          {/* Search and Add Button */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-4">

            <TextInput
              placeholder="Search in all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="md"
              className="w-full max-w-[330px]"
              styles={{
                input: {
                  height: "48px",
                  borderRadius: "14px",
                  borderColor: "#CBD5E1",
                  fontSize: "14px",
                  color: "#142747",
                  backgroundColor: "#F8FAFC",
                  "&:focus": {
                    borderColor: "#F56616",
                  },
                },
              }}
            />

            <div className="shrink-0">
              <MasterPurchaseCreate
                onClick={() =>
                  navigate("/tyre/createPurchase")
                }
                className={`${CreateButton} flex h-12 items-center justify-center whitespace-nowrap rounded-xl px-6 text-sm font-semibold`}
              />
            </div>

          </div>

          {/* Clear Search */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="shrink-0 text-xs font-semibold text-[#F56616] hover:text-[#E85B0B]"
            >
              Clear
            </button>
          )}

        </div>

        {/* Table */}
        <div className="shadow-md">
          <MantineReactTable table={table} />
        </div>

      </div>
    </Layout>
  );
};

export default PurchaseTyreList;
