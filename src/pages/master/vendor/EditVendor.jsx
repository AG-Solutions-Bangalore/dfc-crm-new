
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";
import { decryptId } from "../../../components/common/EncryptionDecryption";

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

const VType = [
  {
    value: "Garage",
    label: "Garage",
  },
  {
    value: "Tyre",
    label: "Tyre",
  },
  {
    value: "Truck",
    label: "Truck",
  },
  {
    value: "Oil",
    label: "Oil",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "Spare Parts",
    label: "Spare Parts",
  },
];

const VType_2 = [
  {
    value: "Tyre",
    label: "Tyre",
  },
  {
    value: "Oil",
    label: "Oil",
  },
];

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const decryptedId = decryptId(id);

  const [vendor, setVendor] = useState({
    vendor_name: "",
    vendor_type: "",
    vendor_contact_person: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_address: "",
    vendor_gst: "",
    vendor_pan: "",
    vendor_status: "",
    vendor_branch: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);

  const fetchEditVendor = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vendor-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVendor(response.data?.vendor);
    } catch (error) {
      console.error("Error fetching  edit vendor branch data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch-com`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch);
    } catch (error) {
      console.error("Error fetching  create vendor branch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditVendor();
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

  const onInputChange = (e) => {
    if (e.target.name == "vendor_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setVendor({
          ...vendor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setVendor({
        ...vendor,
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
      vendor_name: vendor.vendor_name,
      vendor_type: vendor.vendor_type,
      vendor_contact_person: vendor.vendor_contact_person,
      vendor_mobile: vendor.vendor_mobile,
      vendor_email: vendor.vendor_email,
      vendor_address: vendor.vendor_address,
      vendor_gst: vendor.vendor_gst,
      vendor_pan: vendor.vendor_pan,
      vendor_status: vendor.vendor_status,
      vendor_branch: vendor.vendor_branch,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-vendor/${decryptedId}`,
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
      navigate("/master/vendor-list");
    });
  };

  const FormLabel = ({ children, required }) => (
    <label className="mb-2 block text-sm font-semibold text-[#142747]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#F56616] focus:ring-2 focus:ring-orange-100";

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
                  Edit Vendor
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update vendor details, contact information and business
                  information
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/master/vendor-list")}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#142747] transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#F56616]"
            >
              <IconArrowBack size={18} />
              Back to Vendors
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="mx-auto w-full space-y-6"
        >

          {/* Vendor Information */}
          <Section
            title="Vendor Information"
            description="Update vendor name, type and branch details"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {/* Vendor */}
              <div className="md:col-span-2">
                <FormLabel required>Vendor</FormLabel>
                <input
                  disabled
                  type="text"
                  name="vendor_name"
                  value={vendor.vendor_name}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                />
              </div>

              {/* Branch */}
              <div>
                <FormLabel required>Branch</FormLabel>
                <select
                  name="vendor_branch"
                  value={vendor.vendor_branch}
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

              {/* Vendor Type */}
              <div>
                <FormLabel required>Vendor Type</FormLabel>
                <select
                  name="vendor_type"
                  value={vendor.vendor_type}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={selectClass}
                >
                  <option value="">Select Vendor Type</option>
                  {vendor.vendor_branch == "COMMON"
                    ? VType_2.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))
                    : VType.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                </select>
              </div>

              {/* Contact Person */}
              <div>
                <FormLabel>Contact Person</FormLabel>
                <input
                  type="text"
                  name="vendor_contact_person"
                  value={vendor.vendor_contact_person}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter contact person"
                />
              </div>

              {/* Mobile */}
              <div>
                <FormLabel>Mobile</FormLabel>
                <input
                  type="tel"
                  name="vendor_mobile"
                  value={vendor.vendor_mobile}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  maxLength={10}
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Contact Email */}
              <div>
                <FormLabel>Contact Email</FormLabel>
                <input
                  type="email"
                  name="vendor_email"
                  value={vendor.vendor_email}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </Section>

          {/* Address Information */}
          <Section
            title="Address Information"
            description="Update the vendor's registered address"
          >
            <div className="grid grid-cols-1">
              <div>
                <FormLabel>Address</FormLabel>
                <textarea
                  type="text"
                  name="vendor_address"
                  value={vendor.vendor_address}
                  onChange={(e) => onInputChange(e)}
                  className={textareaClass}
                  rows={3}
                  placeholder="Enter vendor address"
                />
              </div>
            </div>
          </Section>

          {/* Business and Tax Information */}
          <Section
            title="Business & Tax Information"
            description="Update GST, PAN and vendor account status"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {/* GST */}
              <div>
                <FormLabel>GST</FormLabel>
                <input
                  type="text"
                  name="vendor_gst"
                  value={vendor.vendor_gst}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter GST number"
                />
              </div>

              {/* PAN */}
              <div>
                <FormLabel>PAN No</FormLabel>
                <input
                  type="text"
                  name="vendor_pan"
                  value={vendor.vendor_pan}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  placeholder="Enter PAN number"
                />
              </div>

              {/* Status */}
              <div>
                <FormLabel required>Status</FormLabel>
                <select
                  name="vendor_status"
                  value={vendor.vendor_status}
                  onChange={(e) => onInputChange(e)}
                  required
                  className={selectClass}
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
          </Section>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <button
              type="button"
              className={BackButton}
              onClick={() => {
                navigate("/master/vendor-list");
              }}
            >
              Back
            </button>

            <button
              type="submit"
              className={CreateButton}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditVendor;
