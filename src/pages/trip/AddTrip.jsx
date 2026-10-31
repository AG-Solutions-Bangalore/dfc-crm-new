import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import Select from "react-select";
import { BackButton, CreateButton } from "../../components/common/ButtonColors";
import { Navigation, ArrowLeft } from "lucide-react";

const AddTrip = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    trip_date: todayback,
    trip_year: "2023-24",
    trip_branch: "",
    trip_company: "",
    trip_driver: "",
    vehicle_driver: "",
    trip_vehicle: "",
    trip_agency: "",
    trip_hsd: "",
    trip_advance: "",
    trip_mileage: "",
    trip_hsd_supplied: "",
    trip_supplier: "",
    trip_remarks: "",
    trip_km: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // vehicle state
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesOtherData, setvehiclesOtherData] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [agency, setAgency] = useState([]);
  const [agenciesRT, setAgenciesRT] = useState([]);
  const [driver, setDriver] = useState([]);
  const [vehiclesDriver, setvehiclesDriver] = useState([]);

  const fetchVechile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-remaing-trip-vehicle`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVehicles(response.data?.vehicles || []);
    } catch (error) {
      console.error("Error fetching trip data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVechileOtherData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-other-data/${trip.trip_vehicle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setvehiclesOtherData(response.data?.vehiclesOtherData || {});
    } catch (error) {
      console.error("Error fetching setvechile other data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendor = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vendors/Diesel/${vehiclesOtherData.vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVendor(response.data?.vendor || []);
    } catch (error) {
      console.error("Error fetching trip data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgency = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-agencies/${vehiclesOtherData.vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgency(response.data?.agencies || []);
    } catch (error) {
      console.error("Error fetching trip agency data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgencyRt = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-agencies-sh-rt/${trip.trip_agency}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgenciesRT(response.data?.agenciesRT || {});
    } catch (error) {
      console.error("Error fetching agency rt data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDriver = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-assigning-tripdriver/${vehiclesOtherData.vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriver(response.data?.drivers || []);
    } catch (error) {
      console.error("Error fetching driver trip data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVechileDriver = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-driver/${trip.trip_vehicle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setvehiclesDriver(response.data?.vehiclesDriver || {});
    } catch (error) {
      console.error("Error fetching driver vechile trip data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVechile();
  }, []);

  useEffect(() => {
    if (trip.trip_vehicle && trip.trip_vehicle !== "") {
      fetchVechileOtherData();
      fetchVechileDriver();
    }
  }, [trip.trip_vehicle]);

  useEffect(() => {
    if (
      vehiclesOtherData.vehicle_branch &&
      vehiclesOtherData.vehicle_branch !== ""
    ) {
      fetchVendor();
      fetchAgency();
      fetchDriver();
    }
  }, [vehiclesOtherData.vehicle_branch]);

  useEffect(() => {
    if (trip.trip_agency && trip.trip_agency !== "") {
      fetchAgencyRt();
    }
  }, [trip.trip_agency]);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e?.name === "trip_vehicle") {
      setTrip({
        ...trip,
        trip_vehicle: e.value,
      });
    } else if (e?.name === "trip_agency") {
      setTrip({
        ...trip,
        trip_agency: e.value,
      });
    } else if (e?.name === "trip_driver") {
      setTrip({
        ...trip,
        trip_driver: e.value,
      });
    } else if (e?.name === "trip_supplier") {
      setTrip({
        ...trip,
        trip_supplier: e.value,
      });
    } else if (e?.target?.name === "trip_hsd") {
      if (validateOnlyDigits(e.target.value)) {
        setTrip({
          ...trip,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e?.target?.name === "trip_advance") {
      if (validateOnlyDigits(e.target.value)) {
        setTrip({
          ...trip,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e?.target) {
      setTrip({
        ...trip,
        [e.target.name]: e.target.value,
      });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      minHeight: "38px",
      fontSize: "0.8125rem",
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#142747" : "#E2E8F0",
      boxShadow: state.isFocused ? "0 0 0 1px #142747" : "none",
      "&:hover": {
        borderColor: "#CBD5E1",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.8125rem",
      zIndex: 50,
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Please fill all required fields");
      setIsButtonDisabled(false);
      return;
    }

    const data = {
      trip_date: trip.trip_date,
      trip_year: "2023-24",
      trip_vehicle: trip.trip_vehicle,
      trip_agency: trip.trip_agency,
      trip_hsd: Math.round(
        agenciesRT.agency_rt_km / vehiclesOtherData.vehicle_mileage
      ),
      trip_advance: trip.trip_advance,
      trip_hsd_supplied: trip.trip_hsd_supplied,
      trip_supplier: trip.trip_supplier,
      trip_remarks: trip.trip_remarks,
      trip_branch: vehiclesOtherData.vehicle_branch,
      trip_company: vehiclesOtherData.vehicle_company,
      trip_driver: trip.trip_driver,
    };

    setIsButtonDisabled(true);
    try {
      const res = await axios({
        url: BASE_URL + "/api/web-create-trip",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.code === 200 || res.data.code === "200") {
        toast.success(res.data.msg);
        navigate("/trip-list");
        setTrip({
          trip_date: todayback,
          trip_year: "2023-24",
          trip_branch: "",
          trip_company: "",
          trip_driver: "",
          vehicle_driver: "",
          trip_vehicle: "",
          trip_agency: "",
          trip_hsd: "",
          trip_advance: "",
          trip_mileage: "",
          trip_hsd_supplied: "",
          trip_supplier: "",
          trip_remarks: "",
          trip_km: "",
        });
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong!");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors";
  const disabledClass =
    "w-full px-3 py-2 text-xs border border-gray-200 bg-gray-50 text-gray-600 rounded-lg cursor-not-allowed";

  return (
    <Layout>
      <div className="space-y-4">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Navigation className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Create New Trip
              </h2>
              <p className="text-xs text-gray-300">
                Allocate vehicle, agency route and calculate fixed diesel requirement
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/trip-list")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Date */}
              <div>
                <FormLabel required>Date</FormLabel>
                <input
                  type="date"
                  required
                  name="trip_date"
                  value={trip.trip_date}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                />
              </div>

              {/* Vehicle No */}
              <div>
                <FormLabel required>Vehicle No</FormLabel>
                <Select
                  name="trip_vehicle"
                  options={vehicles.map((option) => ({
                    value: option.reg_no,
                    label: option.reg_no,
                    name: "trip_vehicle",
                  }))}
                  onChange={(e) => onInputChange(e)}
                  value={
                    trip.trip_vehicle
                      ? {
                          value: trip.trip_vehicle,
                          label: trip.trip_vehicle,
                        }
                      : null
                  }
                  placeholder="Select Vehicle No"
                  styles={customStyles}
                  isSearchable={true}
                  required
                />
              </div>

              {/* Company */}
              <div>
                <FormLabel required>Company</FormLabel>
                <input
                  type="text"
                  name="trip_company"
                  value={vehiclesOtherData.vehicle_company || ""}
                  className={disabledClass}
                  required
                  disabled
                />
              </div>

              {/* Branch */}
              <div>
                <FormLabel required>Branch</FormLabel>
                <input
                  type="text"
                  name="trip_branch"
                  value={vehiclesOtherData.vehicle_branch || ""}
                  className={disabledClass}
                  required
                  disabled
                />
              </div>

              {/* Current Vehicle Driver */}
              <div>
                <FormLabel required>Assigned Driver</FormLabel>
                <input
                  type="text"
                  name="vehicle_driver"
                  value={vehiclesDriver.vehicle_driver || ""}
                  className={disabledClass}
                  required
                  disabled
                />
              </div>

              {/* Change Driver */}
              <div>
                <FormLabel>Change Driver</FormLabel>
                <Select
                  name="trip_driver"
                  options={driver.map((option) => ({
                    value: option.full_name,
                    label: option.full_name,
                    name: "trip_driver",
                  }))}
                  onChange={(e) => onInputChange(e)}
                  value={
                    trip.trip_driver
                      ? {
                          value: trip.trip_driver,
                          label: trip.trip_driver,
                        }
                      : null
                  }
                  placeholder="Select Change Driver"
                  styles={customStyles}
                  isSearchable={true}
                />
              </div>

              {/* Agencies */}
              <div>
                <FormLabel required>Agencies</FormLabel>
                <Select
                  name="trip_agency"
                  options={agency.map((option) => ({
                    value: option.agency_name,
                    label: option.agency_name,
                    name: "trip_agency",
                  }))}
                  onChange={(e) => onInputChange(e)}
                  value={
                    trip.trip_agency
                      ? {
                          value: trip.trip_agency,
                          label: trip.trip_agency,
                        }
                      : null
                  }
                  required
                  placeholder="Select Agencies"
                  styles={customStyles}
                  isSearchable={true}
                />
              </div>

              {/* RT Km */}
              <div>
                <FormLabel required>RT KM</FormLabel>
                <input
                  type="text"
                  name="trip_km"
                  value={agenciesRT.agency_rt_km || ""}
                  className={disabledClass}
                  required
                  disabled
                />
              </div>

              {/* Mileage */}
              <div>
                <FormLabel required>Mileage</FormLabel>
                <input
                  type="text"
                  name="trip_mileage"
                  value={vehiclesOtherData.vehicle_mileage || ""}
                  className={disabledClass}
                  required
                  disabled
                />
              </div>

              {/* Supplier */}
              <div>
                <FormLabel>Supplier</FormLabel>
                <Select
                  name="trip_supplier"
                  options={vendor.map((option) => ({
                    value: option.vendor_name,
                    label: option.vendor_name,
                    name: "trip_supplier",
                  }))}
                  onChange={(e) => onInputChange(e)}
                  value={
                    trip.trip_supplier
                      ? {
                          value: trip.trip_supplier,
                          label: trip.trip_supplier,
                        }
                      : null
                  }
                  placeholder="Select Supplier"
                  styles={customStyles}
                  isSearchable={true}
                />
              </div>

              {/* Fixed HSD */}
              <div>
                <FormLabel required>Fixed HSD</FormLabel>
                <input
                  type="text"
                  name="trip_hsd"
                  value={
                    agenciesRT.agency_rt_km && vehiclesOtherData.vehicle_mileage
                      ? Math.round(
                          agenciesRT.agency_rt_km /
                            vehiclesOtherData.vehicle_mileage
                        )
                      : ""
                  }
                  className={disabledClass}
                  required
                  disabled
                />
              </div>

              {/* HSD Supplied */}
              <div>
                <FormLabel>HSD Supplied</FormLabel>
                <input
                  type="text"
                  name="trip_hsd_supplied"
                  value={trip.trip_hsd_supplied}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter supplied quantity"
                />
              </div>

              {/* Advance */}
              <div>
                <FormLabel>Advance (₹)</FormLabel>
                <input
                  type="text"
                  name="trip_advance"
                  value={trip.trip_advance}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter advance amount"
                />
              </div>

              {/* Remarks */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <FormLabel>Remarks</FormLabel>
                <textarea
                  name="trip_remarks"
                  value={trip.trip_remarks}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  rows={2}
                  placeholder="Enter any additional trip remarks..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className={CreateButton}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submitting..." : "Submit Trip"}
              </button>

              <button
                type="button"
                className={BackButton}
                onClick={() => navigate("/trip-list")}
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

export default AddTrip;
