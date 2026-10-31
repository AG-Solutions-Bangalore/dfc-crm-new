import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Edit, ChevronDown, ChevronUp, ShieldCheck, Search } from "lucide-react";

const UserTypeList = () => {
  const [userTypeData, setUserTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  const fetchUserTypeData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-usertype`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserTypeData(response.data?.userType || []);
    } catch (error) {
      console.error("Error fetching userType data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTypeData();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatRoleList = (roles) => {
    if (!roles) return "N/A";
    return roles.split(",").map((role) => (
      <span
        key={role}
        className="inline-block bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-2 py-0.5 m-0.5 text-[11px] font-medium"
      >
        {role.trim()}
      </span>
    ));
  };

  const filteredData = userTypeData.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.user_type?.toLowerCase().includes(query) ||
      item.user_role?.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0A1D3D]/5 text-[#0A1D3D] rounded-xl border border-[#0A1D3D]/10">
                <ShieldCheck className="h-5 w-5 text-[#F56616]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A1D3D]">
                  User Type Roles
                </h1>
                <p className="text-xs text-gray-500">
                  Manage user type definitions and default access privileges
                </p>
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Table with Sticky Header */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 overflow-hidden">
          <div className="crm-table-container max-h-[calc(100vh-210px)] overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="sticky top-0 bg-[#0A1D3D] text-white border-b-2 border-[#F56616] z-10">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-white">
                    User Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-white">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-white">
                    Default Buttons
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-white">
                    Default Pages
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredData.length > 0 ? (
                  filteredData.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#0A1D3D]">
                          {user.user_type}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800">
                            {user.user_role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {user.default_button_role ? (
                            <div className="flex items-center space-x-2">
                              <span className="truncate max-w-xs text-gray-700">
                                {expandedRows[`button-${user.id}`]
                                  ? user.default_button_role
                                  : `${user.default_button_role.slice(0, 50)}...`}
                              </span>
                              <button
                                onClick={() => toggleRow(`button-${user.id}`)}
                                className="p-1 rounded text-gray-500 hover:text-[#0A1D3D] hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                {expandedRows[`button-${user.id}`] ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {user.default_page_role ? (
                            <div className="flex items-center space-x-2">
                              <span className="truncate max-w-xs text-gray-700">
                                {expandedRows[`page-${user.id}`]
                                  ? user.default_page_role
                                  : `${user.default_page_role.slice(0, 50)}...`}
                              </span>
                              <button
                                onClick={() => toggleRow(`page-${user.id}`)}
                                className="p-1 rounded text-gray-500 hover:text-[#0A1D3D] hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                {expandedRows[`page-${user.id}`] ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() =>
                              navigate(`/edit-user-type/${user.id}`)
                            }
                            className="p-1.5 rounded-lg text-blue-600 hover:text-white hover:bg-[#142747] transition-colors inline-flex items-center justify-center cursor-pointer"
                            title="Edit User Type"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                      {expandedRows[`button-${user.id}`] &&
                        user.default_button_role && (
                          <tr className="bg-gray-50/50">
                            <td colSpan="5" className="p-4 border-t border-gray-100">
                              <p className="font-bold text-xs text-[#0A1D3D] mb-2">
                                Expanded Default Button Roles:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {formatRoleList(user.default_button_role)}
                              </div>
                            </td>
                          </tr>
                        )}
                      {expandedRows[`page-${user.id}`] &&
                        user.default_page_role && (
                          <tr className="bg-gray-50/50">
                            <td colSpan="5" className="p-4 border-t border-gray-100">
                              <p className="font-bold text-xs text-[#0A1D3D] mb-2">
                                Expanded Default Page Roles:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {formatRoleList(user.default_page_role)}
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-xs text-gray-500"
                    >
                      {loading
                        ? "Loading user types..."
                        : "No user types found."}
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

export default UserTypeList;
