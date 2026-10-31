import React, { useContext, useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContextPanel } from "../../context/ContextPanel";
import BASE_URL from "../../base/BaseUrl";
import Layout from "../../layout/Layout";
import {
  ChevronDown,
  ChevronUp,
  Shield,
  Layers,
  CheckSquare,
  ArrowLeft,
  Sliders,
  Globe,
} from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-2xs flex items-center justify-between">
    <div>
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-xl font-bold text-[#0A1D3D] mt-0.5">{value}</p>
    </div>
    <div className={`p-2.5 rounded-lg ${colorClass}`}>
      <Icon className="h-4 w-4" />
    </div>
  </div>
);

const PageSection = ({
  page,
  permissions,
  buttonPermissions,
  userId,
  onPagePermissionChange,
  onButtonPermissionChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const currentPermission = permissions.find((p) => p.page === page);
  const isPageChecked =
    currentPermission?.userIds.includes(userId.toString()) || false;

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-2xs">
      <div className="w-full flex items-center justify-between p-4 bg-gray-50/80 hover:bg-gray-100/60 transition-colors border-b border-gray-200">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 cursor-pointer flex-1"
        >
          <div className="p-1.5 bg-[#0A1D3D]/5 text-[#0A1D3D] rounded-lg">
            <Globe className="h-4 w-4 text-[#F56616]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0A1D3D]">{page}</h3>
            <p className="text-[11px] text-gray-500">
              {currentPermission?.url || "Route: /"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
            <span>Page Access</span>
            <Checkbox
              color="blue"
              checked={isPageChecked}
              onChange={(e) => onPagePermissionChange(page, e.target.checked)}
              className="h-4 w-4 rounded text-[#142747]"
            />
          </label>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded text-gray-400 hover:text-gray-700"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-white">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
            Action & Button Permissions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {buttonPermissions
              .filter((p) => p.pages === page)
              .map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between p-2.5 bg-gray-50/60 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <span className="text-xs font-medium text-gray-800 truncate mr-2">
                    {permission.button}
                  </span>
                  <Checkbox
                    color="blue"
                    checked={permission.userIds.includes(userId.toString())}
                    onChange={(e) =>
                      onButtonPermissionChange(
                        permission.button,
                        e.target.checked,
                        permission.id
                      )
                    }
                    className="h-4 w-4 rounded text-[#142747]"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ManagementDashboard = () => {
  const { id } = useParams();
  const userId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getStaticUsers, fetchPagePermission, fetchPermissions } =
    useContext(ContextPanel);
  const staticUsers = getStaticUsers();
  const [buttonPermissions, setButtonPermissions] = useState([]);
  const [pagePermissions, setPagePermissions] = useState([]);

  // Fetch button permissions
  const {
    data: buttonControlData,
    isLoading: isLoadingButtons,
    isError: isErrorButtons,
  } = useQuery({
    queryKey: ["usercontrol"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.buttonPermissions;
    },
  });

  // Mutation for updating button permissions
  const updateButtonPermissionMutation = useMutation({
    mutationFn: async ({ permissionId, updatedData }) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-usercontrol/${permissionId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usercontrol"]);
      fetchPermissions();
    },
    onError: (error) => {
      console.error("Error updating button permissions:", error);
      setButtonPermissions(buttonControlData);
    },
  });

  // Mutation for updating page permissions
  const updatePagePermissionMutation = useMutation({
    mutationFn: async ({ permissionId, updatedData }) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-usercontrol-new/${permissionId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usercontrol-pages"]);
      fetchPagePermission();
    },
    onError: (error) => {
      console.error("Error updating page permissions:", error);
      setPagePermissions(pageControlData);
    },
  });

  // Fetch page permissions
  const {
    data: pageControlData,
    isLoading: isLoadingPages,
    isError: isErrorPages,
  } = useQuery({
    queryKey: ["usercontrol-pages"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol-new`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.pagePermissions;
    },
  });

  useEffect(() => {
    if (buttonControlData) {
      setButtonPermissions(buttonControlData);
    }
  }, [buttonControlData]);

  useEffect(() => {
    if (pageControlData) {
      setPagePermissions(pageControlData);
    }
  }, [pageControlData]);

  const user = staticUsers.find((u) => u.id === userId);
  const pages = useMemo(
    () => [...new Set(pagePermissions.map((p) => p.page))],
    [pagePermissions]
  );

  // Calculate stats
  const stats = useMemo(
    () => ({
      totalPages: pages.length,
      totalButtons: buttonPermissions.length,
      activePages: pagePermissions.filter((p) =>
        p.userIds.includes(userId.toString())
      ).length,
      activeButtons: buttonPermissions.filter((p) =>
        p.userIds.includes(userId.toString())
      ).length,
    }),
    [pages, buttonPermissions, pagePermissions, userId]
  );

  const handleButtonPermissionChange = async (
    button,
    isChecked,
    permissionId
  ) => {
    try {
      const currentPermission = buttonPermissions.find(
        (permission) => permission.id === permissionId
      );
      if (!currentPermission) return;

      const newUserIds = isChecked
        ? [...currentPermission.userIds, userId.toString()]
        : currentPermission.userIds.filter((id) => id !== userId.toString());

      const userIdsAsString = newUserIds.join(",");

      const updatedData = {
        pages: currentPermission.pages,
        button: currentPermission.button,
        status: "Active",
        userIds: userIdsAsString,
      };

      const updatedPermissions = buttonPermissions.map((permission) => {
        if (permission.id === permissionId) {
          return { ...permission, userIds: newUserIds };
        }
        return permission;
      });
      setButtonPermissions(updatedPermissions);

      await updateButtonPermissionMutation.mutateAsync({
        permissionId,
        updatedData,
      });
    } catch (error) {
      console.error("Error updating button permissions:", error);
    }
  };

  const handlePagePermissionChange = async (page, isChecked) => {
    try {
      const currentPermission = pagePermissions.find(
        (permission) => permission.page === page
      );
      if (!currentPermission) return;

      const newUserIds = isChecked
        ? [...currentPermission.userIds, userId.toString()]
        : currentPermission.userIds.filter((id) => id !== userId.toString());

      const userIdsAsString = newUserIds.join(",");

      const updatedData = {
        page: currentPermission.page,
        url: currentPermission.url,
        status: "Active",
        userIds: userIdsAsString,
      };

      const updatedPermissions = pagePermissions.map((permission) => {
        if (permission.page === page) {
          return { ...permission, userIds: newUserIds };
        }
        return permission;
      });
      setPagePermissions(updatedPermissions);

      await updatePagePermissionMutation.mutateAsync({
        permissionId: currentPermission.id,
        updatedData,
      });
    } catch (error) {
      console.error("Error updating page permissions:", error);
    }
  };

  if (
    !user ||
    isLoadingButtons ||
    isLoadingPages ||
    isErrorPages ||
    isErrorButtons
  ) {
    return (
      <Layout>
        <div className="container mx-auto p-6 flex items-center justify-center h-64 text-sm text-gray-500">
          {!user
            ? "No User Found"
            : isLoadingButtons || isLoadingPages
            ? "Loading permission dashboard..."
            : "Error loading user management."}
        </div>
      </Layout>
    );
  }

  const getUserTypeInfo = (userTypeId) => {
    const types = {
      2: { label: "Admin", classes: "bg-blue-50 text-blue-700 border-blue-200" },
      3: { label: "Office", classes: "bg-rose-50 text-rose-700 border-rose-200" },
      4: {
        label: "Branch Manager",
        classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      5: {
        label: "Superadmin",
        classes: "bg-purple-50 text-purple-700 border-purple-200",
      },
    };
    return (
      types[userTypeId] || {
        label: "User",
        classes: "bg-gray-50 text-gray-700 border-gray-200",
      }
    );
  };

  const userType = getUserTypeInfo(user.user_type_id);

  return (
    <Layout>
      <div className="space-y-4">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Shield className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  {user.name}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${userType.classes}`}
                >
                  {userType.label}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Configure module, page and button access permissions for this account
              </p>
            </div>
          </div>
          <button
            onClick={() => window.close()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatsCard
            title="Total Pages"
            value={stats.totalPages}
            icon={Globe}
            colorClass="bg-blue-50 text-blue-700"
          />
          <StatsCard
            title="Active Pages"
            value={stats.activePages}
            icon={CheckSquare}
            colorClass="bg-emerald-50 text-emerald-700"
          />
          <StatsCard
            title="Total Buttons"
            value={stats.totalButtons}
            icon={Sliders}
            colorClass="bg-purple-50 text-purple-700"
          />
          <StatsCard
            title="Active Buttons"
            value={stats.activeButtons}
            icon={CheckSquare}
            colorClass="bg-amber-50 text-amber-700"
          />
        </div>

        {/* Permissions Accordions */}
        <div className="space-y-3">
          {pages.map((page) => (
            <PageSection
              key={page}
              page={page}
              permissions={pagePermissions}
              buttonPermissions={buttonPermissions}
              userId={userId}
              onPagePermissionChange={handlePagePermissionChange}
              onButtonPermissionChange={handleButtonPermissionChange}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ManagementDashboard;
