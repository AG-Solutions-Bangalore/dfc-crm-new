import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import Select from "react-select";
import { Disc } from "lucide-react";

const TMake = [
  { value: "Nylon", label: "Nylon" },
  { value: "Radial", label: "Radial" },
];

const TYRE_SUB_STATUS = [
  { value: "New", label: "New" },
  { value: "1st Retread", label: "1st Retread" },
  { value: "2nd Retread", label: "2nd Retread" },
  { value: "Casing", label: "Casing" },
  { value: "Dead", label: "Dead" },
];

const AddPurchaseTyre = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const navigate = useNavigate();
  const [tyre, setTyre] = useState({
    tyre_date: todayback,
    tyre_year: "2023-24",
    tyre_supplier: "",
    tyre_company: "",
    tyre_branch: "",
    tyre_bill_ref: "",
    tyre_bill_amount: "",
    tyre_remarks: "",
    tyre_count: "",
    tyre_sub_data: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fabric_inward_count, setCount] = useState(1);
  const useTemplate = {
    tyre_sub_no: "",
    tyre_sub_type: "",
    tyre_sub_make: "",
    tyre_sub_status: "",
  };

  const [users, setUsers] = useState([useTemplate]);
  const [branch, setBranch] = useState([]);
  const [tyreMake, setTyreMake] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-company-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompany(response.data?.company || []);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-branch-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBranch(response.data?.branch || []);
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchBranchData();
  }, []);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-vendor-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVendor(response.data?.vendor || []);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, []);

  useEffect(() => {
    const fetchTyreMakeData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-tyre-make-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTyreMake(response.data?.tyreMake || []);
      } catch (error) {
        console.error("Error fetching tyre make data:", error);
      }
    };

    fetchTyreMakeData();
  }, []);

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i
        ? Object.assign(user, { [e.target.name]: e.target.value })
        : user
    );
    setUsers(updatedUsers);
  };

  const addItem = (e) => {
    e.preventDefault();
    setUsers([...users, { ...useTemplate }]);
    setCount(fabric_inward_count + 1);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.name === "tyre_supplier") {
      setTyre({
        ...tyre,
        tyre_supplier: e.value,
      });
    } else if (e.target.name === "tyre_bill_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setTyre({
          ...tyre,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setTyre({
        ...tyre,
        [e.target.name]: e.target.value,
      });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "42px",
      minHeight: "42px",
      fontSize: "13px",
      borderRadius: "0.5rem",
      borderColor: state?.isFocused ? "#F56616" : "#E2E8F0",
      backgroundColor: "#F8FAFC",
      boxShadow: state?.isFocused ? "0 0 0 2px rgba(245, 102, 22, 0.15)" : "none",
      "&:hover": {
        borderColor: "#CBD5E1",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      zIndex: 50,
      borderRadius: "0.5rem",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required fields");
      setIsButtonDisabled(false);
      return;
    }
    const data = {
      tyre_date: tyre.tyre_date,
      tyre_year: "2023-24",
      tyre_supplier: tyre.tyre_supplier,
      tyre_company: tyre.tyre_company,
      tyre_branch: tyre.tyre_branch,
      tyre_bill_ref: tyre.tyre_bill_ref,
      tyre_bill_amount: tyre.tyre_bill_amount,
      tyre_remarks: tyre.tyre_remarks,
      tyre_count: fabric_inward_count,
      tyre_sub_data: users,
    };

    setIsButtonDisabled(true);
    try {
      const res = await axios({
        url: BASE_URL + "/api/web-create-tyre",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.code == 200) {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }

      navigate("/tyre/purchase-list");

      setTyre({
        tyre_date: todayback,
        tyre_year: "2023-24",
        tyre_supplier: "",
        tyre_company: "",
        tyre_branch: "",
        tyre_bill_ref: "",
        tyre_bill_amount: "",
        tyre_remarks: "",
        tyre_count: "",
        tyre_sub_data: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-[#F56616] ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full h-[42px] rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100";
  const inputClassSelect =
    "w-full h-[42px] rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 cursor-pointer";

  return (
    <Layout>
      <div className="w-full space-y-4">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
              <Disc size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Add Purchase Tyre
              </h2>
              <p className="text-xs text-slate-300">
                Register New Tyre Inward Procurement
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/tyre/purchase-list")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
            title="Back to Purchase List"
          >
            <IconArrowBack size={21} />
          </button>
        </div>

        {/* FORM CONTAINER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            {/* Section 1: Inward & Invoice Details */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F56616]"></span>
                Invoice & Supplier Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <FormLabel required>Date</FormLabel>
                  <input
                    type="date"
                    required
                    name="tyre_date"
                    value={tyre.tyre_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>

                {/* Company */}
                <div>
                  <FormLabel required>Company</FormLabel>
                  <select
                    name="tyre_company"
                    value={tyre.tyre_company}
                    onChange={(e) => onInputChange(e)}
                    required
                    className={inputClassSelect}
                  >
                    <option value="">Select Company</option>
                    {company.map((option) => (
                      <option key={option.company_name} value={option.company_name}>
                        {option.company_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch */}
                <div>
                  <FormLabel required>Branch</FormLabel>
                  <select
                    name="tyre_branch"
                    value={tyre.tyre_branch}
                    onChange={(e) => onInputChange(e)}
                    required
                    className={inputClassSelect}
                  >
                    <option value="">Select Branch</option>
                    {branch.map((option) => (
                      <option key={option.branch_name} value={option.branch_name}>
                        {option.branch_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Supplier */}
                <div>
                  <FormLabel>Supplier</FormLabel>
                  <Select
                    name="payment_details_debit"
                    options={vendor.map((option) => ({
                      value: option.vendor_name,
                      label: option.vendor_name,
                      name: "tyre_supplier",
                    }))}
                    onChange={(e) => onInputChange(e)}
                    value={
                      tyre.tyre_supplier
                        ? {
                            value: tyre.tyre_supplier,
                            label: tyre.tyre_supplier,
                          }
                        : null
                    }
                    placeholder="Select Supplier"
                    styles={customStyles}
                    isSearchable={true}
                  />
                </div>

                {/* Bill Ref */}
                <div>
                  <FormLabel>Bill Reference</FormLabel>
                  <input
                    type="text"
                    name="tyre_bill_ref"
                    value={tyre.tyre_bill_ref}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                    placeholder="Enter bill reference number"
                  />
                </div>

                {/* Bill Amount */}
                <div>
                  <FormLabel>Bill Amount (₹)</FormLabel>
                  <input
                    type="tel"
                    name="tyre_bill_amount"
                    value={tyre.tyre_bill_amount}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                    placeholder="Enter total bill amount"
                  />
                </div>

                {/* Remarks */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <FormLabel>Remarks</FormLabel>
                  <textarea
                    name="tyre_remarks"
                    value={tyre.tyre_remarks}
                    onChange={(e) => onInputChange(e)}
                    className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100 resize-none"
                    rows={2}
                    placeholder="Additional notes or specifications..."
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Tyre Items */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#142747]"></span>
                  Tyre Serial Items ({users.length})
                </h3>

                <button
                  type="button"
                  onClick={(e) => addItem(e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#F56616] bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors shadow-2xs"
                >
                  <IconPlus className="w-4 h-4" /> Add Tyre
                </button>
              </div>

              <div className="space-y-3">
                {users.map((user, index) => (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-3 bg-white rounded-xl border border-slate-200 items-end"
                    key={index}
                  >
                    <div>
                      <FormLabel required>Tyre No</FormLabel>
                      <input
                        type="text"
                        name="tyre_sub_no"
                        value={user.tyre_sub_no}
                        onChange={(e) => onChange(e, index)}
                        className={inputClass}
                        required
                        placeholder="Tyre Serial No"
                      />
                    </div>

                    {/* Tyre Type */}
                    <div>
                      <FormLabel required>Tyre Type</FormLabel>
                      <select
                        name="tyre_sub_type"
                        value={user.tyre_sub_type}
                        onChange={(e) => onChange(e, index)}
                        required
                        className={inputClassSelect}
                      >
                        <option value="">Select Tyre Type</option>
                        {TMake.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tyre Make */}
                    <div>
                      <FormLabel required>Tyre Make</FormLabel>
                      <select
                        name="tyre_sub_make"
                        value={user.tyre_sub_make}
                        onChange={(e) => onChange(e, index)}
                        required
                        className={inputClassSelect}
                      >
                        <option value="">Select Tyre Make</option>
                        {tyreMake.map((option) => (
                          <option key={option.tyre_make} value={option.tyre_make}>
                            {option.tyre_make}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tyre Status */}
                    <div>
                      <FormLabel required>Tyre Status</FormLabel>
                      <select
                        name="tyre_sub_status"
                        value={user.tyre_sub_status}
                        onChange={(e) => onChange(e, index)}
                        required
                        className={inputClassSelect}
                      >
                        <option value="">Select Tyre Status</option>
                        {TYRE_SUB_STATUS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action */}
                    <div className="flex items-center pb-1">
                      {users.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeUser(index)}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                          title="Remove item"
                        >
                          <IconTrash className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/tyre/purchase-list")}
                className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="h-10 rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E85B0B] disabled:opacity-50"
              >
                {isButtonDisabled ? "Submitting..." : "Save Purchase Tyre"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddPurchaseTyre;
