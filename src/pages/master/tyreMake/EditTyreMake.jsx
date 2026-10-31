import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft, IconInfoCircle, IconDeviceFloppy } from "@tabler/icons-react";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "sonner";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";
import { decryptId } from "../../../components/common/EncryptionDecryption";
import { RotateCcw } from "lucide-react";

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

const EditTyreMake = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const location = useLocation();
  const [tyreMake, setTyreMake] = useState({
    tyre_make: "",
    tyre_make_status: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const fetchTyremakeEdit = async () => {
    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-make-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTyreMake(response.data?.tyreMake);
    } catch (error) {
      console.error("Error fetching tyremake edit data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchTyremakeEdit();
  }, []);

  const onInputChange = (e) => {
    setTyreMake({
      ...tyreMake,
      [e.target.name]: e.target.value,
    });
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
      tyre_make: tyreMake.tyre_make,
      tyre_make_status: tyreMake.tyre_make_status,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-tyre-make/${decryptedId}`,
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
      navigate(`/master/tyremake-list${location.search}`);
    });
  };

  const inputClass =
    "w-full h-[42px] rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100";
  const selectClass =
    "w-full h-[42px] rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 text-[13px] font-medium text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#F56616] focus:bg-white focus:ring-2 focus:ring-orange-100";

  return (
    <Layout>
      <div className="w-full rounded-xl bg-[#F1F5F9] p-3 sm:p-4">
        {/* PAGE HEADER */}
        <div className="mb-4 flex items-center justify-between rounded-xl border-b-[3px] border-[#F56616] bg-[#0A1D3D] px-4 py-3 sm:px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F56616]">
              <RotateCcw size={22} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Edit Tyre Make</h2>
              <p className="mt-0.5 text-[11px] text-slate-300">Update tyre make record</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/master/tyremake-list${location.search}`)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/10 hover:text-[#F56616]"
          >
            <IconArrowLeft size={21} />
          </button>
        </div>

        {/* FORM CARD */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(10,29,61,0.06)]">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
            <IconInfoCircle size={19} className="text-[#F56616]" />
            <h3 className="text-sm font-bold text-[#0A1D3D]">Tyre Make Information</h3>
            <span className="ml-auto text-[10px] font-semibold text-slate-400">* Required fields</span>
          </div>
          <form onSubmit={handleSubmit} id="addIndiv" className="w-full">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#0A1D3D]">
                  Tyre Make <span className="ml-1 text-[#F56616]">*</span>
                </label>
                <input
                  type="text"
                  name="tyre_make"
                  value={tyreMake.tyre_make}
                  onChange={(e) => onInputChange(e)}
                  className={`${inputClass} cursor-not-allowed opacity-70`}
                  required
                  disabled
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-[#0A1D3D]">
                  Status <span className="ml-1 text-[#F56616]">*</span>
                </label>
                <select
                  name="tyre_make_status"
                  value={tyreMake.tyre_make_status}
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

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
              <p className="text-[11px] text-slate-400">
                Fields marked with <span className="font-bold text-[#F56616]">*</span> are mandatory
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/master/tyremake-list${location.search}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-[#0A1D3D] transition-all duration-200 hover:border-[#0A1D3D] hover:bg-slate-100"
                >
                  <IconArrowLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F56616] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#DF5A10] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IconDeviceFloppy size={17} />
                  {isButtonDisabled ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditTyreMake;
