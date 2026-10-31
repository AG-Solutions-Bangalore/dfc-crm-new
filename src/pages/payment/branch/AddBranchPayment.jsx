import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";
import { Building2, ArrowLeft } from "lucide-react";

const AddBranchPayment = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;

  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    payment_date: todayback,
    payment_branch: "",
    payment_amount: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch || []);
    } catch (error) {
      console.error("Error fetching Branch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name === "payment_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setPayment({
          ...payment,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setPayment({
        ...payment,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Please fill all required fields");
      setIsButtonDisabled(false);
      return;
    }

    const data = {
      payment_date: payment.payment_date,
      payment_branch: payment.payment_branch,
      payment_amount: payment.payment_amount,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-payment",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.code === 200 || res.data.code === "200") {
          toast.success(res.data.msg);
          navigate("/payment/branch-list");
          setPayment({
            payment_date: todayback,
            payment_branch: "",
            payment_amount: "",
          });
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Error creating branch payment");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors";

  return (
    <Layout>
      <div className="space-y-4">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Building2 className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Add Branch Payment
              </h2>
              <p className="text-xs text-gray-300">
                Record new financial disbursement for branch operations
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/payment/branch-list")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <FormLabel required>Payment Date</FormLabel>
                <input
                  type="date"
                  required
                  name="payment_date"
                  value={payment.payment_date}
                  onChange={onInputChange}
                  className={inputClass}
                />
              </div>

              <div>
                <FormLabel required>Branch</FormLabel>
                <select
                  name="payment_branch"
                  value={payment.payment_branch}
                  onChange={onInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Branch</option>
                  {branch.map((option) => (
                    <option key={option.branch_name} value={option.branch_name}>
                      {option.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FormLabel required>Amount (₹)</FormLabel>
                <input
                  type="tel"
                  name="payment_amount"
                  placeholder="Enter payment amount"
                  value={payment.payment_amount}
                  onChange={onInputChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className={CreateButton}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submitting..." : "Submit Payment"}
              </button>

              <button
                type="button"
                className={BackButton}
                onClick={() => navigate("/payment/branch-list")}
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

export default AddBranchPayment;
