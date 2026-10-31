
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";

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

const CreateVendor = () => {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState({
    vendor_name: "",
    vendor_type: "",
    vendor_contact_person: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_address: "",
    vendor_gst: "",
    vendor_pan: "",
    vendor_branch: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);

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
      vendor_branch: vendor.vendor_branch,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-vendor",
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
      navigate("/master/vendor-list");
      setVendor({
        vendor_name: "",
        vendor_type: "",
        vendor_contact_person: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_address: "",
        vendor_gst: "",
        vendor_pan: "",
        vendor_branch: "",
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
                  Add Vendor
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add vendor details, contact information and business details
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
            description="Enter vendor name, branch and vendor category"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {/* Vendor Name */}
              <div className="md:col-span-2">
                <FormLabel required>Vendor</FormLabel>
                <input
                  type="text"
                  name="vendor_name"
                  value={vendor.vendor_name}
                  onChange={(e) => onInputChange(e)}
                  className={inputClass}
                  required
                  placeholder="Enter vendor name"
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
            description="Enter the vendor's address details"
          >
            <div>
              <FormLabel required>Address</FormLabel>
              <textarea
                type="text"
                name="vendor_address"
                value={vendor.vendor_address}
                onChange={(e) => onInputChange(e)}
                className={textareaClass}
                required
                rows={3}
                placeholder="Enter vendor address"
              />
            </div>
          </Section>

          {/* Business and Tax Information */}
          <Section
            title="Business & Tax Information"
            description="Enter vendor GST and PAN details"
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
                  maxLength={15}
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
                  maxLength={10}
                  placeholder="Enter PAN number"
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
              {isButtonDisabled ? "Sumbitting..." : "Sumbit"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateVendor;
