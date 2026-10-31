import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { Save, ArrowLeft, ShieldCheck } from "lucide-react";
import BASE_URL from "../../base/BaseUrl";
import { CreateButton, BackButton } from "../../components/common/ButtonColors";

const EditUserType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  const buttonControl = JSON.parse(
    localStorage.getItem("buttonControl") || "[]"
  );
  const pageControl = JSON.parse(localStorage.getItem("pageControl") || "[]");

  const buttonOptions = buttonControl.map((btn) => ({
    value: btn.button,
    label: btn.button,
    pages: btn.pages,
  }));

  const pageOptions = pageControl.map((page) => ({
    value: page.url,
    label: page.page,
    url: page.url,
  }));

  const groupedButtonOptions = buttonControl.reduce((acc, curr) => {
    if (!acc[curr.pages]) {
      acc[curr.pages] = [];
    }
    acc[curr.pages].push({
      value: curr.button,
      label: curr.button,
    });
    return acc;
  }, {});

  const groupedOptions = Object.keys(groupedButtonOptions).map((key) => ({
    label: key,
    options: groupedButtonOptions[key],
  }));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-usertype-by-id/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data.userType);
        if (response.data.userType.default_button_role) {
          const selectedButtonValues =
            response.data.userType.default_button_role.split(",");
          setSelectedButtons(
            buttonOptions.filter((opt) =>
              selectedButtonValues.includes(opt.value)
            )
          );
        }

        if (response.data.userType.default_page_role) {
          const selectedPageValues =
            response.data.userType.default_page_role.split(",");
          setSelectedPages(
            pageOptions.filter((opt) => selectedPageValues.includes(opt.value))
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const payload = {
        default_button_role: selectedButtons.map((btn) => btn.value).join(","),
        default_page_role: selectedPages.map((page) => page.value).join(","),
      };

      await axios.put(`${BASE_URL}/api/panel-update-usertype/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/user-type");
    } catch (error) {
      console.error("Error updating user type:", error);
    } finally {
      setSaving(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "42px",
      fontSize: "0.8125rem",
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#142747" : "#E2E8F0",
      boxShadow: state.isFocused ? "0 0 0 1px #142747" : "none",
      "&:hover": {
        borderColor: "#CBD5E1",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#EEF2FF",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1E3A8A",
      fontSize: "0.75rem",
      fontWeight: "500",
    }),
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F56616]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Edit User Type: {userData?.user_type}
              </h2>
              <p className="text-xs text-gray-300">
                Configure default button and page access rules for this role
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/user-type")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Role Display */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                User Role
              </label>
              <input
                type="text"
                value={userData?.user_role || ""}
                disabled
                className="w-full px-3 py-2 text-xs border border-gray-200 bg-gray-50 text-gray-600 rounded-lg cursor-not-allowed"
              />
            </div>

            {/* Button Permissions */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Default Button Permissions
              </label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                options={groupedOptions}
                value={selectedButtons}
                onChange={setSelectedButtons}
                styles={customSelectStyles}
                placeholder="Select default button permissions..."
              />
            </div>

            {/* Page Permissions */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Default Page Permissions
              </label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                options={pageOptions}
                value={selectedPages}
                onChange={setSelectedPages}
                styles={customSelectStyles}
                placeholder="Select default page permissions..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={saving}
                className={CreateButton}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>

              <button
                type="button"
                className={BackButton}
                onClick={() => navigate("/user-type")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditUserType;
