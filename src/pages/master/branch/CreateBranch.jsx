
import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";

const salaryType = [
  { value: "FIXED SALARY", label: "FIXED SALARY" },
  { value: "TRIP WISE", label: "TRIP WISE" },
  { value: "KM", label: "KM" },
  { value: "FIXED+KM", label: "FIXED+KM" },
];

const CreateBranch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [branch, setBranch] = useState({
    branch_name: "",
    branch_salary_type: "",
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
  const [loading, setLoading] = useState(false);

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

    const decimalFields = [
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

    if (decimalFields.includes(name) && !validateOnlyNumber(value)) {
      return;
    }

    if (digitFields.includes(name) && !validateOnlyDigits(value)) {
      return;
    }

    setBranch({
      ...branch,
      [name]: value,
    });
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
      branch_bata_for_km_6W: branch.branch_bata_for_km_6W,
      branch_incentive_6W: branch.branch_incentive_6W,
      branch_incentive_10W: branch.branch_incentive_10W,
      branch_bata_for_km_10W: branch.branch_bata_for_km_10W,
      branch_salary_6W: branch.branch_salary_6W,
      branch_salary_10W: branch.branch_salary_10W,
      branch_bata_for_trip_6W: branch.branch_bata_for_trip_6W,
      branch_bata_for_trip_10W: branch.branch_bata_for_trip_10W,
    };

    setIsButtonDisabled(true);

    axios({
      url: BASE_URL + "/api/web-create-branch",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 200) {
        toast.success(res.data.msg);
      } else if (res.data.code == 400) {
        toast.error(res.data.msg);
      }

      navigate(`/master/branch-list${location?.search}`);

      setBranch({
        branch_name: "",
        branch_salary_type: "",
        branch_bata_for_km_6W: "",
        branch_bata_for_km_10W: "",
        branch_salary_6W: "",
        branch_salary_10W: "",
        branch_incentive_6W: "",
        branch_incentive_10W: "",
        branch_bata_for_trip_6W: "",
        branch_bata_for_trip_10W: "",
      });
    });
  };

  // Reusable Form Label
  const FormLabel = ({ children, required }) => (
    <label className="mb-1.5 block text-[13px] font-semibold text-[#0A1D3D]">
      {children}
      {required && <span className="ml-1 text-[#F56616]">*</span>}
    </label>
  );

  // Common Input Styling
  const inputClass = `
    w-full h-[42px]
    rounded-xl
    border border-slate-200
    bg-slate-50
    px-3.5
    text-[13px] font-medium text-slate-800
    outline-none
    transition-all duration-200
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-[#F56616]
    focus:bg-white
    focus:ring-4 focus:ring-orange-100
  `;

  const inputClassSelect = `
    w-full h-[42px]
    rounded-xl
    border border-slate-200
    bg-slate-50
    px-3.5
    text-[13px] font-medium text-slate-800
    outline-none
    transition-all duration-200
    hover:border-slate-300
    focus:border-[#F56616]
    focus:bg-white
    focus:ring-4 focus:ring-orange-100
    cursor-pointer
  `;

  const isFixedSalary =
    branch.branch_salary_type === "FIXED SALARY" ||
    branch.branch_salary_type === "FIXED+KM";

  const isKm =
    branch.branch_salary_type === "KM" ||
    branch.branch_salary_type === "FIXED+KM";

  return (
    <Layout>
      <div className="crm-layout max-w-screen space-y-3">

        {/* =====================================
            PAGE HEADER
        ===================================== */}
        <div
          className="
            flex items-center justify-between
            gap-3
            rounded-2xl
            border border-slate-200
            bg-white
            px-4 py-3
            shadow-[0_4px_18px_rgba(10,29,61,0.05)]
          "
        >
          <div className="flex min-w-0 items-center gap-3">

            {/* ICON */}
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl
                border border-orange-200
                bg-orange-50
                text-[#F56616]
              "
            >
              <IconInfoCircle size={25} stroke={1.9} />
            </div>

            {/* TITLE */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-[#0A1D3D]">
                  Add Branch
                </h1>

                <span className="hidden text-slate-300 sm:inline">•</span>

                <p className="text-xs font-medium text-slate-500">
                  Create and configure branch salary details
                </p>
              </div>
            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() =>
              navigate(`/master/branch-list${location?.search}`)
            }
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-[#0A1D3D]
              transition-all duration-200
              hover:border-orange-200
              hover:bg-orange-50
              hover:text-[#F56616]
            "
            title="Back to Branch List"
          >
            <IconArrowBack size={21} />
          </button>
        </div>

        {/* =====================================
            FORM CARD
        ===================================== */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-[0_4px_18px_rgba(10,29,61,0.05)]
          "
        >

          {/* FORM SECTION HEADER */}
          <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
            <h2 className="text-sm font-bold text-[#0A1D3D]">
              Branch Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Enter branch name and configure the salary structure.
              Fields marked with <span className="text-[#F56616]">*</span> are required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            id="addIndiv"
            className="w-full p-5 sm:p-7"
          >

            {/* =====================================
                BRANCH DETAILS
            ===================================== */}
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-4">

              {/* Branch Name */}
              <div className="lg:col-span-2">
                <FormLabel required>Branch Name</FormLabel>

                <input
                  type="text"
                  name="branch_name"
                  value={branch.branch_name}
                  onChange={onInputChange}
                  placeholder="Enter branch name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Salary Type */}
              <div className="lg:col-span-2">
                <FormLabel required>Salary Type</FormLabel>

                <select
                  name="branch_salary_type"
                  value={branch.branch_salary_type}
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
              </div>

            </div>

            {/* =====================================
                SALARY CONFIGURATION
            ===================================== */}
            {branch.branch_salary_type && (
              <div className="mt-7">

                <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="h-5 w-1 rounded-full bg-[#F56616]" />

                  <h3 className="text-sm font-bold text-[#0A1D3D]">
                    Salary Configuration
                  </h3>

                  <span className="rounded-md bg-orange-50 px-2 py-1 text-[10px] font-bold text-[#F56616]">
                    {branch.branch_salary_type}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-4">

                  {/* Salary 6W */}
                  {isFixedSalary && (
                    <div>
                      <FormLabel required>Salary 6W</FormLabel>

                      <input
                        type="tel"
                        name="branch_salary_6W"
                        value={branch.branch_salary_6W}
                        onChange={onInputChange}
                        placeholder="Enter amount"
                        className={inputClass}
                        required
                      />
                    </div>
                  )}

                  {/* Salary 10W */}
                  {isFixedSalary && (
                    <div>
                      <FormLabel required>Salary 10W</FormLabel>

                      <input
                        type="tel"
                        name="branch_salary_10W"
                        value={branch.branch_salary_10W}
                        onChange={onInputChange}
                        placeholder="Enter amount"
                        className={inputClass}
                        required
                      />
                    </div>
                  )}

                  {/* Bata KM 6W */}
                  {isKm && (
                    <div>
                      <FormLabel>Bata for KM 6W</FormLabel>

                      <input
                        type="tel"
                        name="branch_bata_for_km_6W"
                        value={branch.branch_bata_for_km_6W}
                        onChange={onInputChange}
                        placeholder="Enter amount"
                        className={inputClass}
                      />
                    </div>
                  )}

                  {/* Bata KM 10W */}
                  {isKm && (
                    <div>
                      <FormLabel>Bata for KM 10W</FormLabel>

                      <input
                        type="tel"
                        name="branch_bata_for_km_10W"
                        value={branch.branch_bata_for_km_10W}
                        onChange={onInputChange}
                        placeholder="Enter amount"
                        className={inputClass}
                      />
                    </div>
                  )}

                  {/* Incentive 6W */}
                  <div>
                    <FormLabel>Incentive 6W</FormLabel>

                    <input
                      type="tel"
                      name="branch_incentive_6W"
                      value={branch.branch_incentive_6W}
                      onChange={onInputChange}
                      placeholder="Enter amount"
                      className={inputClass}
                    />
                  </div>

                  {/* Incentive 10W */}
                  <div>
                    <FormLabel>Incentive 10W</FormLabel>

                    <input
                      type="tel"
                      name="branch_incentive_10W"
                      value={branch.branch_incentive_10W}
                      onChange={onInputChange}
                      placeholder="Enter amount"
                      className={inputClass}
                    />
                  </div>

                  {/* Bata for 6W day */}
                  <div>
                    <FormLabel>Bata for 6W Day</FormLabel>

                    <input
                      type="tel"
                      name="branch_bata_for_trip_6W"
                      value={branch.branch_bata_for_trip_6W}
                      onChange={onInputChange}
                      placeholder="Enter amount"
                      className={inputClass}
                    />
                  </div>

                  {/* Bata for 10W day */}
                  <div>
                    <FormLabel>Bata for 10W Day</FormLabel>

                    <input
                      type="tel"
                      name="branch_bata_for_trip_10W"
                      value={branch.branch_bata_for_trip_10W}
                      onChange={onInputChange}
                      placeholder="Enter amount"
                      className={inputClass}
                    />
                  </div>

                </div>
              </div>
            )}

            {/* =====================================
                FORM ACTIONS
            ===================================== */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">

              <button
                type="submit"
                className={CreateButton}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                className={BackButton}
                onClick={() =>
                  navigate(`/master/branch-list${location?.search}`)
                }
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

export default CreateBranch;
