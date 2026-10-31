import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import Select from "react-select";

const AddTyre = () => {
  const navigate = useNavigate();
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const [vehicles, setVehicles] = useState({
    reg_no: "",
    mfg_year: "",
    ins_due: "",
    permit_due: "",
    vehicle_branch: "",
    fc_due: "",
    vehicle_type: "",
    vehicle_company: "",
    bata_for_km: "",
    bata_for_trip: "",
    incentive_for_km: "",
    incentive_for_trip: "",
    no_of_gas_cylinder: "",
    vehicle_agency_short: "",
    vehicle_driver: "",
    vehicle_hsd: "",
    vehicle_open_km: "",
    tyre_assign_1_front_left_no: "",
    tyre_assign_1_front_left_date: todayback,
    tyre_assign_1_front_left_km: "",
    tyre_assign_2_front_right_no: "",
    tyre_assign_2_front_right_date: todayback,
    tyre_assign_2_front_right_km: "",
    tyre_assign_3_back_left_no: "",
    tyre_assign_3_back_left_date: todayback,
    tyre_assign_3_back_left_km: "",
    tyre_assign_4_back_left_no: "",
    tyre_assign_4_back_left_date: todayback,
    tyre_assign_4_back_left_km: "",
    tyre_assign_5_back_right_no: "",
    tyre_assign_5_back_right_date: todayback,
    tyre_assign_5_back_right_km: "",
    tyre_assign_6_back_right_no: "",
    tyre_assign_6_back_right_date: todayback,
    tyre_assign_6_back_right_km: "",
    tyre_assign_3_back_housing_left_no: "",
    tyre_assign_3_back_housing_left_date: todayback,
    tyre_assign_3_back_housing_left_km: "",
    tyre_assign_4_back_housing_left_no: "",
    tyre_assign_4_back_housing_left_date: todayback,
    tyre_assign_4_back_housing_left_km: "",
    tyre_assign_5_back_dummy_left_no: "",
    tyre_assign_5_back_dummy_left_date: todayback,
    tyre_assign_5_back_dummy_left_km: "",
    tyre_assign_6_back_dummy_left_no: "",
    tyre_assign_6_back_dummy_left_date: todayback,
    tyre_assign_6_back_dummy_left_km: "",
    tyre_assign_7_back_housing_right_no: "",
    tyre_assign_7_back_housing_right_date: todayback,
    tyre_assign_7_back_housing_right_km: "",
    tyre_assign_8_back_housing_right_no: "",
    tyre_assign_8_back_housing_right_date: todayback,
    tyre_assign_8_back_housing_right_km: "",
    tyre_assign_9_back_dummy_right_no: "",
    tyre_assign_9_back_dummy_right_date: todayback,
    tyre_assign_9_back_dummy_right_km: "",
    tyre_assign_10_back_dummy_right_no: "",
    tyre_assign_10_back_dummy_right_date: "",
    tyre_assign_10_back_dummy_right_km: "",

    tyre_assign_stepney_no: "",
    tyre_assign_stepney_date: "",
    tyre_assign_stepney_km: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehiclesReg, setVehiclesReg] = useState([]);
  const [tyre, setTyre] = useState([]);
  const fetchRegistorno = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-tyre-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVehiclesReg(response.data?.vehiclesReg);
    } catch (error) {
      console.error("Error fetching vechile tyre regsitor no data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchVechilesDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-data/${vehicles.reg_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVehicles(response.data?.vehiclesData);
    } catch (error) {
      console.error("Error fetching Vehicle details data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchTyre = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-by-branch/${vehicles.vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTyre(response.data?.tyre);
    } catch (error) {
      console.error("Error fetching vechiles tyre data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistorno();
  }, []);

  useEffect(() => {
    if (vehicles.reg_no && vehicles.reg_no !== "") {
      fetchVechilesDetails();
    }
  }, [vehicles.reg_no]);
  useEffect(() => {
    if (vehicles.vehicle_branch && vehicles.vehicle_branch !== "") {
      fetchTyre();
    }
  }, [vehicles.vehicle_branch]);

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
    } else if (e.name == "reg_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_1_front_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_2_front_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_3_back_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_4_back_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_5_back_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_6_back_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_3_back_housing_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_4_back_housing_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_5_back_dummy_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_6_back_dummy_left_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_7_back_housing_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_8_back_housing_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_9_back_dummy_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_10_back_dummy_right_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.name == "tyre_assign_stepney_no") {
      setVehicles({
        ...vehicles,
        [e.name]: e.value,
      });
    } else if (e.target.name == "bata_for_km") {
      if (validateOnlyNumber(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "bata_for_trip") {
      if (validateOnlyNumber(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "vehicle_hsd") {
      if (validateOnlyNumber(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "incentive_for_km") {
      if (validateOnlyNumber(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "incentive_for_trip") {
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
    } else if (e.target.name == "vehicle_open_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_stepney_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_1_front_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_2_front_right_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_3_back_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_4_back_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_5_back_right_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_6_back_right_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_3_back_housing_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_4_back_housing_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_5_back_dummy_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_6_back_dummy_left_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_7_back_housing_right_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_8_back_housing_right_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_9_back_dummy_right_km") {
      if (validateOnlyDigits(e.target.value)) {
        setVehicles({
          ...vehicles,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "tyre_assign_10_back_dummy_right_km") {
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
    control: (provided, state) => ({
      ...provided,
      minHeight: "48px",
      height: "48px",
      fontSize: "14px",
      borderRadius: "12px",
      borderColor: state.isFocused ? "#F56616" : "#E2E8F0",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(245, 102, 22, 0.12)" : "none",
      "&:hover": { borderColor: "#F56616" },
    }),
    valueContainer: (provided) => ({ ...provided, padding: "0 12px" }),
    indicatorsContainer: (provided) => ({ ...provided, height: "48px" }),
    menu: (provided) => ({
      ...provided,
      fontSize: "14px",
      borderRadius: "12px",
      overflow: "hidden",
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#FFF7ED" : "#FFFFFF",
      color: "#142747",
    }),
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
      vehicle_branch: vehicles.vehicle_branch,
      vehicle_company: vehicles.vehicle_company,
      bata_for_km: vehicles.bata_for_km,
      bata_for_trip: vehicles.bata_for_trip,
      incentive_for_km: vehicles.incentive_for_km,
      incentive_for_trip: vehicles.incentive_for_trip,
      no_of_gas_cylinder: vehicles.no_of_gas_cylinder,
      vehicle_agency_short: vehicles.vehicle_agency_short,
      vehicle_driver: vehicles.vehicle_driver,
      vehicle_hsd: vehicles.vehicle_hsd,
      vehicle_open_km: vehicles.vehicle_open_km,
      tyre_assign_1_front_left_no: vehicles.tyre_assign_1_front_left_no,
      tyre_assign_1_front_left_date: vehicles.tyre_assign_1_front_left_date,
      tyre_assign_1_front_left_km: vehicles.tyre_assign_1_front_left_km,
      tyre_assign_2_front_right_no: vehicles.tyre_assign_2_front_right_no,
      tyre_assign_2_front_right_date: vehicles.tyre_assign_2_front_right_date,
      tyre_assign_2_front_right_km: vehicles.tyre_assign_2_front_right_km,
      tyre_assign_3_back_left_no: vehicles.tyre_assign_3_back_left_no,
      tyre_assign_3_back_left_date: vehicles.tyre_assign_3_back_left_date,
      tyre_assign_3_back_left_km: vehicles.tyre_assign_3_back_left_km,
      tyre_assign_4_back_left_no: vehicles.tyre_assign_4_back_left_no,
      tyre_assign_4_back_left_date: vehicles.tyre_assign_4_back_left_date,
      tyre_assign_4_back_left_km: vehicles.tyre_assign_4_back_left_km,
      tyre_assign_5_back_right_no: vehicles.tyre_assign_5_back_right_no,
      tyre_assign_5_back_right_date: vehicles.tyre_assign_5_back_right_date,
      tyre_assign_5_back_right_km: vehicles.tyre_assign_5_back_right_km,
      tyre_assign_6_back_right_no: vehicles.tyre_assign_6_back_right_no,
      tyre_assign_6_back_right_date: vehicles.tyre_assign_6_back_right_date,
      tyre_assign_6_back_right_km: vehicles.tyre_assign_6_back_right_km,
      tyre_assign_3_back_housing_left_no:
        vehicles.tyre_assign_3_back_housing_left_no,
      tyre_assign_3_back_housing_left_date:
        vehicles.tyre_assign_3_back_housing_left_date,
      tyre_assign_3_back_housing_left_km:
        vehicles.tyre_assign_3_back_housing_left_km,
      tyre_assign_4_back_housing_left_no:
        vehicles.tyre_assign_4_back_housing_left_no,
      tyre_assign_4_back_housing_left_date:
        vehicles.tyre_assign_4_back_housing_left_date,
      tyre_assign_4_back_housing_left_km:
        vehicles.tyre_assign_4_back_housing_left_km,
      tyre_assign_5_back_dummy_left_no:
        vehicles.tyre_assign_5_back_dummy_left_no,
      tyre_assign_5_back_dummy_left_date:
        vehicles.tyre_assign_5_back_dummy_left_date,
      tyre_assign_5_back_dummy_left_km:
        vehicles.tyre_assign_5_back_dummy_left_km,
      tyre_assign_6_back_dummy_left_no:
        vehicles.tyre_assign_6_back_dummy_left_no,
      tyre_assign_6_back_dummy_left_date:
        vehicles.tyre_assign_6_back_dummy_left_date,
      tyre_assign_6_back_dummy_left_km:
        vehicles.tyre_assign_6_back_dummy_left_km,
      tyre_assign_7_back_housing_right_no:
        vehicles.tyre_assign_7_back_housing_right_no,
      tyre_assign_7_back_housing_right_date:
        vehicles.tyre_assign_7_back_housing_right_date,
      tyre_assign_7_back_housing_right_km:
        vehicles.tyre_assign_7_back_housing_right_km,
      tyre_assign_8_back_housing_right_no:
        vehicles.tyre_assign_8_back_housing_right_no,
      tyre_assign_8_back_housing_right_date:
        vehicles.tyre_assign_8_back_housing_right_date,
      tyre_assign_8_back_housing_right_km:
        vehicles.tyre_assign_8_back_housing_right_km,
      tyre_assign_9_back_dummy_right_no:
        vehicles.tyre_assign_9_back_dummy_right_no,
      tyre_assign_9_back_dummy_right_date:
        vehicles.tyre_assign_9_back_dummy_right_date,
      tyre_assign_9_back_dummy_right_km:
        vehicles.tyre_assign_9_back_dummy_right_km,
      tyre_assign_10_back_dummy_right_no:
        vehicles.tyre_assign_10_back_dummy_right_no,
      tyre_assign_10_back_dummy_right_date:
        vehicles.tyre_assign_10_back_dummy_right_date,
      tyre_assign_10_back_dummy_right_km:
        vehicles.tyre_assign_10_back_dummy_right_km,

      tyre_assign_stepney_no: vehicles.tyre_assign_stepney_no,
      tyre_assign_stepney_date: vehicles.tyre_assign_stepney_date,
      tyre_assign_stepney_km: vehicles.tyre_assign_stepney_km,
    };

    setIsButtonDisabled(true);
    try {
      const res = await axios({
        url: BASE_URL + "/api/web-create-vehicles-tyre-assign",
        method: "POST",
        data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.code === 200) {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }

      navigate("/vehicles-list");

      setVehicles({
        reg_no: "",
        mfg_year: "",
        ins_due: "",
        permit_due: "",
        vehicle_branch: "",
        fc_due: "",
        vehicle_type: "",
        vehicle_company: "",
        bata_for_km: "",
        bata_for_trip: "",
        incentive_for_km: "",
        incentive_for_trip: "",
        no_of_gas_cylinder: "",
        vehicle_agency_short: "",
        vehicle_driver: "",
        vehicle_hsd: "",
        vehicle_open_km: "",
        tyre_assign_1_front_left_no: "",
        tyre_assign_1_front_left_date: todayback,
        tyre_assign_1_front_left_km: "",
        tyre_assign_2_front_right_no: "",
        tyre_assign_2_front_right_date: todayback,
        tyre_assign_2_front_right_km: "",
        tyre_assign_3_back_left_no: "",
        tyre_assign_3_back_left_date: todayback,
        tyre_assign_3_back_left_km: "",
        tyre_assign_4_back_left_no: "",
        tyre_assign_4_back_left_date: todayback,
        tyre_assign_4_back_left_km: "",
        tyre_assign_5_back_right_no: "",
        tyre_assign_5_back_right_date: todayback,
        tyre_assign_5_back_right_km: "",
        tyre_assign_6_back_right_no: "",
        tyre_assign_6_back_right_date: todayback,
        tyre_assign_6_back_right_km: "",
        tyre_assign_3_back_housing_left_no: "",
        tyre_assign_3_back_housing_left_date: todayback,
        tyre_assign_3_back_housing_left_km: "",
        tyre_assign_4_back_housing_left_no: "",
        tyre_assign_4_back_housing_left_date: todayback,
        tyre_assign_4_back_housing_left_km: "",
        tyre_assign_5_back_dummy_left_no: "",
        tyre_assign_5_back_dummy_left_date: todayback,
        tyre_assign_5_back_dummy_left_km: "",
        tyre_assign_6_back_dummy_left_no: "",
        tyre_assign_6_back_dummy_left_date: todayback,
        tyre_assign_6_back_dummy_left_km: "",
        tyre_assign_7_back_housing_right_no: "",
        tyre_assign_7_back_housing_right_date: todayback,
        tyre_assign_7_back_housing_right_km: "",
        tyre_assign_8_back_housing_right_no: "",
        tyre_assign_8_back_housing_right_date: todayback,
        tyre_assign_8_back_housing_right_km: "",
        tyre_assign_9_back_dummy_right_no: "",
        tyre_assign_9_back_dummy_right_date: todayback,
        tyre_assign_9_back_dummy_right_km: "",
        tyre_assign_10_back_dummy_right_no: "",
        tyre_assign_10_back_dummy_right_date: "",
        tyre_assign_10_back_dummy_right_km: "",
        tyre_assign_stepney_no: "",
        tyre_assign_stepney_date: "",
        tyre_assign_stepney_km: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-[#142747]">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClassSelect =
    "w-full h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100";
  const inputClass =
    "w-full h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

  const TyreAssignmentBlock = ({ label, noName, dateName, kmName }) => (
    <div className="col-span-full grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-3">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#142747]">
          {label}
        </label>
        <Select
          name={noName}
          options={tyre.map((option) => ({
            value: option.tyre_sub_no,
            label: option.tyre_sub_no,
            name: noName,
          }))}
          onChange={(e) => onInputChange(e)}
          value={
            vehicles[noName]
              ? {
                  value: vehicles[noName],
                  label: vehicles[noName],
                }
              : null
          }
          placeholder="Select Tyre"
          styles={customStyles}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#142747]">Date</label>
        <input
          type="date"
          name={dateName}
          value={vehicles[dateName]}
          onChange={(e) => onInputChange(e)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#142747]">KM</label>
        <input
          type="number"
          name={kmName}
          value={vehicles[kmName]}
          onChange={(e) => onInputChange(e)}
          className={inputClass}
        />
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="min-h-screen rounded-2xl bg-slate-50/70 p-3 sm:p-5">
        <div className="sticky top-0 z-20 mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-[#F56616]">
                <IconInfoCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0A1F44]">Add Tyre</h2>
                <p className="mt-0.5 text-xs text-slate-500">Assign tyres and record their fitting details</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/vehicles-list")}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#142747] bg-[#142747] px-4 text-sm font-semibold text-white transition hover:bg-[#0A1F44]"
            >
              <IconArrowBack className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full max-w-7xl space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <section className="rounded-xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-5 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#0A1F44]">Vehicle Details</h3>
              <p className="mt-1 text-xs text-slate-500">Select a vehicle to load its registered information</p>
            </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Register No  */}
            <div>
              <FormLabel>Register No</FormLabel>
              <Select
                name="reg_no"
                options={vehiclesReg.map((option) => ({
                  value: option.reg_no,
                  label: option.reg_no,
                  name: "reg_no",
                }))}
                onChange={(e) => onInputChange(e)}
                value={
                  vehicles.reg_no
                    ? {
                        value: vehicles.reg_no,
                        label: vehicles.reg_no,
                      }
                    : null
                }
                placeholder="Select Registor No"
                styles={customStyles}
                isSearchable={true}
              />
            </div>

            {/* company  */}

            <div>
              <FormLabel required>Company</FormLabel>
              <input
                type="text"
                name="vehicle_company"
                value={vehicles.vehicle_company}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed  `}
                required
                disabled
              />
            </div>
            {/* Brand(Hp/Ioc)  */}

            <div>
              <FormLabel>Brand(Hp/Ioc)</FormLabel>
              <input
                type="text"
                name="vehicle_agency_short"
                value={vehicles.vehicle_agency_short}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed  `}
                disabled
              />
            </div>

            {/* vechile type  */}

            <div>
              <FormLabel required>Vehicle Type</FormLabel>
              <input
                type="text"
                name="vehicle_type"
                value={vehicles.vehicle_type}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed  `}
                required
                disabled
              />
            </div>

            {/* branch  */}
            <div>
              <FormLabel required>Branch</FormLabel>
              <input
                type="text"
                name="vehicle_branch"
                value={vehicles.vehicle_branch}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed  `}
                required
                disabled
              />
            </div>

            {/* driver  */}
            <div>
              <FormLabel>Driver</FormLabel>
              <input
                type="text"
                name="vehicle_driver"
                value={vehicles.vehicle_driver}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed  `}
                disabled
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
                className={`${inputClass} cursor-not-allowed  `}
                required
                disabled
              />
            </div>
            {/* Fixed HSD  */}
            <div>
              <FormLabel>Fixed HSD</FormLabel>
              <input
                type="tel"
                name="vehicle_hsd"
                value={vehicles.vehicle_hsd}
                onChange={(e) => onInputChange(e)}
                className={`${inputClass} cursor-not-allowed  `}
                disabled
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
                className={`${inputClass} cursor-not-allowed  `}
                required
                disabled
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
                className={`${inputClass} cursor-not-allowed  `}
                disabled
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
                disabled
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
                className={`${inputClass} cursor-not-allowed  `}
                disabled
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
                className={`${inputClass} cursor-not-allowed  `}
                disabled
              />
            </div>
          </div>
          </section>

          <div className="hidden">
            {/* bata for km  */}
            <div>
              <FormLabel>Bata For KM</FormLabel>
              <input
                type="tel"
                name="bata_for_km"
                value={vehicles.bata_for_km}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Bata For Trip  */}
            <div>
              <FormLabel>Bata For Trip</FormLabel>
              <input
                type="tel"
                name="bata_for_trip"
                value={vehicles.bata_for_trip}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/*Incentive For KM  */}
            <div>
              <FormLabel>Incentive For KM</FormLabel>
              <input
                type="tel"
                name="incentive_for_km"
                value={vehicles.incentive_for_km}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Incentive For Trip  */}
            <div>
              <FormLabel>Incentive For Trip</FormLabel>
              <input
                type="tel"
                name="incentive_for_trip"
                value={vehicles.incentive_for_trip}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
          </div>

          {vehicles.vehicle_type !== "Other" && (
            <section className="rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="mb-5 border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-[#0A1F44]">Tyre Assignment</h3>
                <p className="mt-1 text-xs text-slate-500">Choose the tyre number and enter fitting date and kilometre reading for each position</p>
              </div>
            <div className="col-span-full">
              {/* 1.front left */}
              <div className="col-span-full grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    1. Front Left
                  </label>
                  <Select
                    name="tyre_assign_1_front_left_no"
                    options={tyre.map((option) => ({
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: "tyre_assign_1_front_left_no",
                    }))}
                    onChange={(e) => onInputChange(e)}
                    value={
                      vehicles.tyre_assign_1_front_left_no
                        ? {
                            value: vehicles.tyre_assign_1_front_left_no,
                            label: vehicles.tyre_assign_1_front_left_no,
                          }
                        : null
                    }
                    placeholder="Select Tyre"
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="tyre_assign_1_front_left_date"
                    value={vehicles.tyre_assign_1_front_left_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    KM
                  </label>
                  <input
                    type="tel"
                    name="tyre_assign_1_front_left_km"
                    value={vehicles.tyre_assign_1_front_left_km}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* 2 front right  */}
              <div className="col-span-full grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    2. Front Right
                  </label>
                  <Select
                    name="tyre_assign_2_front_right_no"
                    options={tyre.map((option) => ({
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: "tyre_assign_2_front_right_no",
                    }))}
                    onChange={(e) => onInputChange(e)}
                    value={
                      vehicles.tyre_assign_2_front_right_no
                        ? {
                            value: vehicles.tyre_assign_2_front_right_no,
                            label: vehicles.tyre_assign_2_front_right_no,
                          }
                        : null
                    }
                    placeholder="Select Tyre"
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="tyre_assign_2_front_right_date"
                    value={vehicles.tyre_assign_2_front_right_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    KM
                  </label>
                  <input
                    type="tel"
                    name="tyre_assign_2_front_right_km"
                    value={vehicles.tyre_assign_2_front_right_km}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>
              </div>
              {vehicles.vehicle_type === "Car" && (
                <>
                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        3. Back Left
                      </label>
                      <Select
                        name="tyre_assign_3_back_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_3_back_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_3_back_left_no
                            ? {
                                value: vehicles.tyre_assign_3_back_left_no,
                                label: vehicles.tyre_assign_3_back_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_3_back_left_date"
                        value={vehicles.tyre_assign_3_back_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_3_back_left_km"
                        value={vehicles.tyre_assign_3_back_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        4. Back Right
                      </label>
                      <Select
                        name="tyre_assign_5_back_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_5_back_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_5_back_right_no
                            ? {
                                value: vehicles.tyre_assign_5_back_right_no,
                                label: vehicles.tyre_assign_5_back_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_5_back_right_date"
                        value={vehicles.tyre_assign_5_back_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_5_back_right_km"
                        value={vehicles.tyre_assign_5_back_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}
              {vehicles.vehicle_type === "6W Truck" && (
                <>
                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        3. Back Left
                      </label>
                      <Select
                        name="tyre_assign_3_back_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_3_back_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_3_back_left_no
                            ? {
                                value: vehicles.tyre_assign_3_back_left_no,
                                label: vehicles.tyre_assign_3_back_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_3_back_left_date"
                        value={vehicles.tyre_assign_3_back_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_3_back_left_km"
                        value={vehicles.tyre_assign_3_back_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        4. Back Left
                      </label>
                      <Select
                        name="tyre_assign_4_back_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_4_back_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_4_back_left_no
                            ? {
                                value: vehicles.tyre_assign_4_back_left_no,
                                label: vehicles.tyre_assign_4_back_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_4_back_left_date"
                        value={vehicles.tyre_assign_4_back_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_4_back_left_km"
                        value={vehicles.tyre_assign_4_back_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        5. Back Right
                      </label>
                      <Select
                        name="tyre_assign_5_back_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_5_back_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_5_back_right_no
                            ? {
                                value: vehicles.tyre_assign_5_back_right_no,
                                label: vehicles.tyre_assign_5_back_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_5_back_right_date"
                        value={vehicles.tyre_assign_5_back_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_5_back_right_km"
                        value={vehicles.tyre_assign_5_back_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        6. Back Right
                      </label>
                      <Select
                        name="tyre_assign_6_back_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_6_back_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_6_back_right_no
                            ? {
                                value: vehicles.tyre_assign_6_back_right_no,
                                label: vehicles.tyre_assign_6_back_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_6_back_right_date"
                        value={vehicles.tyre_assign_6_back_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_6_back_right_km"
                        value={vehicles.tyre_assign_6_back_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* 10W Truck Back Tyres */}
              {vehicles.vehicle_type === "10W Truck" && (
                <>
                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        3. Back Housing Left
                      </label>
                      <Select
                        name="tyre_assign_3_back_housing_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_3_back_housing_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_3_back_housing_left_no
                            ? {
                                value:
                                  vehicles.tyre_assign_3_back_housing_left_no,
                                label:
                                  vehicles.tyre_assign_3_back_housing_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_3_back_housing_left_date"
                        value={vehicles.tyre_assign_3_back_housing_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_3_back_housing_left_km"
                        value={vehicles.tyre_assign_3_back_housing_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        4. Back Housing Left
                      </label>
                      <Select
                        name="tyre_assign_4_back_housing_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_4_back_housing_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_4_back_housing_left_no
                            ? {
                                value:
                                  vehicles.tyre_assign_4_back_housing_left_no,
                                label:
                                  vehicles.tyre_assign_4_back_housing_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_4_back_housing_left_date"
                        value={vehicles.tyre_assign_4_back_housing_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_4_back_housing_left_km"
                        value={vehicles.tyre_assign_4_back_housing_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        5. Back Dummy Left
                      </label>
                      <Select
                        name="tyre_assign_5_back_dummy_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_5_back_dummy_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_5_back_dummy_left_no
                            ? {
                                value:
                                  vehicles.tyre_assign_5_back_dummy_left_no,
                                label:
                                  vehicles.tyre_assign_5_back_dummy_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_5_back_dummy_left_date"
                        value={vehicles.tyre_assign_5_back_dummy_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_5_back_dummy_left_km"
                        value={vehicles.tyre_assign_5_back_dummy_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        6. Back Dummy Left
                      </label>
                      <Select
                        name="tyre_assign_6_back_dummy_left_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_6_back_dummy_left_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_6_back_dummy_left_no
                            ? {
                                value:
                                  vehicles.tyre_assign_6_back_dummy_left_no,
                                label:
                                  vehicles.tyre_assign_6_back_dummy_left_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_6_back_dummy_left_date"
                        value={vehicles.tyre_assign_6_back_dummy_left_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_6_back_dummy_left_km"
                        value={vehicles.tyre_assign_6_back_dummy_left_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        7. Back Housing Right
                      </label>
                      <Select
                        name="tyre_assign_7_back_housing_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_7_back_housing_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_7_back_housing_right_no
                            ? {
                                value:
                                  vehicles.tyre_assign_7_back_housing_right_no,
                                label:
                                  vehicles.tyre_assign_7_back_housing_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_7_back_housing_right_date"
                        value={vehicles.tyre_assign_7_back_housing_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_7_back_housing_right_km"
                        value={vehicles.tyre_assign_7_back_housing_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        8. Back Housing Right
                      </label>
                      <Select
                        name="tyre_assign_8_back_housing_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_8_back_housing_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_8_back_housing_right_no
                            ? {
                                value:
                                  vehicles.tyre_assign_8_back_housing_right_no,
                                label:
                                  vehicles.tyre_assign_8_back_housing_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_8_back_housing_right_date"
                        value={vehicles.tyre_assign_8_back_housing_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_8_back_housing_right_km"
                        value={vehicles.tyre_assign_8_back_housing_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        9. Back Dummy Right
                      </label>
                      <Select
                        name="tyre_assign_9_back_dummy_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_9_back_dummy_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_9_back_dummy_right_no
                            ? {
                                value:
                                  vehicles.tyre_assign_9_back_dummy_right_no,
                                label:
                                  vehicles.tyre_assign_9_back_dummy_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_9_back_dummy_right_date"
                        value={vehicles.tyre_assign_9_back_dummy_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_9_back_dummy_right_km"
                        value={vehicles.tyre_assign_9_back_dummy_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="col-span-full grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        10. Back Dummy Right
                      </label>
                      <Select
                        name="tyre_assign_10_back_dummy_right_no"
                        options={tyre.map((option) => ({
                          value: option.tyre_sub_no,
                          label: option.tyre_sub_no,
                          name: "tyre_assign_10_back_dummy_right_no",
                        }))}
                        onChange={(e) => onInputChange(e)}
                        value={
                          vehicles.tyre_assign_10_back_dummy_right_no
                            ? {
                                value:
                                  vehicles.tyre_assign_10_back_dummy_right_no,
                                label:
                                  vehicles.tyre_assign_10_back_dummy_right_no,
                              }
                            : null
                        }
                        placeholder="Select Tyre"
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        Date
                      </label>
                      <input
                        type="date"
                        name="tyre_assign_10_back_dummy_right_date"
                        value={vehicles.tyre_assign_10_back_dummy_right_date}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#142747]">
                        KM
                      </label>
                      <input
                        type="tel"
                        name="tyre_assign_10_back_dummy_right_km"
                        value={vehicles.tyre_assign_10_back_dummy_right_km}
                        onChange={(e) => onInputChange(e)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="col-span-full grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    Stepney tyre
                  </label>
                  <Select
                    name="tyre_assign_stepney_no"
                    options={tyre.map((option) => ({
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: "tyre_assign_stepney_no",
                    }))}
                    onChange={(e) => onInputChange(e)}
                    value={
                      vehicles.tyre_assign_stepney_no
                        ? {
                            value: vehicles.tyre_assign_stepney_no,
                            label: vehicles.tyre_assign_stepney_no,
                          }
                        : null
                    }
                    placeholder="Select Tyre"
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="tyre_assign_stepney_date"
                    value={vehicles.tyre_assign_stepney_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#142747]">
                    KM
                  </label>
                  <input
                    type="tel"
                    name="tyre_assign_stepney_km"
                    value={vehicles.tyre_assign_stepney_km}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            </section>
          )}

          {/* Form Actions */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="submit"
              className="inline-flex h-11 min-w-36 items-center justify-center rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Sumbitting..." : "Sumbit"}
            </button>

            <button
              type="button"
              className="inline-flex h-11 min-w-36 items-center justify-center rounded-xl border border-[#142747] bg-[#142747] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A1F44]"
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

export default AddTyre;
