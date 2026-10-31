
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";

const vehicleType = [
  {
    value: "6W Truck",
    label: "6W Truck",
  },
  {
    value: "10W Truck",
    label: "10W Truck",
  },
  {
    value: "Car",
    label: "Car",
  },
];

const CreateDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [driver, setDriver] = useState({
    full_name: "",
    email: "",
    mobile: "",
    user_company: "",
    vehicle_type: "",
    user_address: "",
    dl_no: "",
    dl_expiry: "",
    hazard_lice_no: "",
    hazard_lice_expiry: "",
    user_branch: "",
    user_insurance: "",
    user_insurance_no: "",
    user_bank: "",
    user_bank_branch: "",
    user_account_no: "",
    user_ifsc_code: "",
    user_image: "",
    user_adhar_card: "",
    user_pan_card: "",
    user_passbook: "",
    user_licence: "",
  });

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompany(response.data?.company);
    } catch (error) {
      console.error("Error fetching  driver master data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch);
    } catch (error) {
      console.error("Error fetching  driver master data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchBranch();
  }, []);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setDriver({
          ...driver,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDriver({
        ...driver,
        [e.target.name]: e.target.value,
      });
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

    const data = new FormData();
    data.append("full_name", driver.full_name);
    data.append("email", driver.email);
    data.append("mobile", driver.mobile);
    data.append("user_company", driver.user_company);
    data.append("vehicle_type", driver.vehicle_type);
    data.append("user_address", driver.user_address);
    data.append("dl_no", driver.dl_no);
    data.append("dl_expiry", driver.dl_expiry);
    data.append("hazard_lice_no", driver.hazard_lice_no);
    data.append("hazard_lice_expiry", driver.hazard_lice_expiry);
    data.append("user_branch", driver.user_branch);
    data.append("user_insurance", driver.user_insurance);
    data.append("user_insurance_no", driver.user_insurance_no);
    data.append("user_bank", driver.user_bank);
    data.append("user_bank_branch", driver.user_bank_branch);
    data.append("user_account_no", driver.user_account_no);
    data.append("user_ifsc_code", driver.user_ifsc_code);
    data.append("user_image", selectedFile1);
    data.append("user_adhar_card", selectedFile2);
    data.append("user_pan_card", selectedFile3);
    data.append("user_passbook", selectedFile4);
    data.append("user_licence", selectedFile5);

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-driver",
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
      navigate(`/master/driver-list${location?.search}`);
      setDriver({
        full_name: "",
        email: "",
        mobile: "",
        user_company: "",
        vehicle_type: "",
        user_address: "",
        dl_no: "",
        dl_expiry: "",
        hazard_lice_no: "",
        hazard_lice_expiry: "",
        user_branch: "",
        user_insurance: "",
        user_insurance_no: "",
        user_bank: "",
        user_bank_branch: "",
        user_account_no: "",
        user_ifsc_code: "",
        user_image: "",
        user_adhar_card: "",
        user_pan_card: "",
        user_passbook: "",
        user_licence: "",
      });
    });
  };

  const FormLabel = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-[#142747]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const inputClassSelect =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const fileInputClass =
    "block w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-600 transition hover:border-orange-300 hover:bg-orange-50/40 file:mr-4 file:cursor-pointer file:border-0 file:bg-[#FFF1E9] file:px-4 file:py-3 file:text-sm file:font-semibold file:text-[#F56616]";

  return (
    <Layout>
      <div className="min-h-full space-y-5 bg-[#F8FAFC] p-3 sm:p-5">

        {/* Page Header */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50">
              <IconInfoCircle
                size={25}
                stroke={1.8}
                className="text-[#F56616]"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#0A1F44]">
                Add Driver
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Create a new driver profile and add their details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(`/master/driver-list${location?.search}`)
            }
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#142747] transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#F56616]"
          >
            <IconArrowBack size={18} />
            Back to Driver List
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full space-y-5"
        >
          {/* Driver Information */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-bold text-[#142747]">
                Driver Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the driver's personal and contact details
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">

              {/* Driver Name */}
              <div>
                <FormLabel required>Driver Name</FormLabel>
                <input
                  type="text"
                  name="full_name"
                  value={driver.full_name}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter driver name"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <FormLabel required>Company</FormLabel>
                <select
                  name="user_company"
                  value={driver.user_company}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={inputClassSelect}
                >
                  <option value="">Select Company</option>
                  {company.map((option) => (
                    <option
                      key={option.company_name}
                      value={option.company_name}
                    >
                      {option.company_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch */}
              <div>
                <FormLabel required>Branch</FormLabel>
                <select
                  name="user_branch"
                  value={driver.user_branch}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={inputClassSelect}
                >
                  <option value="">Select Branch</option>
                  {branch.map((option) => (
                    <option
                      key={option.branch_name}
                      value={option.branch_name}
                    >
                      {option.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile */}
              <div>
                <FormLabel required>Mobile</FormLabel>
                <input
                  maxLength={10}
                  required
                  type="tel"
                  name="mobile"
                  value={driver.mobile}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2 lg:col-span-4">
                <FormLabel required>Address</FormLabel>
                <textarea
                  type="text"
                  name="user_address"
                  value={driver.user_address}
                  onChange={(e) => onInputChange(e)}
                  className={`${inputClass} h-auto min-h-[100px] resize-y py-3`}
                  required
                  rows={3}
                  placeholder="Enter complete address"
                />
              </div>

              {/* Email */}
              <div>
                <FormLabel>Email</FormLabel>
                <input
                  type="email"
                  name="email"
                  value={driver.email}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter email address"
                />
              </div>

              {/* Vehicle */}
              <div>
                <FormLabel required>Vehicle</FormLabel>
                <select
                  name="vehicle_type"
                  value={driver.vehicle_type}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={inputClassSelect}
                >
                  <option value="">Select Vehicle</option>
                  {vehicleType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Driving Licence Information */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-bold text-[#142747]">
                Driving Licence Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add driving licence and hazard licence details
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">

              {/* DL No */}
              <div>
                <FormLabel required>DL No</FormLabel>
                <input
                  type="text"
                  name="dl_no"
                  required
                  value={driver.dl_no}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter DL number"
                />
              </div>

              {/* DL Expiry */}
              <div>
                <FormLabel required>DL Expiry</FormLabel>
                <input
                  type="date"
                  required
                  name="dl_expiry"
                  value={driver.dl_expiry}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                />
              </div>

              {/* Hazard Lice No */}
              <div>
                <FormLabel>Hazard Lice No</FormLabel>
                <input
                  type="text"
                  name="hazard_lice_no"
                  value={driver.hazard_lice_no}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter hazard licence number"
                />
              </div>

              {/* Hazard Lice Expiry */}
              <div>
                <FormLabel>Hazard Lice Expiry</FormLabel>
                <input
                  type="date"
                  name="hazard_lice_expiry"
                  value={driver.hazard_lice_expiry}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-bold text-[#142747]">
                Bank Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add driver's bank account details
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">

              {/* Bank */}
              <div>
                <FormLabel>Bank</FormLabel>
                <input
                  type="text"
                  name="user_bank"
                  value={driver.user_bank}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter bank name"
                />
              </div>

              {/* Bank Branch */}
              <div>
                <FormLabel>Bank Branch</FormLabel>
                <input
                  type="text"
                  name="user_bank_branch"
                  value={driver.user_bank_branch}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter bank branch"
                />
              </div>

              {/* Bank IFSC */}
              <div>
                <FormLabel>Bank IFSC</FormLabel>
                <input
                  type="text"
                  name="user_ifsc_code"
                  value={driver.user_ifsc_code}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter IFSC code"
                />
              </div>

              {/* Account No */}
              <div>
                <FormLabel>Account No</FormLabel>
                <input
                  type="text"
                  name="user_account_no"
                  value={driver.user_account_no}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter account number"
                />
              </div>

              {/* Insurance */}
              <div>
                <FormLabel>Insurance</FormLabel>
                <input
                  type="text"
                  name="user_insurance"
                  value={driver.user_insurance}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter insurance details"
                />
              </div>

              {/* Insurance No */}
              <div>
                <FormLabel>Insurance No</FormLabel>
                <input
                  type="text"
                  name="user_insurance_no"
                  value={driver.user_insurance_no}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter insurance number"
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-bold text-[#142747]">
                Documents & Attachments
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Upload driver documents
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">

              {/* Photo */}
              <div>
                <FormLabel>Photo</FormLabel>
                <input
                  type="file"
                  name="user_image"
                  onChange={(e) => setSelectedFile1(e.target.files[0])}
                  className={fileInputClass}
                />
              </div>

              {/* Aadhar Card */}
              <div>
                <FormLabel>Aadhar Card</FormLabel>
                <input
                  type="file"
                  name="user_adhar_card"
                  onChange={(e) => setSelectedFile2(e.target.files[0])}
                  className={fileInputClass}
                />
              </div>

              {/* PAN Card */}
              <div>
                <FormLabel>PAN Card</FormLabel>
                <input
                  type="file"
                  name="user_pan_card"
                  onChange={(e) => setSelectedFile3(e.target.files[0])}
                  className={fileInputClass}
                />
              </div>

              {/* Pass Book */}
              <div>
                <FormLabel>Pass Book</FormLabel>
                <input
                  type="file"
                  name="user_passbook"
                  onChange={(e) => setSelectedFile4(e.target.files[0])}
                  className={fileInputClass}
                />
              </div>

              {/* Licence */}
              <div>
                <FormLabel>Licence</FormLabel>
                <input
                  type="file"
                  name="user_licence"
                  onChange={(e) => setSelectedFile5(e.target.files[0])}
                  className={fileInputClass}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:px-6">
            <button
              type="button"
              className={`${BackButton} h-11 min-w-[110px] rounded-xl px-6`}
              onClick={() => {
                navigate(`/master/driver-list${location?.search}`);
              }}
            >
              Back
            </button>

            <button
              type="submit"
              className={`${CreateButton} h-11 min-w-[140px] rounded-xl px-6`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Sumbitting..." : "Sumbit"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateDriver;
