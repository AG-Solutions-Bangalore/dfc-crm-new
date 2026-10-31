import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import Select from "react-select";
import { decryptId } from "../../components/common/EncryptionDecryption";

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

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const EditVechiles = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState({
    reg_no: "",
    mfg_year: "",
    ins_due: "",
    permit_due: "",
    fc_due: "",
    vehicle_type: "",
    vehicle_company: "",
    no_of_gas_cylinder: "",
    vehicle_status: "",
    vehicle_driver: "",
    vehicle_branch: "",
    vehicle_mileage: "",
    vehicle_open_km: "",
    vehicle_hsd_open: "",
    vehicle_present_km: "",
    vehicle_present_date: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);
  const [driver, setDriver] = useState([]);
  const [company, setCompany] = useState([]);

  const fetchEditVechiles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVehicles(response.data?.vehicles);
    } catch (error) {
      console.error("Error fetching vechile edit data", error);
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
      console.error("Error fetching vechile compnay edit data", error);
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
      console.error("Error fetching vechiles braanch  edit data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDriver = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-remaing-vehicle-driver/${vehicles.reg_no}/${vehicles.vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriver(response.data?.drivers);
    } catch (error) {
      console.error("Error fetching vechile driver edit data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditVechiles();
    fetchBranch();
    fetchCompany();
  }, []);

  useEffect(() => {
    if (
      vehicles.vehicle_branch &&
      vehicles.reg_no &&
      vehicles.vehicle_branch !== ""
    ) {
      fetchDriver();
    }
  }, [vehicles.vehicle_branch, vehicles.reg_no]);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.name == "vehicle_driver") {
      setVehicles({
        ...vehicles,
        vehicle_driver: e.value,
      });
    } else if (e.target.name == "vehicle_mileage") {
      if (validateOnlyNumber(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "no_of_gas_cylinder") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "vehicle_hsd_open") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "vehicle_open_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "vehicle_present_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setVehicles({
        ...vehicles,
        [e.target.name]: e.target.value,
      });
    }
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "48px",
      minHeight: "48px",
      fontSize: "0.875rem",
      borderRadius: "0.75rem",
      borderColor: "#CBD5E1",
      boxShadow: "none",
      "&:hover": { borderColor: "#F56616" },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
      zIndex: 50,
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
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
      reg_no: vehicles.reg_no,
      mfg_year: vehicles.mfg_year,
      ins_due: vehicles.ins_due,
      permit_due: vehicles.permit_due,
      fc_due: vehicles.fc_due,
      vehicle_type: vehicles.vehicle_type,
      vehicle_company: vehicles.vehicle_company,
      vehicle_branch: vehicles.vehicle_branch,

      bata_for_trip: vehicles.bata_for_trip,
      incentive_for_km: vehicles.incentive_for_km,
      incentive_for_trip: vehicles.incentive_for_trip,
      no_of_gas_cylinder: vehicles.no_of_gas_cylinder,
      vehicle_status: vehicles.vehicle_status,

      vehicle_driver: vehicles.vehicle_driver,
      vehicle_mileage: vehicles.vehicle_mileage,
      vehicle_open_km: vehicles.vehicle_open_km,
      vehicle_hsd_open: vehicles.vehicle_hsd_open,
      vehicle_present_km: vehicles.vehicle_present_km,
      vehicle_present_date: vehicles.vehicle_present_date,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-vehicles/${decryptedId}`,
      method: "PUT",
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
      navigate("/vehicles-list");
    });
  };

  const FormLabel = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-[#142747]">
      {children}
      {required && <span className="ml-1 text-[#F56616]">*</span>}
    </label>
  );

  const inputClassSelect =
    "h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";
  const inputClass =
    "h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";
  return (
    <Layout>
      <div className="min-h-screen rounded-2xl bg-slate-50 p-3 sm:p-5">
        <div className="sticky top-0 z-30 mb-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#F56616]">
              <IconInfoCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0A1F44]">Edit Vehicle</h2>
              <p className="mt-0.5 text-xs text-slate-500">Update vehicle information and details</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/vehicles-list")}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-[#142747] transition hover:border-[#142747] hover:bg-slate-50"
          >
            <IconArrowBack className="h-4 w-4" />
            Back
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full max-w-7xl space-y-6"
        >
          <section className="overflow-visible rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#F56616]">
                <IconInfoCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0A1F44]">Vehicle Information</h3>
                <p className="text-xs text-slate-500">Review and edit the vehicle details below</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Register No  */}
            <div>
              <FormLabel required>Register No</FormLabel>
              <input
                type="text"
                name="reg_no"
                value={vehicles.reg_no}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed`}
                required
                disabled
              />
            </div>

            {/* company  */}

            <div>
              <FormLabel required>Company</FormLabel>
              <select
                name="vehicle_company"
                value={vehicles.vehicle_company}
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

            {/* vechile type  */}

            <div>
              <FormLabel required>Vehicle Type</FormLabel>
              <select
                name="vehicle_type"
                value={vehicles.vehicle_type}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Vehicle Type</option>
                {vehicleType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            {/* branch  */}
            <div>
              <FormLabel required>Branch</FormLabel>
              <select
                name="vehicle_branch"
                value={vehicles.vehicle_branch}
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

            {/* driver  */}
            <div>
              <FormLabel>Driver</FormLabel>
              <Select
                name="vehicle_driver"
                options={driver.map((option) => ({
                  value: option.full_name,
                  label: option.full_name,
                  name: "vehicle_driver",
                }))}
                onChange={(e) => onInputChange(e)}
                value={
                  vehicles.vehicle_driver
                    ? {
                        value: vehicles.vehicle_driver,
                        label: vehicles.vehicle_driver,
                      }
                    : null
                }
                placeholder="Select Driver"
                styles={customStyles}
                menuPortalTarget={document.body}
                isSearchable={true}
              />
            </div>
            {/* Model year  */}
            <div>
              <FormLabel required>Model Year</FormLabel>
              <input
                type="text"
                name="mfg_year"
                value={vehicles.mfg_year}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* mileage  */}
            <div>
              <FormLabel required>Mileage</FormLabel>
              <input
                type="tel"
                name="vehicle_mileage"
                value={vehicles.vehicle_mileage}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* Open Km  */}
            <div>
              <FormLabel required>Open KM</FormLabel>
              <input
                type="tel"
                name="vehicle_open_km"
                value={vehicles.vehicle_open_km}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* Present Km  */}
            <div>
              <FormLabel>Present KM</FormLabel>
              <input
                type="tel"
                name="vehicle_present_km"
                value={vehicles.vehicle_present_km}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* present Date  */}
            <div>
              <FormLabel>Present Km date</FormLabel>
              <input
                type="date"
                name="vehicle_present_date"
                value={vehicles.vehicle_present_date}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Open HSD  */}
            <div>
              <FormLabel required>Open HSD</FormLabel>
              <input
                type="tel"
                name="vehicle_hsd_open"
                value={vehicles.vehicle_hsd_open}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* No of Gas Cylineder  */}
            <div>
              <FormLabel>No of Gas Cylinder</FormLabel>
              <input
                type="tel"
                name="no_of_gas_cylinder"
                value={vehicles.no_of_gas_cylinder}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Insurance due  */}
            <div>
              <FormLabel>Insurance Due</FormLabel>
              <input
                type="date"
                name="ins_due"
                value={vehicles.ins_due}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Permit due  */}
            <div>
              <FormLabel>Permit Due</FormLabel>
              <input
                type="date"
                name="permit_due"
                value={vehicles.permit_due}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* FC due  */}
            <div>
              <FormLabel>FC Due</FormLabel>
              <input
                type="date"
                name="fc_due"
                value={vehicles.fc_due}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            <div>
              <FormLabel required>Status</FormLabel>
              <select
                name="vehicle_status"
                value={vehicles.vehicle_status}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Status</option>
                {status.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex flex-wrap justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <button
              type="submit"
              className="inline-flex h-11 min-w-32 items-center justify-center rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E85B0B] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#142747] bg-[#142747] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A1F44]"
              onClick={() => {
                navigate("/vehicles-list");
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditVechiles;
