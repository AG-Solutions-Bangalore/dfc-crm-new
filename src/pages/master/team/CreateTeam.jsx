
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";

const userType = [
  {
    value: "3",
    label: "Office",
  },
  {
    value: "4",
    label: "Branch Manager",
  },
];

const CreateTeam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [team, setTeam] = useState({
    full_name: "",
    email: "",
    mobile: "",
    user_company: "",
    user_salary: "",
    user_type_id: "",
    user_address: "",
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
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-company`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompany(response.data?.company);
    } catch (error) {
      console.error("Error fetching  team master data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-branch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBranch(response.data?.branch);
    } catch (error) {
      console.error("Error fetching  team master data", error);
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
        setTeam({
          ...team,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "user_salary") {
      if (validateOnlyDigits(e.target.value)) {
        setTeam({
          ...team,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setTeam({
        ...team,
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
    data.append("full_name", team.full_name);
    data.append("email", team.email);
    data.append("mobile", team.mobile);
    data.append("user_company", team.user_company);
    data.append("user_salary", team.user_salary);
    data.append("user_type_id", team.user_type_id);
    data.append("user_address", team.user_address);
    data.append("user_branch", team.user_branch);
    data.append("user_insurance", team.user_insurance);
    data.append("user_insurance_no", team.user_insurance_no);
    data.append("user_bank", team.user_bank);
    data.append("user_bank_branch", team.user_bank_branch);
    data.append("user_account_no", team.user_account_no);
    data.append("user_ifsc_code", team.user_ifsc_code);
    data.append("user_image", selectedFile1);
    data.append("user_adhar_card", selectedFile2);
    data.append("user_pan_card", selectedFile3);
    data.append("user_passbook", selectedFile4);
    data.append("user_licence", selectedFile5);

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-team",
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

      navigate(`/master/team-list${location?.search}`);
      setTeam({
        full_name: "",
        email: "",
        mobile: "",
        user_company: "",
        user_salary: "",
        user_type_id: "",
        user_address: "",
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
                Add Team
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Create a new team member and add their details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(`/master/team-list${location?.search}`)
            }
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#142747] transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#F56616]"
          >
            <IconArrowBack size={18} />
            Back to Team List
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full space-y-5"
        >
          {/* Basic Information */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-bold text-[#142747]">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the team member's personal and contact details
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">

              {/* Full Name */}
              <div className="sm:col-span-2">
                <FormLabel required>Full Name</FormLabel>
                <input
                  type="text"
                  name="full_name"
                  value={team.full_name}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <FormLabel required>Company</FormLabel>
                <select
                  name="user_company"
                  value={team.user_company}
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
                  value={team.user_branch}
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

              {/* Address */}
              <div className="sm:col-span-2 lg:col-span-4">
                <FormLabel required>Address</FormLabel>
                <textarea
                  type="text"
                  name="user_address"
                  value={team.user_address}
                  onChange={(e) => onInputChange(e)}
                  className={`${inputClass} h-auto min-h-[100px] resize-y py-3`}
                  required
                  rows={3}
                  multiline
                  placeholder="Enter complete address"
                />
              </div>

              {/* Mobile */}
              <div>
                <FormLabel required>Mobile</FormLabel>
                <input
                  type="tel"
                  name="mobile"
                  value={team.mobile}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                  maxLength={10}
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Email */}
              <div>
                <FormLabel required>Email</FormLabel>
                <input
                  type="email"
                  name="email"
                  value={team.email}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                  placeholder="Enter email address"
                />
              </div>

              {/* Salary */}
              <div>
                <FormLabel>Salary</FormLabel>
                <input
                  type="tel"
                  name="user_salary"
                  value={team.user_salary}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter salary"
                />
              </div>

              {/* User Type */}
              <div>
                <FormLabel required>User Type</FormLabel>
                <select
                  name="user_type_id"
                  value={team.user_type_id}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={inputClassSelect}
                >
                  <option value="">Select User Type</option>
                  {userType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                Add bank account details
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">

              {/* Bank */}
              <div>
                <FormLabel>Bank</FormLabel>
                <input
                  type="text"
                  name="user_bank"
                  value={team.user_bank}
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
                  value={team.user_bank_branch}
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
                  value={team.user_ifsc_code}
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
                  value={team.user_account_no}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter account number"
                />
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base font-bold text-[#142747]">
                Insurance Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add insurance details if applicable
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">

              {/* Insurance */}
              <div>
                <FormLabel>Insurance</FormLabel>
                <input
                  type="text"
                  name="user_insurance"
                  value={team.user_insurance}
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
                  value={team.user_insurance_no}
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
                Upload the team member's required documents
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
                navigate(`/master/team-list${location?.search}`);
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

export default CreateTeam;
