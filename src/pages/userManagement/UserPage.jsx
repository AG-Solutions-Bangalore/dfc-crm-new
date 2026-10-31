import React, { useContext, useEffect, useCallback, useState } from "react";
import { ExternalLink, Search, Filter, Users, Shield } from "lucide-react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ContextPanel } from "../../context/ContextPanel";
import Layout from "../../layout/Layout";

const UserPage = () => {
  const { getStaticUsers } = useContext(ContextPanel);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    userType: "all",
  });

  const loadUsers = useCallback(async () => {
    try {
      const loadedUsers = getStaticUsers();
      setUsers(loadedUsers);
      setFilteredUsers(loadedUsers);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }, [getStaticUsers]);

  const applyFilters = useCallback(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.userType !== "all") {
      result = result.filter((user) => user.user_type_id === filters.userType);
    }

    if (filters.status && filters.status !== "all") {
      result = result.filter((user) => user.status === filters.status);
    }

    setFilteredUsers(result);
  }, [users, searchTerm, filters]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, searchTerm, filters]);

  const handleOpenDashboard = (userId) => {
    window.open(`/management-dashboard/${userId}`, "_blank");
  };

  const getRoleBadge = (userTypeId) => {
    switch (userTypeId) {
      case 2:
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Admin
          </span>
        );
      case 3:
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Office
          </span>
        );
      case 4:
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Branch Manager
          </span>
        );
      case 5:
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Superadmin
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-50 text-gray-700 border border-gray-200">
            User
          </span>
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0A1D3D]/5 text-[#0A1D3D] rounded-xl border border-[#0A1D3D]/10">
                <Users className="h-5 w-5 text-[#F56616]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A1D3D]">
                  User Management
                </h1>
                <p className="text-xs text-gray-500">
                  Manage team user accounts, role definitions and access permissions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747]"
                />
              </div>

              <Menu>
                <MenuHandler>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors cursor-pointer">
                    <Filter className="h-3.5 w-3.5 text-[#F56616]" />
                    <span>Filter Role</span>
                  </button>
                </MenuHandler>
                <MenuList className="text-xs py-1.5 rounded-xl border border-gray-200 shadow-lg">
                  <MenuItem
                    className="py-1.5 text-xs font-medium"
                    onClick={() => setFilters({ ...filters, userType: "all" })}
                  >
                    All Roles
                  </MenuItem>
                  <MenuItem
                    className="py-1.5 text-xs font-medium"
                    onClick={() => setFilters({ ...filters, userType: 2 })}
                  >
                    Admin
                  </MenuItem>
                  <MenuItem
                    className="py-1.5 text-xs font-medium"
                    onClick={() => setFilters({ ...filters, userType: 3 })}
                  >
                    Office
                  </MenuItem>
                  <MenuItem
                    className="py-1.5 text-xs font-medium"
                    onClick={() => setFilters({ ...filters, userType: 4 })}
                  >
                    Branch Manager
                  </MenuItem>
                  <MenuItem
                    className="py-1.5 text-xs font-medium"
                    onClick={() => setFilters({ ...filters, userType: 5 })}
                  >
                    Superadmin
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>

        {/* Scrollable Table with Sticky Header */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 overflow-hidden">
          <div className="crm-table-container max-h-[calc(100vh-230px)] overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#0A1D3D] text-white border-b-2 border-[#F56616] z-10">
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wider text-white">
                    User Info
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wider text-white">
                    Role
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wider text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0A1D3D]/10 text-[#0A1D3D] font-bold text-xs flex items-center justify-center">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-xs block">
                              {user.name}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              User ID: #{user.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        {getRoleBadge(user.user_type_id)}
                      </td>
                      <td className="py-3 px-5">
                        <button
                          onClick={() => handleOpenDashboard(user.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0A1D3D] hover:text-[#F56616] bg-gray-50 hover:bg-orange-50/50 border border-gray-200 hover:border-orange-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Shield className="h-3.5 w-3.5" />
                          <span>Manage Permissions</span>
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-8 text-center text-xs text-gray-500"
                    >
                      No users match the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
