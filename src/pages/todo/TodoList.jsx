import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import moment from "moment";
import {
  TodoCreate,
  TodoEdit,
} from "../../components/buttonIndex/ButtonComponents";
import { CreateButton } from "../../components/common/ButtonColors";
import { encryptId } from "../../components/common/EncryptionDecryption";
import { ListTodo, Search } from "lucide-react";

const TodoList = () => {
  const [todoData, setTodoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchTodoData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodoData(response.data?.todo);
    } catch (error) {
      console.error("Error fetching Todo data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "todo_date",
        header: "Date",
        size: 130,
        Cell: ({ row }) => {
          const date = row.original.todo_date;
          return (
            <span className="text-[#0A1D3D] font-bold text-xs">
              {date ? moment(date).format("DD-MMM-YYYY") : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "todo_branch",
        header: "Branch",
        size: 150,
        Cell: ({ row }) => (
          <span className="text-gray-800 font-semibold text-xs">
            {row.original.todo_branch || "—"}
          </span>
        ),
      },
      {
        accessorKey: "todo_description",
        header: "Description",
        size: 260,
        Cell: ({ row }) => (
          <span className="text-gray-700 text-xs">
            {row.original.todo_description}
          </span>
        ),
      },
      {
        accessorKey: "todo_status",
        header: "Status",
        size: 100,
        Cell: ({ row }) => {
          const status = row.original.todo_status;
          let badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
          if (status === "Completed" || status === "Done") {
            badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
          }
          return (
            <span
              className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${badgeClass}`}
            >
              {status || "Pending"}
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
              <TodoEdit
                onClick={() => {
                  const encryptedId = encryptId(id);
                  navigate(`/edit-todo/${encodeURIComponent(encryptedId)}`);
                }}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                title="Edit Todo"
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
    data: todoData || [],
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
                <ListTodo className="h-5 w-5 text-[#F56616]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A1D3D]">
                  Todo & Task List
                </h1>
                <p className="text-xs text-gray-500">
                  Track branch operational tasks, reminders, and action items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747]"
                />
              </div>

              <TodoCreate
                className={CreateButton}
                onClick={() => navigate("/createTodo")}
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

export default TodoList;
