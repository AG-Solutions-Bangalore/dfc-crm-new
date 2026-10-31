import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconPlus, IconTrash } from "@tabler/icons-react";
import Select from "react-select";
import moment from "moment/moment";
import { Wrench } from "lucide-react";

const AddServices = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesOtherData, setVehiclesOtherData] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [serviceSub, setServiceSub] = useState([]);
  const [service, setService] = useState({
    service_date: todayback,
    service_year: "2023-24",
    service_company: "",
    service_branch: "",
    service_truck_no: "",
    service_garage: "",
    service_km: "",
    service_pre_km: "",
    service_amount: "",
    service_remarks: "",
    service_count: "",
    service_sub_data: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fabric_inward_count, setCount] = useState(1);
  const useTemplate = {
    service_sub_type: "",
    service_sub_amount: "",
    service_sub_details: "",
  };

  const [users, setUsers] = useState([useTemplate]);

  useEffect(() => {
    const fetchVehiclesData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-vehicles-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVehicles(response.data?.vehicles || []);
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
      }
    };

    fetchVehiclesData();
  }, []);

  useEffect(() => {
    const fetchVehiclesOtherData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-vehicles-by-id/${service.service_truck_no}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVehiclesOtherData(response.data?.vehicles || {});
        setServiceSub(response.data?.servicesSub || []);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    if (service.service_truck_no) {
      fetchVehiclesOtherData();
    }
  }, [service.service_truck_no]);

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
    const fetchServiceTypeData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-service-types-list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setServiceType(response.data?.serviceType || []);
      } catch (error) {
        console.error("Error fetching service types data:", error);
      }
    };

    fetchServiceTypeData();
  }, []);

  const addItem = () => {
    setUsers([...users, { ...useTemplate }]);
    setCount(fabric_inward_count + 1);
  };

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i
        ? Object.assign(user, { [e.target.name]: e.target.value })
        : user
    );
    setUsers(updatedUsers);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.name == "service_truck_no") {
      setService({
        ...service,
        service_truck_no: e.value,
      });
    } else if (e.name == "service_garage") {
      setService({
        ...service,
        service_garage: e.value,
      });
    } else if (e.target.name == "service_km") {
      if (validateOnlyNumber(e.target.value)) {
        setService({
          ...service,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "service_pre_km") {
      if (validateOnlyNumber(e.target.value)) {
        setService({
          ...service,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "service_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setService({
          ...service,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setService({
        ...service,
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
      service_date: service.service_date,
      service_year: "2023-24",
      service_company: vehiclesOtherData.vehicle_company,
      service_branch: vehiclesOtherData.vehicle_branch,
      service_truck_no: service.service_truck_no,
      service_garage: service.service_garage,
      service_km: service.service_km,
      service_pre_km: service.service_pre_km,
      service_amount: service.service_amount,
      service_remarks: service.service_remarks,
      service_count: fabric_inward_count,
      service_sub_data: users,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-services",
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
      navigate("/service-list");
      setService({
        service_date: todayback,
        service_year: "2023-24",
        service_company: "",
        service_branch: "",
        service_truck_no: "",
        service_garage: "",
        service_km: "",
        service_pre_km: "",
        service_amount: "",
        service_remarks: "",
        service_count: "",
        service_sub_data: "",
      });
    }).finally(() => {
      setIsButtonDisabled(false);
    });
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
              <Wrench size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Create Service Record
              </h2>
              <p className="text-xs text-slate-300">
                Log New Vehicle Maintenance & Workshop Expenses
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/service-list")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
            title="Back to Service List"
          >
            <IconArrowBack size={21} />
          </button>
        </div>

        {/* FORM CONTAINER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            {/* Section 1: Service Primary Details */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F56616]"></span>
                Vehicle & Garage Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <FormLabel required>Date</FormLabel>
                  <input
                    type="date"
                    required
                    name="service_date"
                    value={service.service_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>

                {/* Vehicle No */}
                <div>
                  <FormLabel required>Vehicle No</FormLabel>
                  <Select
                    name="service_truck_no"
                    options={vehicles.map((option) => ({
                      value: option.reg_no,
                      label: option.reg_no,
                      name: "service_truck_no",
                    }))}
                    required
                    onChange={(e) => onInputChange(e)}
                    value={
                      service.service_truck_no
                        ? {
                            value: service.service_truck_no,
                            label: service.service_truck_no,
                          }
                        : null
                    }
                    placeholder="Select Vehicle No"
                    styles={customStyles}
                    isSearchable={true}
                  />
                </div>

                {/* Company (Auto Filled) */}
                <div>
                  <FormLabel>Company</FormLabel>
                  <input
                    type="text"
                    name="service_company"
                    value={vehiclesOtherData.vehicle_company || ""}
                    className={`${inputClass} bg-slate-100 text-slate-500 cursor-not-allowed`}
                    disabled
                    placeholder="Auto-populated"
                  />
                </div>

                {/* Branch (Auto Filled) */}
                <div>
                  <FormLabel>Branch</FormLabel>
                  <input
                    type="text"
                    name="service_branch"
                    value={vehiclesOtherData.vehicle_branch || ""}
                    className={`${inputClass} bg-slate-100 text-slate-500 cursor-not-allowed`}
                    disabled
                    placeholder="Auto-populated"
                  />
                </div>

                {/* Garage */}
                <div>
                  <FormLabel>Garage / Vendor</FormLabel>
                  <Select
                    name="service_garage"
                    options={vendor.map((option) => ({
                      value: option.vendor_name,
                      label: option.vendor_name,
                      name: "service_garage",
                    }))}
                    onChange={(e) => onInputChange(e)}
                    value={
                      service.service_garage
                        ? {
                            value: service.service_garage,
                            label: service.service_garage,
                          }
                        : null
                    }
                    placeholder="Select Garage"
                    styles={customStyles}
                    isSearchable={true}
                  />
                </div>

                {/* KM */}
                <div>
                  <FormLabel required>Current KM</FormLabel>
                  <input
                    type="tel"
                    name="service_km"
                    value={service.service_km}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                    required
                    placeholder="Enter Current KM"
                  />
                </div>

                {/* Total Amount */}
                <div>
                  <FormLabel required>Total Amount (₹)</FormLabel>
                  <input
                    type="tel"
                    name="service_amount"
                    value={service.service_amount}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                    required
                    placeholder="Enter Total Amount"
                  />
                </div>

                {/* Remarks */}
                <div className="col-span-1 md:col-span-2">
                  <FormLabel>Remarks</FormLabel>
                  <input
                    type="text"
                    name="service_remarks"
                    value={service.service_remarks}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                    placeholder="Service remarks or invoice details..."
                  />
                </div>
              </div>
            </div>

            {/* Service Summary for Selected Vehicle */}
            {serviceSub.length > 0 && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
                <h4 className="text-xs font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span>Past Service History Summary for {service.service_truck_no}</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {serviceSub.map((dataSumm, index) => (
                    <div
                      key={index}
                      className="bg-white border border-blue-200 rounded-xl p-2.5 text-center shadow-2xs"
                    >
                      <p className="text-xs font-bold text-slate-800 truncate mb-1">
                        {dataSumm.service_sub_type}
                      </p>
                      <p className="text-[11px] text-slate-500 mb-1">
                        {moment(dataSumm.service_sub_date).format("DD-MM-YYYY")}
                      </p>
                      <p className="text-xs font-bold text-[#F56616]">
                        {dataSumm.service_sub_km} KM
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Service Head Details */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#142747]"></span>
                  Service Heads & Tasks ({users.length})
                </h3>

                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#F56616] bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors shadow-2xs"
                >
                  <IconPlus className="w-4 h-4" /> Add Head
                </button>
              </div>

              <div className="space-y-3">
                {users.map((user, index) => (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-white rounded-xl border border-slate-200 items-end"
                    key={index}
                  >
                    {/* Service Type */}
                    <div>
                      <FormLabel required>Service Type</FormLabel>
                      <select
                        name="service_sub_type"
                        value={user.service_sub_type}
                        onChange={(e) => onChange(e, index)}
                        required
                        className={inputClassSelect}
                      >
                        <option value="">Select Service Type</option>
                        {serviceType.map((option) => (
                          <option
                            key={option.service_types}
                            value={option.service_types}
                          >
                            {option.service_types}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Amount */}
                    <div>
                      <FormLabel required>Amount (₹)</FormLabel>
                      <input
                        type="text"
                        name="service_sub_amount"
                        value={user.service_sub_amount}
                        onChange={(e) => onChange(e, index)}
                        className={inputClass}
                        required
                        placeholder="Amount"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <FormLabel>Description / Part Info</FormLabel>
                      <input
                        type="text"
                        name="service_sub_details"
                        value={user.service_sub_details}
                        onChange={(e) => onChange(e, index)}
                        className={inputClass}
                        placeholder="Details"
                      />
                    </div>

                    {/* Action */}
                    <div className="flex items-center pb-1">
                      {users.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeUser(index)}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                          title="Remove Head"
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
                onClick={() => navigate("/service-list")}
                className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="h-10 rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E85B0B] disabled:opacity-50"
              >
                {isButtonDisabled ? "Submitting..." : "Save Service Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddServices;
