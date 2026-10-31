import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconFilter } from "@tabler/icons-react";
import { Navigation } from "lucide-react";

const FormTrip = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const firstdate = moment().startOf("month").format("YYYY-MM-DD");
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    trip_from_date: localStorage.getItem("trip_date_from") || firstdate,
    trip_to_date: localStorage.getItem("trip_date_to") || todayback,
    trip_branch: localStorage.getItem("trip_branch") || "",
    trip_driver: localStorage.getItem("trip_driver") || "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [branch, setBranch] = useState([]);
  const [driver, setDriver] = useState([]);

  const fetchBranch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch || []);
    } catch (error) {
      console.error("Error fetching branch data", error);
    }
  };

  const fetchDriver = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-assigning-tripdriver/${trip.trip_branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriver(response.data?.drivers || []);
    } catch (error) {
      console.error("Error fetching Driver data", error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  useEffect(() => {
    if (trip.trip_branch && trip.trip_branch !== "") {
      fetchDriver();
    }
  }, [trip.trip_branch]);

  const onInputChange = (e) => {
    if (e.name === "trip_branch") {
      setTrip({
        ...trip,
        trip_branch: e.value,
      });
    } else if (e.name === "trip_driver") {
      setTrip({
        ...trip,
        trip_driver: e.value,
      });
    } else {
      setTrip({
        ...trip,
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
    localStorage.setItem("trip_date_from", trip.trip_from_date);
    localStorage.setItem("trip_date_to", trip.trip_to_date);
    localStorage.setItem("trip_branch", trip.trip_branch || "");
    localStorage.setItem("trip_driver", trip.trip_driver || "");
    navigate("/trip-list");
  };

  const onClear = (e) => {
    e.preventDefault();
    localStorage.removeItem("trip_date_from");
    localStorage.removeItem("trip_date_to");
    localStorage.removeItem("trip_branch");
    localStorage.removeItem("trip_driver");
    setTrip({
      trip_from_date: firstdate,
      trip_to_date: todayback,
      trip_branch: "",
      trip_driver: "",
    });
    toast.success("Filter Cleared Successfully");
    navigate("/trip-list");
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-[#F56616] ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full h-[42px] rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100";

  return (
    <Layout>
      <div className="w-full space-y-4">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
              <Navigation size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Filter Trips
              </h2>
              <p className="text-xs text-slate-300">
                Specify Date Range, Branch & Driver Criteria
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/trip-list")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
            title="Back to Trip List"
          >
            <IconArrowBack size={21} />
          </button>
        </div>

        {/* FORM CONTAINER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F56616]"></span>
                Trip Selection Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date 1: From */}
                <div>
                  <FormLabel required>From Date</FormLabel>
                  <input
                    type="date"
                    required
                    name="trip_from_date"
                    value={trip.trip_from_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>

                {/* Date 2: To */}
                <div>
                  <FormLabel required>To Date</FormLabel>
                  <input
                    type="date"
                    required
                    name="trip_to_date"
                    value={trip.trip_to_date}
                    onChange={(e) => onInputChange(e)}
                    className={inputClass}
                  />
                </div>

                {/* Branch */}
                <div>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    name="trip_branch"
                    options={branch.map((option) => ({
                      value: option.branch_name,
                      label: option.branch_name,
                      name: "trip_branch",
                    }))}
                    onChange={(e) => onInputChange(e)}
                    value={
                      trip.trip_branch
                        ? {
                            value: trip.trip_branch,
                            label: trip.trip_branch,
                          }
                        : null
                    }
                    placeholder="All Branches"
                    styles={customStyles}
                    isSearchable={true}
                  />
                </div>

                {/* Driver */}
                <div>
                  <FormLabel>Driver</FormLabel>
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
                    placeholder="All Drivers"
                    styles={customStyles}
                    isSearchable={true}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClear}
                className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear Filter
              </button>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="h-10 rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E85B0B] disabled:opacity-50"
              >
                Apply Filter & View Trips
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FormTrip;
