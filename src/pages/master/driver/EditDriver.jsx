
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";
import { decryptId } from "../../../components/common/EncryptionDecryption";

const status = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const vehicleType = [
  { value: "6W Truck", label: "6W Truck" },
  { value: "10W Truck", label: "10W Truck" },
  { value: "Car", label: "Car" },
];

const EditDriver = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

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
    user_status: "",
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

  const fetchEditDriver = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-driver-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriver(response.data?.driver);
    } catch (error) {
      console.error("Error fetching  driver edit master data", error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchEditDriver();
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
    data.append("user_status", driver.user_status);
    data.append("user_image", selectedFile1);
    data.append("user_adhar_card", selectedFile2);
    data.append("user_pan_card", selectedFile3);
    data.append("user_passbook", selectedFile4);
    data.append("user_licence", selectedFile5);

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-driver/${decryptedId}?_method=PUT`,
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
    });
  };

  const FormLabel = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-[#142747]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const fileClass =
    "block w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-orange-50 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-[#F56616] hover:border-orange-300";

  const Section = ({ title, description, children }) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-[#142747]">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );

  const FileField = ({ label, value, onChange }) => (
    <div className="min-w-0">
      <FormLabel>{label}</FormLabel>
      <input type="file" onChange={onChange} className={fileClass} />
      {value && (
        <p className="mt-2 truncate text-xs font-medium text-orange-700">
          Current file: {value}
        </p>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen space-y-6 bg-[#F8FAFC] p-3 sm:p-5">
        {/* Page Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-[#F56616]">
                <IconInfoCircle size={25} stroke={1.8} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0A1F44] sm:text-2xl">
                  Edit Driver
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update driver details, licence, banking and documents
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/master/driver-list${location?.search}`)
              }
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#142747] transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#F56616]"
            >
              <IconArrowBack size={18} />
              Back to Drivers
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full space-y-6"
        >
          {/* Driver Information */}
          <Section
            title="Driver Information"
            description="Basic driver details and assigned company information"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <FormLabel required>Driver Name</FormLabel>
                <input
                  disabled
                  type="text"
                  name="full_name"
                  value={driver.full_name}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <FormLabel required>Company</FormLabel>
                <select
                  name="user_company"
                  value={driver.user_company}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={selectClass}
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

              <div>
                <FormLabel required>Branch</FormLabel>
                <select
                  name="user_branch"
                  value={driver.user_branch}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={selectClass}
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

              <div>
                <FormLabel required>Mobile</FormLabel>
                <input
                  maxLength={10}
                  type="tel"
                  required
                  name="mobile"
                  value={driver.mobile}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="md:col-span-2 xl:col-span-4">
                <FormLabel required>Address</FormLabel>
                <textarea
                  type="text"
                  name="user_address"
                  value={driver.user_address}
                  onChange={(e) => onInputChange(e)}
                  className={textareaClass}
                  required
                  rows={3}
                  placeholder="Enter driver address"
                />
              </div>

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

              <div>
                <FormLabel required>Vehicle</FormLabel>
                <select
                  name="vehicle_type"
                  value={driver.vehicle_type}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={selectClass}
                >
                  <option value="">Select Vehicle</option>
                  {vehicleType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FormLabel required>Status</FormLabel>
                <select
                  name="user_status"
                  value={driver.user_status}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={selectClass}
                >
                  <option value="">Select Status</option>
                  {status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          {/* Driving Licence Information */}
          <Section
            title="Driving Licence Information"
            description="Licence and hazardous goods licence details"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <FormLabel>DL No</FormLabel>
                <input
                  type="text"
                  name="dl_no"
                  value={driver.dl_no}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter DL number"
                />
              </div>

              <div>
                <FormLabel>DL Expiry</FormLabel>
                <input
                  type="date"
                  name="dl_expiry"
                  value={driver.dl_expiry}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                />
              </div>

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
          </Section>

          {/* Bank and Insurance Information */}
          <Section
            title="Bank & Insurance Information"
            description="Driver bank account and insurance details"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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

              <div>
                <FormLabel>Insurance</FormLabel>
                <input
                  type="text"
                  name="user_insurance"
                  value={driver.user_insurance}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter insurance provider"
                />
              </div>

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
          </Section>

          {/* Documents */}
          <Section
            title="Documents & Attachments"
            description="Upload replacement documents if required. Existing filenames are shown below."
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              <FileField
                label="Photo"
                value={driver?.user_image}
                onChange={(e) => setSelectedFile1(e.target.files[0])}
              />

              <FileField
                label="Aadhar Card"
                value={driver?.user_adhar_card}
                onChange={(e) => setSelectedFile2(e.target.files[0])}
              />

              <FileField
                label="PAN Card"
                value={driver?.user_pan_card}
                onChange={(e) => setSelectedFile3(e.target.files[0])}
              />

              <FileField
                label="Pass Book"
                value={driver?.user_passbook}
                onChange={(e) => setSelectedFile4(e.target.files[0])}
              />

              <FileField
                label="Licence"
                value={driver?.user_licence}
                onChange={(e) => setSelectedFile5(e.target.files[0])}
              />
            </div>
          </Section>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <button
              type="button"
              className={BackButton}
              onClick={() => {
                navigate(`/master/driver-list${location?.search}`);
              }}
            >
              Back
            </button>

            <button
              type="submit"
              className={CreateButton}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditDriver;
