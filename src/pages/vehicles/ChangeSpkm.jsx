import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import moment from "moment/moment";

const ChangeSpkm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tyre, setTyre] = useState({});
  const [vehicles, setVehicles] = useState({
    service_sub_pre_km: "",
  });
  const [loader, setLoader] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const spkmId = localStorage.getItem("spkmId");

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name === "service_sub_pre_km") {
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

  // Fetch spkm Details
  useEffect(() => {
    const fetchSpkmDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/fetch-vehicle-serviceSub-id/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTyre(response.data.serviceSub);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching spkm details:", error);
        setLoader(false);
      }
    };

    fetchSpkmDetails();
  }, [id]);

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
      service_sub_pre_km: vehicles.service_sub_pre_km,
    };

    try {
      setIsButtonDisabled(true);

      const response = await axios.put(
        `${BASE_URL}/api/web-update-service-pkm/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Service Present Km Updated Successfully");
        navigate(`/truckdetails-viewall/${spkmId}`);
      } else {
        toast.error("Duplicate Entry");
      }
    } catch (error) {
      console.error("Error spkm ", error);
      toast.error("Error spkm ");
    } finally {
      setIsButtonDisabled(false);
    }
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
                    Change Service Present KM
                  </h2>
                  <p className="text-xs text-slate-300">
                    Service Record: {tyre?.service_sub_type || "Service"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/truckdetails-viewall/${spkmId}`)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
                title="Go Back"
              >
                <IconArrowBack size={21} />
              </button>
            </div>

            {/* Service Details Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Current Service Details
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#0A1D3D] text-white">
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Services</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Date</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">KM</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Present KM</th>
                      <th className="border-b-[3px] border-[#F56616] p-3 text-xs font-bold uppercase tracking-wider text-center">Difference KM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-orange-50/70 border-b border-orange-200 text-slate-800 font-semibold">
                      <td className="border border-slate-200 p-2.5 text-center text-xs">
                        {tyre.service_sub_type}
                      </td>
                      <td className="border border-slate-200 p-2.5 text-center text-xs">
                        {tyre.service_sub_date
                          ? moment(tyre.service_sub_date).format("DD-MMM-YYYY")
                          : ""}
                      </td>
                      <td className="border border-slate-200 p-2.5 text-center text-xs">
                        {tyre.service_sub_km}
                      </td>
                      <td className="border border-slate-200 p-2.5 text-center text-xs">
                        {tyre.service_sub_pre_km}
                      </td>
                      <td className="border border-slate-200 p-2.5 text-center text-xs">
                        {(Number(tyre.service_sub_pre_km) || 0) - (Number(tyre.service_sub_km) || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Update Form */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                Update Present KM Reading
              </h3>
              <form id="addIndiv" onSubmit={onUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Present KM Input */}
                  <div>
                    <FormLabel required>Present KM</FormLabel>
                    <input
                      type="text"
                      name="service_sub_pre_km"
                      value={vehicles.service_sub_pre_km}
                      onChange={onInputChange}
                      className={inputClass}
                      required
                      placeholder="Enter Present KM"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/truckdetails-viewall/${spkmId}`)}
                    className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className="h-10 rounded-xl bg-[#F56616] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E85B0B] disabled:opacity-50"
                  >
                    Update Present KM
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

export default ChangeSpkm;