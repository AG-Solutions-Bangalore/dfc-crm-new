
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import { decryptId } from "../../../components/common/EncryptionDecryption";

const status = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const EditServiceType = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const location = useLocation();

  const [serviceTypes, setServiceTypes] = useState({
    service_types: "",
    service_types_status: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Fetch Service Type Details
  const fetchServiceTypeEdit = async () => {
    try {
      setIsButtonDisabled(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-service-types-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServiceTypes(response.data?.serviceTypes || {
        service_types: "",
        service_types_status: "",
      });

    } catch (error) {
      console.error("Error fetching service type data:", error);
      toast.error("Unable to fetch service type details");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchServiceTypeEdit();
  }, []);

  // Input Change
  const onInputChange = (e) => {
    setServiceTypes({
      ...serviceTypes,
      [e.target.name]: e.target.value,
    });
  };

  // Update Service Type
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = document.getElementById("addIndiv");

    if (!form.checkValidity()) {
      toast.error("Fill all required");
      return;
    }

    const data = {
      service_types: serviceTypes.service_types,
      service_types_status: serviceTypes.service_types_status,
    };

    try {
      setIsButtonDisabled(true);

      const res = await axios({
        url: BASE_URL + `/api/web-update-service-types/${decryptedId}`,
        method: "PUT",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.code === 200) {
        toast.success(res.data.msg);
        navigate(`/master/servicetype-list${location?.search}`);
      } else if (res.data.code === 400) {
        toast.error(res.data.msg);
      }

    } catch (error) {
      console.error("Error updating service type:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const inputClass =
    "w-full h-[48px] px-4 text-sm text-[#142747] bg-white border border-slate-200 rounded-xl outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  return (
    <Layout>
      <div className="w-full space-y-4">

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 border border-orange-100">
                <IconInfoCircle
                  size={28}
                  stroke={1.8}
                  className="text-[#F56616]"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-xl md:text-2xl font-bold text-[#0A1F44]">
                    Edit Service Type
                  </h1>

                  <span className="text-[#F56616] font-bold">•</span>

                  <p className="text-sm md:text-base text-[#142747]">
                    Service Types & Configuration
                  </p>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Update service type information and status
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/master/servicetype-list${location?.search}`)
              }
              className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl border border-slate-200 text-[#142747] hover:bg-orange-50 hover:text-[#F56616] transition-all"
              title="Back to Service Type List"
            >
              <IconArrowBack size={22} />
            </button>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

          {/* Form Heading */}
          <div className="px-6 md:px-9 py-6 border-b border-slate-100">

            <h2 className="text-base font-bold text-[#142747]">
              Service Type Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the service type details. Fields marked with
              <span className="text-red-500 font-semibold"> *</span> are required.
            </p>

          </div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            id="addIndiv"
            className="px-6 md:px-9 py-8"
          >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Service Type */}
              <div>

                <label className="block text-sm font-semibold text-[#334155] mb-2">
                  Service Type
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  name="service_types"
                  value={serviceTypes.service_types || ""}
                  className={`${inputClass} cursor-not-allowed bg-slate-50`}
                  required
                  disabled
                />

              </div>

              {/* Status */}
              <div>

                <label className="block text-sm font-semibold text-[#334155] mb-2">
                  Status
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <select
                  name="service_types_status"
                  value={serviceTypes.service_types_status || ""}
                  onChange={onInputChange}
                  required
                  className={`${inputClass} cursor-pointer`}
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

            {/* Form Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-100">

              <button
                type="submit"
                disabled={isButtonDisabled}
                className="min-w-[120px] h-12 px-6 rounded-xl bg-[#F56616] text-white text-sm font-semibold shadow-md shadow-orange-100 hover:bg-[#e85b0b] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isButtonDisabled ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/master/servicetype-list${location?.search}`)
                }
                className="min-w-[120px] h-12 px-6 rounded-xl bg-[#142747] text-white text-sm font-semibold hover:bg-[#0A1F44] transition-all"
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

export default EditServiceType;
