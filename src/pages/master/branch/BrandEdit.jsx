
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Layout from "../../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconInfoCircle,
  IconBuildingWarehouse,
  IconCurrencyRupee,
  IconDeviceFloppy,
  IconArrowBack,
} from "@tabler/icons-react";
import { decryptId } from "../../../components/common/EncryptionDecryption";

const status = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const salaryType = [
  { value: "FIXED SALARY", label: "FIXED SALARY" },
  { value: "TRIP WISE", label: "TRIP WISE" },
  { value: "KM", label: "KM" },
  { value: "FIXED+KM", label: "FIXED+KM" },
];

const BrandEdit = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const location = useLocation();

  const [branch, setBranch] = useState({
    branch_name: "",
    branch_salary_type: "",
    branch_status: "",
    branch_bata_for_km_6W: "",
    branch_bata_for_km_10W: "",
    branch_salary_6W: "",
    branch_salary_10W: "",
    branch_incentive_6W: "",
    branch_incentive_10W: "",
    branch_bata_for_trip_6W: "",
    branch_bata_for_trip_10W: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fetchBrandEdit = async () => {
    try {
      setIsButtonDisabled(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-branch-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBranch(response.data?.branch);
    } catch (error) {
      console.error("Error fetching Branch data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchBrandEdit();
  }, []);

  const validateOnlyNumber = (inputtxt) => {
    const phoneno = /^\d*\.?\d*$/;
    return phoneno.test(inputtxt) || inputtxt.length === 0;
  };

  const validateOnlyDigits = (inputtxt) => {
    const phoneno = /^\d+$/;
    return phoneno.test(inputtxt) || inputtxt.length === 0;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    const numberFields = [
      "branch_bata_for_km_6W",
      "branch_bata_for_km_10W",
      "branch_incentive_6W",
      "branch_incentive_10W",
      "branch_bata_for_trip_6W",
      "branch_bata_for_trip_10W",
    ];

    const digitFields = [
      "branch_salary_6W",
      "branch_salary_10W",
    ];

    if (numberFields.includes(name)) {
      if (validateOnlyNumber(value)) {
        setBranch((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (digitFields.includes(name)) {
      if (validateOnlyDigits(value)) {
        setBranch((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setBranch((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = document.getElementById("addIndiv");

    if (!form.checkValidity()) {
      toast.error("Fill all required");
      setIsButtonDisabled(false);
      return;
    }

    const data = {
      branch_name: branch.branch_name,
      branch_salary_type: branch.branch_salary_type,
      branch_status: branch.branch_status,
      branch_bata_for_km_6W: branch.branch_bata_for_km_6W,
      branch_bata_for_km_10W: branch.branch_bata_for_km_10W,
      branch_salary_6W: branch.branch_salary_6W,
      branch_salary_10W: branch.branch_salary_10W,
      branch_incentive_6W: branch.branch_incentive_6W,
      branch_incentive_10W: branch.branch_incentive_10W,
      branch_bata_for_trip_6W: branch.branch_bata_for_trip_6W,
      branch_bata_for_trip_10W: branch.branch_bata_for_trip_10W,
    };

    setIsButtonDisabled(true);

    axios({
      url: BASE_URL + `/api/web-update-branch/${decryptedId}`,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.msg);
        } else if (res.data.code === 400) {
          toast.error(res.data.msg);
        }

        navigate(`/master/branch-list${location?.search}`);
      })
      .catch(() => {
        toast.error("Unable to update branch. Please try again.");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  // Reusable Form Label
  const FormLabel = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-[#334155]">
      {children}
      {required && <span className="ml-1 text-[#F56616]">*</span>}
    </label>
  );

  // Updated Input Styles
  const inputClass = `
    w-full h-[44px] px-4
    rounded-xl border border-slate-200
    bg-slate-50 text-sm font-medium text-[#0A1D3D]
    placeholder:text-slate-400
    outline-none transition-all duration-200
    hover:border-slate-300
    focus:border-[#F56616]
    focus:bg-white
    focus:ring-4 focus:ring-orange-100
    disabled:cursor-not-allowed disabled:bg-slate-100
  `;

  const inputClassSelect = `${inputClass} cursor-pointer`;

  // Reusable Field Wrapper
  const FormField = ({ label, required, children, className = "" }) => (
    <div className={className}>
      <FormLabel required={required}>{label}</FormLabel>
      {children}
    </div>
  );

  const isFixedSalary =
    branch.branch_salary_type === "FIXED SALARY" ||
    branch.branch_salary_type === "FIXED+KM";

  const isKm =
    branch.branch_salary_type === "KM" ||
    branch.branch_salary_type === "FIXED+KM";

  return (
    <Layout>
      <div className="min-h-full space-y-5">

        {/* PAGE HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-[#F56616]">
              <IconBuildingWarehouse size={27} stroke={1.8} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-montserrat text-xl font-extrabold text-[#0A1D3D]">
                  Edit Branch
                </h2>

                <span className="text-slate-300">•</span>

                <span className="text-sm font-medium text-slate-500">
                  Update branch and salary configuration
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Manage branch information and salary details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(`/master/branch-list${location?.search}`)
            }
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0A1D3D] transition-all hover:border-[#F56616] hover:bg-orange-50 hover:text-[#F56616]"
            title="Back to Branch List"
          >
            <IconArrowBack size={22} />
          </button>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >

          {/* FORM SECTION HEADER */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A1D3D] text-white">
              <IconInfoCircle size={21} />
            </div>

            <div>
              <h3 className="font-montserrat text-base font-bold text-[#0A1D3D]">
                Branch Information
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Update branch name, salary type and payment configuration.
                Fields marked with <span className="font-bold text-[#F56616]">*</span> are required.
              </p>
            </div>
          </div>

          {/* FORM FIELDS */}
          <div className="p-6">

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-3">

              {/* BRANCH NAME */}
              <FormField label="Branch Name" required>
                <input
                  type="text"
                  name="branch_name"
                  value={branch.branch_name || ""}
                  onChange={onInputChange}
                  className={inputClass}
                  required
                  disabled
                />
              </FormField>

              {/* SALARY TYPE */}
              <FormField label="Salary Type" required>
                <select
                  name="branch_salary_type"
                  value={branch.branch_salary_type || ""}
                  onChange={onInputChange}
                  required
                  className={inputClassSelect}
                >
                  <option value="">Select Salary Type</option>

                  {salaryType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* STATUS */}
              <FormField label="Status" required>
                <select
                  name="branch_status"
                  value={branch.branch_status || ""}
                  onChange={onInputChange}
                  required
                  className={inputClassSelect}
                >
                  <option value="">Select Status</option>

                  {status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* SALARY FIELDS */}
              {isFixedSalary && (
                <>
                  <FormField label="Salary 6W" required>
                    <input
                      type="tel"
                      name="branch_salary_6W"
                      value={branch.branch_salary_6W ?? ""}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                    />
                  </FormField>

                  <FormField label="Salary 10W" required>
                    <input
                      type="tel"
                      name="branch_salary_10W"
                      value={branch.branch_salary_10W ?? ""}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                    />
                  </FormField>
                </>
              )}

              {/* KM BATA FIELDS */}
              {isKm && (
                <>
                  <FormField label="Bata for KM 6W" required>
                    <input
                      type="tel"
                      name="branch_bata_for_km_6W"
                      value={branch.branch_bata_for_km_6W ?? ""}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                    />
                  </FormField>

                  <FormField label="Bata for KM 10W" required>
                    <input
                      type="tel"
                      name="branch_bata_for_km_10W"
                      value={branch.branch_bata_for_km_10W ?? ""}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                    />
                  </FormField>
                </>
              )}

              {/* INCENTIVE 6W */}
              <FormField label="Incentive 6W">
                <input
                  type="tel"
                  name="branch_incentive_6W"
                  value={branch.branch_incentive_6W ?? ""}
                  onChange={onInputChange}
                  className={inputClass}
                />
              </FormField>

              {/* INCENTIVE 10W */}
              <FormField label="Incentive 10W">
                <input
                  type="tel"
                  name="branch_incentive_10W"
                  value={branch.branch_incentive_10W ?? ""}
                  onChange={onInputChange}
                  className={inputClass}
                />
              </FormField>

              {/* BATA 6W */}
              <FormField label="Bata for 6W Day">
                <input
                  type="tel"
                  name="branch_bata_for_trip_6W"
                  value={branch.branch_bata_for_trip_6W ?? ""}
                  onChange={onInputChange}
                  className={inputClass}
                />
              </FormField>

              {/* BATA 10W */}
              <FormField label="Bata for 10W Day">
                <input
                  type="tel"
                  name="branch_bata_for_trip_10W"
                  value={branch.branch_bata_for_trip_10W ?? ""}
                  onChange={onInputChange}
                  className={inputClass}
                />
              </FormField>

            </div>

            {/* FORM ACTIONS */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">

              <button
                type="submit"
                disabled={isButtonDisabled}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F56616] px-7 text-sm font-bold text-white shadow-md shadow-orange-900/10 transition-all hover:-translate-y-0.5 hover:bg-[#DF5A10] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <IconDeviceFloppy size={19} />
                {isButtonDisabled ? "Updating..." : "Update Branch"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/master/branch-list${location?.search}`)
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-[#0A1D3D] transition-all hover:border-[#0A1D3D] hover:bg-slate-50"
              >
                <IconArrowLeft size={18} />
                Back
              </button>

            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BrandEdit;
