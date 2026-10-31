import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";

const ChangeTyre = () => {
  const navigate = useNavigate();

  // State Management
  const [tyre, setTyre] = useState({});
  const [tyrePosition, setTyrePosition] = useState("");
  const [loader, setLoader] = useState(true);
  const [tyres, setTyres] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const vechileId = localStorage.getItem("vechile_view");
  const [vehicles, setVehicles] = useState({
    tyre_assign_position: localStorage.getItem("tyre_position") || "",
    tyre_assign_no: "",
    tyre_assign_date: "",
    tyre_assign_km: "",
    tyre_assign_pre_km: "",
  });

  // Utility Functions
  const validateOnlyDigits = (input) => {
    const digitRegex = /^\d+$/;
    return digitRegex.test(input) || input.length === 0;
  };

  // Input Change Handler
  const onInputChange = useCallback((e) => {
    const { name, value } = e.target || e;

    if (name === "tyre_assign_no") {
      setVehicles((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === "tyre_assign_km" || name === "tyre_assign_pre_km") {
      if (validateOnlyDigits(value)) {
        setVehicles((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setVehicles((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // Fetch Tyre Details
  const fetchTyreDetails = useCallback(async () => {
    try {
      const tyre_sub_id = localStorage.getItem("tyre_sub_id");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-tyre-sub-by-id/${tyre_sub_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTyre(response.data.vehiceltyresub);
      setTyrePosition(localStorage.getItem("tyre_position"));
      setLoader(false);
    } catch (error) {
      console.error("Error fetching tyre details", error);
      setLoader(false);
    }
  }, []);

  // Fetch Available Tyres
  const fetchTyres = useCallback(async () => {
    try {
      const vehicle_branch = localStorage.getItem("vehicle_branch");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-by-branch/${vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTyres(response.data.tyre);
    } catch (error) {
      console.error("Error fetching tyres", error);
    }
  }, []);

  // Authentication Check and Data Fetching
  useEffect(() => {
    fetchTyreDetails();
    fetchTyres();
  }, [fetchTyreDetails, fetchTyres, navigate]);

  // Update Tyre Details
  const onUpdate = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      setIsButtonDisabled(false);
      return;
    }
    const data = {
      tyre_assign_position: localStorage.getItem("tyre_position"),
      tyre_assign_no: vehicles.tyre_assign_no,
      tyre_assign_date: vehicles.tyre_assign_date,
      tyre_assign_km: vehicles.tyre_assign_km,
      tyre_assign_pre_km: vehicles.tyre_assign_pre_km,
    };

    try {
      setIsButtonDisabled(true);
      const tyre_sub_id = localStorage.getItem("tyre_sub_id");

      const response = await axios.put(
        `${BASE_URL}/api/web-update-vehicle-tyre/${tyre_sub_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Tyre Updated Successfully");
        navigate(`/vechile-view/${vechileId}`);
      } else {
        toast.error("Duplicate Entry");
      }
    } catch (error) {
      console.error("Error updating tyre", error);
      toast.error("Error updating tyre");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  // Dynamic Tyre Position Rendering
  const renderTyrePositionDetails = () => {
    const positionMappings = {
      tyre_assign_1_front_left_no: {
        position: "1. Front Left",
        number: tyre.tyre_assign_1_front_left_no,
        date: tyre.tyre_assign_1_front_left_date,
        km: tyre.tyre_assign_1_front_left_km,
        preKm: tyre.tyre_assign_1_front_left_pre_km,
        status: tyre.tyre_assign_1_front_left_status,
      },
      tyre_assign_2_front_right_no: {
        position: "2. Front Right",
        number: tyre.tyre_assign_2_front_right_no,
        date: tyre.tyre_assign_2_front_right_date,
        km: tyre.tyre_assign_2_front_right_km,
        preKm: tyre.tyre_assign_2_front_right_pre_km,
        status: tyre.tyre_assign_2_front_right_status,
      },
      tyre_assign_3_back_left_no: {
        position: "3. Back Left",
        number: tyre.tyre_assign_3_back_left_no,
        date: tyre.tyre_assign_3_back_left_date,
        km: tyre.tyre_assign_3_back_left_km,
        preKm: tyre.tyre_assign_3_back_left_pre_km,
        status: tyre.tyre_assign_3_back_left_status,
      },
      tyre_assign_4_back_left_no: {
        position: "4. Back Left",
        number: tyre.tyre_assign_4_back_left_no,
        date: tyre.tyre_assign_4_back_left_date,
        km: tyre.tyre_assign_4_back_left_km,
        preKm: tyre.tyre_assign_4_back_left_pre_km,
        status: tyre.tyre_assign_4_back_left_status,
      },
      tyre_assign_5_back_right_no: {
        position: "5. Back Right",
        number: tyre.tyre_assign_5_back_right_no,
        date: tyre.tyre_assign_5_back_right_date,
        km: tyre.tyre_assign_5_back_right_km,
        preKm: tyre.tyre_assign_5_back_right_pre_km,
        status: tyre.tyre_assign_5_back_right_status,
      },
      tyre_assign_6_back_right_no: {
        position: "6. Back Right",
        number: tyre.tyre_assign_6_back_right_no,
        date: tyre.tyre_assign_6_back_right_date,
        km: tyre.tyre_assign_6_back_right_km,
        preKm: tyre.tyre_assign_6_back_right_pre_km,
        status: tyre.tyre_assign_6_back_right_status,
      },
      // 10W truck
      tyre_assign_3_back_housing_left_no: {
        position: "3. Back Housing Left",
        number: tyre.tyre_assign_3_back_housing_left_no,
        date: tyre.tyre_assign_3_back_housing_left_date,
        km: tyre.tyre_assign_3_back_housing_left_km,
        preKm: tyre.tyre_assign_3_back_housing_left_pre_km,
        status: tyre.tyre_assign_3_back_housing_left_status,
      },
      tyre_assign_4_back_housing_left_no: {
        position: "4. Back Housing Left",
        number: tyre.tyre_assign_4_back_housing_left_no,
        date: tyre.tyre_assign_4_back_housing_left_date,
        km: tyre.tyre_assign_4_back_housing_left_km,
        preKm: tyre.tyre_assign_4_back_housing_left_pre_km,
        status: tyre.tyre_assign_4_back_housing_left_status,
      },
      tyre_assign_5_back_dummy_left_no: {
        position: "5. Back Dummy Left",
        number: tyre.tyre_assign_5_back_dummy_left_no,
        date: tyre.tyre_assign_5_back_dummy_left_date,
        km: tyre.tyre_assign_5_back_dummy_left_km,
        preKm: tyre.tyre_assign_5_back_dummy_left_pre_km,
        status: tyre.tyre_assign_5_back_dummy_left_status,
      },
      tyre_assign_6_back_dummy_left_no: {
        position: "6. Back Dummy Left",
        number: tyre.tyre_assign_6_back_dummy_left_no,
        date: tyre.tyre_assign_6_back_dummy_left_date,
        km: tyre.tyre_assign_6_back_dummy_left_km,
        preKm: tyre.tyre_assign_6_back_dummy_left_pre_km,
        status: tyre.tyre_assign_6_back_dummy_left_status,
      },
      tyre_assign_7_back_housing_right_no: {
        position: "7. Back Housing Right",
        number: tyre.tyre_assign_7_back_housing_right_no,
        date: tyre.tyre_assign_7_back_housing_right_date,
        km: tyre.tyre_assign_7_back_housing_right_km,
        preKm: tyre.tyre_assign_7_back_housing_right_pre_km,
        status: tyre.tyre_assign_7_back_housing_right_status,
      },
      tyre_assign_8_back_housing_right_no: {
        position: "8. Back Housing Right",
        number: tyre.tyre_assign_8_back_housing_right_no,
        date: tyre.tyre_assign_8_back_housing_right_date,
        km: tyre.tyre_assign_8_back_housing_right_km,
        preKm: tyre.tyre_assign_8_back_housing_right_pre_km,
        status: tyre.tyre_assign_8_back_housing_right_status,
      },
      tyre_assign_9_back_dummy_right_no: {
        position: "9. Back Dummy Right",
        number: tyre.tyre_assign_9_back_dummy_right_no,
        date: tyre.tyre_assign_9_back_dummy_right_date,
        km: tyre.tyre_assign_9_back_dummy_right_km,
        preKm: tyre.tyre_assign_9_back_dummy_right_pre_km,
        status: tyre.tyre_assign_9_back_dummy_right_status,
      },
      tyre_assign_10_back_dummy_right_no: {
        position: "10. Back Dummy Right",
        number: tyre.tyre_assign_10_back_dummy_right_no,
        date: tyre.tyre_assign_10_back_dummy_right_date,
        km: tyre.tyre_assign_10_back_dummy_right_km,
        preKm: tyre.tyre_assign_10_back_dummy_right_pre_km,
        status: tyre.tyre_assign_10_back_dummy_right_status,
      },
    };

    const positionDetails = positionMappings[tyrePosition];

    return positionDetails ? (
      <tr className="bg-orange-50/70 border-b border-orange-200 text-slate-800 font-semibold">
        <td className="border border-slate-200 p-2.5 text-center text-xs">{positionDetails.position}</td>
        <td className="border border-slate-200 p-2.5 text-center text-xs">{positionDetails.number}</td>
        <td className="border border-slate-200 p-2.5 text-center text-xs">{moment(positionDetails.date).format("DD-MM-YYYY")}</td>
        <td className="border border-slate-200 p-2.5 text-center text-xs">{positionDetails.km}</td>
        <td className="border border-slate-200 p-2.5 text-center text-xs">{positionDetails.preKm}</td>
        <td className="border border-slate-200 p-2.5 text-center text-xs">{positionDetails.status}</td>
      </tr>
    ) : null;
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

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-[#F56616] ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full h-[42px] rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100";

  // Loader Component
  const Loader = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F56616]"></div>
    </div>
  );

  return (
    <Layout>
      <div className="w-full space-y-4">
        {loader ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-5">
            {/* Page Header */}
            <div className="flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
                  <IconInfoCircle size={22} stroke={1.8} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Change Tyres
                  </h2>
                  <p className="text-xs text-slate-300">
                    Vehicle: {localStorage.getItem("vehicle_no") || "Vehicle"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/vechile-view/${vechileId}`)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
                title="Go Back"
              >
                <IconArrowBack size={21} />
              </button>
            </div>

            {/* Current Position Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Current Position Details
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#0A1D3D] text-white">
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Position</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Tyre No</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Date</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">KM</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Present KM</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>{renderTyrePositionDetails()}</tbody>
                </table>
              </div>
            </div>

            {/* Update Form */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                Assign Replacement Tyre
              </h3>
              <form id="addIndiv" onSubmit={onUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tyre No Select */}
                  <div>
                    <FormLabel required>Tyre No</FormLabel>
                    <Select
                      name="tyre_assign_no"
                      options={tyres.map((option) => ({
                        value: option.tyre_sub_no,
                        label: option.tyre_sub_no,
                        name: "tyre_assign_no",
                      }))}
                      placeholder="Select Tyre"
                      onChange={onInputChange}
                      value={
                        vehicles.tyre_assign_no
                          ? {
                              value: vehicles.tyre_assign_no,
                              label: vehicles.tyre_assign_no,
                            }
                          : null
                      }
                      styles={customStyles}
                      required
                    />
                  </div>

                  {/* Date Input */}
                  <div>
                    <FormLabel required>Date</FormLabel>
                    <input
                      type="date"
                      name="tyre_assign_date"
                      value={vehicles.tyre_assign_date}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* KM Input */}
                  <div>
                    <FormLabel required>KM</FormLabel>
                    <input
                      type="text"
                      name="tyre_assign_km"
                      value={vehicles.tyre_assign_km}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                      placeholder="Enter KM"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/vechile-view/${vechileId}`)}
                    className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className="h-10 rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E85B0B] disabled:opacity-50"
                  >
                    Update Tyre
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChangeTyre;