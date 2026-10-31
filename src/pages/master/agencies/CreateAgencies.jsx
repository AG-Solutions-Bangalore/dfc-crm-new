
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";

const CreateAgencies = () => {
  const navigate = useNavigate();

  const [agency, setAgency] = useState({
    agency_short: "",
    agency_name: "",
    agency_contact_person: "",
    agency_mobile: "",
    agency_email: "",
    agency_rt_km: "",
    agency_city: "",
    agency_state: "",
    agency_branch: "",
    agency_bata_for_trip_6W: "",
    agency_bata_for_trip_10W: "",
    agency_hmali: "",
    agency_hmali_10W: "",
    agency_mileage_for_trip_6W: "",
    agency_mileage_for_trip_10W: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [branch, setBranch] = useState([]);

  const fetchState = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-state`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setState(response.data?.state);
    } catch (error) {
      console.error("Error fetching  Agesncy crete state data", error);
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
      console.error("Error fetching  create agency branch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
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

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "agency_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_hmali") {
      if (validateOnlyDigits(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_hmali_10W") {
      if (validateOnlyDigits(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_bata_for_trip_6W") {
      if (validateOnlyNumber(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_bata_for_trip_10W") {
      if (validateOnlyNumber(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_rt_km") {
      if (validateOnlyDigits(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_mileage_for_trip_6W") {
      if (validateOnlyDigits(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "agency_mileage_for_trip_10W") {
      if (validateOnlyDigits(e.target.value)) {
        setAgency({
          ...agency,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setAgency({
        ...agency,
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

    const data = {
      agency_short: agency.agency_short,
      agency_name: agency.agency_name,
      agency_contact_person: agency.agency_contact_person,
      agency_mobile: agency.agency_mobile,
      agency_email: agency.agency_email,
      agency_rt_km: agency.agency_rt_km,
      agency_city: agency.agency_city,
      agency_state: agency.agency_state,
      agency_branch: agency.agency_branch,
      agency_bata_for_trip_6W: agency.agency_bata_for_trip_6W,
      agency_bata_for_trip_10W: agency.agency_bata_for_trip_10W,
      agency_hmali: agency.agency_hmali,
      agency_hmali_10W: agency.agency_hmali_10W,
      agency_mileage_for_trip_6W: agency.agency_mileage_for_trip_6W,
      agency_mileage_for_trip_10W: agency.agency_mileage_for_trip_10W,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-agencies",
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
      navigate("/master/agencies-list");
      setAgency({
        agency_short: "",
        agency_name: "",
        agency_contact_person: "",
        agency_mobile: "",
        agency_email: "",
        agency_rt_km: "",
        agency_city: "",
        agency_state: "",
        agency_branch: "",
        agency_bata_for_trip_6W: "",
        agency_bata_for_trip_10W: "",
        agency_hmali: "",
        agency_hmali_10W: "",
        agency_mileage_for_trip_6W: "",
        agency_mileage_for_trip_10W: "",
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
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const Section = ({ title, description, children }) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-[#142747]">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </section>
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
                  Add Agency
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add agency details, contact information and trip rates
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/master/agencies-list")}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#142747] transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#F56616]"
            >
              <IconArrowBack size={18} />
              Back to Agencies
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full space-y-6"
        >
          {/* Agency Information */}
          <Section
            title="Agency Information"
            description="Enter the agency brand and primary contact details"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <FormLabel required>Brand (HP/IOC)</FormLabel>
                <input
                  type="text"
                  name="agency_short"
                  value={agency.agency_short}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                  placeholder="Enter brand"
                />
              </div>

              <div className="md:col-span-1 xl:col-span-2">
                <FormLabel required>Agency Name</FormLabel>
                <input
                  type="text"
                  name="agency_name"
                  value={agency.agency_name}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                  placeholder="Enter agency name"
                />
              </div>

              <div>
                <FormLabel required>Contact Name</FormLabel>
                <input
                  type="text"
                  name="agency_contact_person"
                  value={agency.agency_contact_person}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                  placeholder="Enter contact person name"
                />
              </div>

              <div>
                <FormLabel>Contact Mobile</FormLabel>
                <input
                  type="tel"
                  name="agency_mobile"
                  value={agency.agency_mobile}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  maxLength={10}
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <FormLabel>Contact Email</FormLabel>
                <input
                  type="email"
                  name="agency_email"
                  value={agency.agency_email}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <FormLabel required>Branch</FormLabel>
                <select
                  name="agency_branch"
                  value={agency.agency_branch}
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
                <FormLabel>City</FormLabel>
                <input
                  type="text"
                  name="agency_city"
                  value={agency.agency_city}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <FormLabel>State</FormLabel>
                <select
                  name="agency_state"
                  value={agency.agency_state}
                  onChange={(e) => onInputChange(e)}
                  className={selectClass}
                >
                  <option value="">Select State</option>
                  {state.map((option) => (
                    <option key={option.state} value={option.state}>
                      {option.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          {/* Trip Rates */}
          <Section
            title="Trip Rates & Mileage"
            description="Configure trip bata, running distance and mileage rates"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <FormLabel>RT KM</FormLabel>
                <input
                  type="tel"
                  name="agency_rt_km"
                  value={agency.agency_rt_km}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter RT KM"
                />
              </div>

              <div>
                <FormLabel>Bata for Trip 6W</FormLabel>
                <input
                  type="tel"
                  name="agency_bata_for_trip_6W"
                  value={agency.agency_bata_for_trip_6W}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter 6W bata"
                />
              </div>

              <div>
                <FormLabel>Bata for Trip 10W</FormLabel>
                <input
                  type="tel"
                  name="agency_bata_for_trip_10W"
                  value={agency.agency_bata_for_trip_10W}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter 10W bata"
                />
              </div>

              <div>
                <FormLabel>Hamali for 6W</FormLabel>
                <input
                  type="tel"
                  name="agency_hmali"
                  value={agency.agency_hmali}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter 6W hamali"
                />
              </div>

              <div>
                <FormLabel>Hamali for 10W</FormLabel>
                <input
                  type="tel"
                  name="agency_hmali_10W"
                  value={agency.agency_hmali_10W}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter 10W hamali"
                />
              </div>

              <div>
                <FormLabel>Mileage for Trip 6W</FormLabel>
                <input
                  type="tel"
                  name="agency_mileage_for_trip_6W"
                  value={agency.agency_mileage_for_trip_6W}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter 6W mileage"
                />
              </div>

              <div>
                <FormLabel>Mileage for Trip 10W</FormLabel>
                <input
                  type="tel"
                  name="agency_mileage_for_trip_10W"
                  value={agency.agency_mileage_for_trip_10W}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter 10W mileage"
                />
              </div>
            </div>
          </Section>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <button
              type="button"
              className={BackButton}
              onClick={() => {
                navigate("/master/agencies-list");
              }}
            >
              Back
            </button>

            <button
              type="submit"
              className={CreateButton}
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

export default CreateAgencies;
