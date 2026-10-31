import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "sonner";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { IconArrowBack, IconPlus, IconTrash } from "@tabler/icons-react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { decryptId } from "../../components/common/EncryptionDecryption";
import { Wrench } from "lucide-react";

const EditServices = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [count, setCount] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [service, setService] = useState({
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
    service_status: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const useTemplate = {
    service_sub_type: "",
    service_sub_amount: "",
    service_sub_details: "",
    id: "",
  };

  const [users, setUsers] = useState([useTemplate]);
  const [loading, setLoading] = useState(false);

  const fetchEditService = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-services-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setService(response.data?.services || {});
      setUsers(response.data?.servicesSub || [useTemplate]);
      setCount(response.data?.servicesSub?.length || 0);
      setSubCount(response.data?.servicesSub?.length || 0);
    } catch (error) {
      console.error("Error fetching Edit Service data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditService();
  }, []);

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

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i
        ? Object.assign(user, { [e.target.name]: e.target.value })
        : user
    );
    setUsers(updatedUsers);
  };

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length === 0) {
      return true;
    } else {
      return false;
    }
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
    if (e.name === "service_truck_no") {
      setService({
        ...service,
        service_truck_no: e.value,
      });
    } else if (e.name === "service_garage") {
      setService({
        ...service,
        service_garage: e.value,
      });
    } else if (e.target.name === "service_km") {
      if (validateOnlyNumber(e.target.value)) {
        setService({
          ...service,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "service_amount") {
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

  const deleteUser = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${BASE_URL}/api/panel-delete-services-sub/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Service Sub Deleted Successfully");
      fetchEditService();
      setOpen(false);
    } catch (error) {
      toast.error("Service Sub Not Deleted");
    }
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
      service_truck_no: service.service_truck_no,
      service_garage: service.service_garage,
      service_km: service.service_km,
      service_pre_km: service.service_pre_km,
      service_amount: service.service_amount,
      service_remarks: service.service_remarks,
      service_status: service.service_status,
      service_count: subCount,
      service_sub_data: users,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-services/${decryptedId}`,
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
      navigate("/service-list");
    }).finally(() => {
      setIsButtonDisabled(false);
    });
  };

  const addItem = () => {
    setUsers([...users, { ...useTemplate }]);
    setCount(count + 1);
    setSubCount(subCount + 1);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(count - 1);
    setSubCount(subCount - 1);
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
      <Dialog
        open={open}
        handler={() => setOpen(false)}
        className="rounded-2xl p-2"
      >
        <DialogHeader className="text-base font-bold text-[#0A1D3D]">
          Confirm Delete
        </DialogHeader>
        <DialogBody className="text-sm text-slate-600">
          Are you sure you want to remove this service head item permanently?
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold capitalize"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDeleteConfirm}
            className="rounded-xl bg-rose-600 hover:bg-rose-700 px-5 py-2 text-xs font-semibold text-white capitalize shadow-sm"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="w-full space-y-4">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
              <Wrench size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Edit Service Record
              </h2>
              <p className="text-xs text-slate-300">
                Update Service #{decryptedId} - {service.service_truck_no}
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F56616]"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
              {/* Section 1: Overview */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F56616]"></span>
                  Service Primary Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      value={service.service_km || ""}
                      onChange={(e) => onInputChange(e)}
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* Total Amount */}
                  <div>
                    <FormLabel required>Total Amount (₹)</FormLabel>
                    <input
                      type="tel"
                      name="service_amount"
                      value={service.service_amount || ""}
                      onChange={(e) => onInputChange(e)}
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <FormLabel required>Status</FormLabel>
                    <select
                      name="service_status"
                      value={service.service_status || ""}
                      onChange={(e) => onInputChange(e)}
                      className={inputClassSelect}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Remarks */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <FormLabel>Remarks</FormLabel>
                    <input
                      type="text"
                      name="service_remarks"
                      value={service.service_remarks || ""}
                      onChange={(e) => onInputChange(e)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Service Head Details */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#142747]"></span>
                    Service Heads & Breakdown ({users.length})
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
                          value={user.service_sub_type || ""}
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
                          value={user.service_sub_amount || ""}
                          onChange={(e) => onChange(e, index)}
                          className={inputClass}
                          required
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <FormLabel>Description</FormLabel>
                        <input
                          type="text"
                          name="service_sub_details"
                          value={user.service_sub_details || ""}
                          onChange={(e) => onChange(e, index)}
                          className={inputClass}
                        />
                      </div>

                      {/* Action */}
                      <div className="flex items-center pb-1">
                        {user.id ? (
                          <button
                            type="button"
                            onClick={() => deleteUser(user.id)}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                            title="Delete Sub Item"
                          >
                            <IconTrash className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        ) : users.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeUser(index)}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                            title="Remove"
                          >
                            <IconTrash className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        ) : null}
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
                  {isButtonDisabled ? "Updating..." : "Update Service Record"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditServices;
