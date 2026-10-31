
import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import {
  IconArrowLeft,
  IconBuilding,
  IconInfoCircle,
  IconDeviceFloppy,
  IconArrowRight,
} from "@tabler/icons-react";

const CreateCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [company, setCompany] = useState({
    company_short: "",
    company_name: "",
    company_address: "",
    company_mobile: "",
    company_email: "",
    company_gst: "",
    company_pan: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "company_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setCompany({
          ...company,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setCompany({
        ...company,
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
      company_short: company.company_short,
      company_name: company.company_name,
      company_address: company.company_address,
      company_mobile: company.company_mobile,
      company_email: company.company_email,
      company_gst: company.company_gst,
      company_pan: company.company_pan,
    };

    setIsButtonDisabled(true);

    axios({
      url: BASE_URL + "/api/web-create-company",
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

      navigate(`/master/company-list${location?.search}`);

      setCompany({
        company_short: "",
        company_name: "",
        company_address: "",
        company_mobile: "",
        company_email: "",
        company_gst: "",
        company_pan: "",
      });
    });
  };

  // Reusable Label
  const FormLabel = ({ children, required }) => (
    <label className="mb-1.5 block text-[13px] font-semibold text-[#0A1D3D]">
      {children}
      {required && (
        <span className="ml-1 text-[#F56616]">*</span>
      )}
    </label>
  );

  // Common Input Styling
  const inputClass = `
    w-full
    h-[42px]
    rounded-lg
    border border-slate-200
    bg-[#F8FAFC]
    px-3
    text-[13px]
    font-medium
    text-slate-800
    outline-none
    transition-all duration-200
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-[#F56616]
    focus:bg-white
    focus:ring-2
    focus:ring-orange-100
  `;

  const textareaClass = `
    w-full
    rounded-lg
    border border-slate-200
    bg-[#F8FAFC]
    px-3 py-2.5
    text-[13px]
    font-medium
    text-slate-800
    outline-none
    resize-none
    transition-all duration-200
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-[#F56616]
    focus:bg-white
    focus:ring-2
    focus:ring-orange-100
  `;

  return (
    <Layout>
      <div className="w-full rounded-xl bg-[#F1F5F9] p-3 sm:p-4">

        {/* PAGE HEADER */}
        <div className="
          mb-4
          flex items-center justify-between
          rounded-xl
          border-b-[3px] border-[#F56616]
          bg-[#0A1D3D]
          px-4 py-3 sm:px-5
          shadow-sm
        ">
          <div className="flex items-center gap-3">

            <div className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-white/10
              text-[#F56616]
            ">
              <IconBuilding size={22} stroke={1.8} />
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Add Company
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-300">
                Master Company Records & Legal Profiles
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(`/master/company-list${location?.search}`)
            }
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              text-white
              transition-all duration-200
              hover:bg-white/10
              hover:text-[#F56616]
            "
            title="Back to Company List"
          >
            <IconArrowLeft size={21} />
          </button>
        </div>

        {/* FORM CARD */}
        <div className="
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          shadow-[0_4px_18px_rgba(10,29,61,0.06)]
        ">

          {/* FORM SECTION HEADER */}
          <div className="
            flex items-center gap-2
            border-b border-slate-100
            bg-slate-50
            px-5 py-3
          ">
            <IconInfoCircle
              size={19}
              className="text-[#F56616]"
            />

            <h3 className="text-sm font-bold text-[#0A1D3D]">
              Company Information
            </h3>

            <span className="
              ml-auto
              text-[10px]
              font-semibold
              text-slate-400
            ">
              * Required fields
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            id="addIndiv"
            className="w-full"
          >

            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* Company Short */}
              <div className="lg:col-span-2">
                <FormLabel required>
                  Company Short
                </FormLabel>

                <input
                  type="text"
                  name="company_short"
                  value={company.company_short}
                  onChange={onInputChange}
                  className={inputClass}
                  placeholder="Enter company short name"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="lg:col-span-2">
                <FormLabel required>
                  Company Name
                </FormLabel>

                <input
                  type="text"
                  name="company_name"
                  value={company.company_name}
                  onChange={onInputChange}
                  className={inputClass}
                  placeholder="Enter company name"
                  required
                />
              </div>

              {/* Company Address */}
              <div className="lg:col-span-4">
                <FormLabel required>
                  Company Address
                </FormLabel>

                <textarea
                  name="company_address"
                  value={company.company_address}
                  onChange={onInputChange}
                  className={textareaClass}
                  placeholder="Enter complete company address"
                  required
                  rows={3}
                />
              </div>

              {/* Mobile */}
              <div>
                <FormLabel required>
                  Mobile Number
                </FormLabel>

                <input
                  type="tel"
                  name="company_mobile"
                  value={company.company_mobile}
                  onChange={onInputChange}
                  className={inputClass}
                  placeholder="Enter mobile number"
                  required
                  maxLength={10}
                />
              </div>

              {/* Email */}
              <div>
                <FormLabel required>
                  Email Address
                </FormLabel>

                <input
                  type="email"
                  name="company_email"
                  value={company.company_email}
                  onChange={onInputChange}
                  className={inputClass}
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* GST */}
              <div>
                <FormLabel>
                  GST Number
                </FormLabel>

                <input
                  type="text"
                  name="company_gst"
                  value={company.company_gst}
                  onChange={onInputChange}
                  className={inputClass}
                  placeholder="Enter GST number"
                  maxLength={15}
                />
              </div>

              {/* PAN */}
              <div>
                <FormLabel>
                  PAN Number
                </FormLabel>

                <input
                  type="text"
                  name="company_pan"
                  value={company.company_pan}
                  onChange={onInputChange}
                  className={inputClass}
                  placeholder="Enter PAN number"
                  maxLength={10}
                />
              </div>

            </div>

            {/* FORM FOOTER */}
            <div className="
              flex flex-wrap items-center justify-between
              gap-3
              border-t border-slate-100
              bg-slate-50
              px-5 py-4
            ">

              <p className="text-[11px] text-slate-400">
                Fields marked with <span className="font-bold text-[#F56616]">*</span> are mandatory
              </p>

              <div className="flex items-center gap-3">

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/master/company-list${location?.search}`)
                  }
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-lg
                    border border-slate-300
                    bg-white
                    px-5 py-2.5
                    text-xs font-bold
                    text-[#0A1D3D]
                    transition-all duration-200
                    hover:border-[#0A1D3D]
                    hover:bg-slate-100
                  "
                >
                  <IconArrowLeft size={16} />
                  Back
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-lg
                    bg-[#F56616]
                    px-6 py-2.5
                    text-xs font-bold
                    text-white
                    shadow-sm shadow-orange-900/20
                    transition-all duration-200
                    hover:bg-[#DF5A10]
                    hover:shadow-md
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <IconDeviceFloppy size={17} />

                  {isButtonDisabled ? "Submitting..." : "Submit"}

                  {!isButtonDisabled && (
                    <IconArrowRight size={15} />
                  )}
                </button>

              </div>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCompany;
