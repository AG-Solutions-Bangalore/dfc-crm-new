import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import Select from "react-select";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import {
  BackButton,
  CreateButton,
} from "../../../components/common/ButtonColors";
import { decryptId } from "../../../components/common/EncryptionDecryption";
import { CreditCard, ArrowLeft, Trash2, AlertTriangle } from "lucide-react";

const details_type = [
  { value: "Cash", label: "Cash" },
  { value: "Bank", label: "Bank" },
  { value: "NEFT", label: "NEFT" },
  { value: "Cheque", label: "Cheque" },
];

const EditAdvancePayment = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    payment_details_date: "",
    payment_details_type: "",
    payment_details_company: "",
    payment_details_voucher_type: "Advance",
    payment_details_debit: "",
    payment_details_amount: "",
    payment_details_credit: "",
    payment_details_transaction: "",
    payment_details_narration: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // credit
  const [branch, setBranch] = useState([]);
  // debit
  const [debitData, setDebitData] = useState([]);
  const [company, setCompany] = useState([]);

  const fetchEditPayment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-payment-details-by-id/${decryptedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayment(response.data?.payment || {});
    } catch (error) {
      console.error("Error fetching edit Advance Payment data", error);
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

      setBranch(response.data?.branch || []);
    } catch (error) {
      console.error("Error fetching Advance Payment data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompany(response.data?.company || []);
    } catch (error) {
      console.error("Error fetching Advance Company data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDebit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-mix-by-id/${payment.payment_details_voucher_type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDebitData(response.data?.mix || []);
    } catch (error) {
      console.error("Error fetching Debit Payment data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditPayment();
    fetchBranch();
    fetchCompany();
  }, []);

  useEffect(() => {
    if (payment.payment_details_voucher_type) {
      fetchDebit();
    }
  }, [payment.payment_details_voucher_type]);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e?.name === "payment_details_debit") {
      setPayment({
        ...payment,
        payment_details_debit: e.value,
      });
    } else if (e?.target?.name === "payment_details_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setPayment({
          ...payment,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e?.target) {
      setPayment({
        ...payment,
        [e.target.name]: e.target.value,
      });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      minHeight: "38px",
      fontSize: "0.8125rem",
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#142747" : "#E2E8F0",
      boxShadow: state.isFocused ? "0 0 0 1px #142747" : "none",
      "&:hover": {
        borderColor: "#CBD5E1",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.8125rem",
      zIndex: 50,
    }),
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
      payment_details_date: payment.payment_details_date,
      payment_details_type: payment.payment_details_type,
      payment_details_company: payment.payment_details_company,
      payment_details_voucher_type: payment.payment_details_voucher_type,
      payment_details_debit: payment.payment_details_debit,
      payment_details_amount: payment.payment_details_amount,
      payment_details_credit: payment.payment_details_credit,
      payment_details_transaction: payment.payment_details_transaction,
      payment_details_narration: payment.payment_details_narration,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-update-payment-details/${decryptedId}`,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.code === 200 || res.data.code === "200") {
          toast.success(res.data.msg);
          navigate("/payment/advance-list");
        } else if (res.data.code === 400 || res.data.code === "400") {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Error updating advance payment");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const onDelete = (e) => {
    e.preventDefault();
    const data = {
      payment_details_id: decryptedId,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + `/api/web-delete-payment-details/${decryptedId}`,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.code === 200 || res.data.code === "200") {
          toast.success(res.data.msg);
          navigate("/payment/advance-list");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Error deleting advance payment");
      })
      .finally(() => {
        setIsButtonDisabled(false);
        setOpenDialog(false);
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
  const disabledClass =
    "w-full px-3 py-2 text-xs border border-gray-200 bg-gray-50 text-gray-600 rounded-lg cursor-not-allowed";

  return (
    <Layout>
      <div className="space-y-4">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Edit Advance Payment
              </h2>
              <p className="text-xs text-gray-300">
                Update payment details, accounts, and allocations
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/payment/advance-list")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Date */}
              <div>
                <FormLabel required>Payment Date</FormLabel>
                <input
                  type="date"
                  required
                  disabled
                  name="payment_details_date"
                  value={payment.payment_details_date || ""}
                  onChange={onInputChange}
                  className={disabledClass}
                />
              </div>

              {/* Type */}
              <div>
                <FormLabel required>Payment Type</FormLabel>
                <select
                  name="payment_details_type"
                  value={payment.payment_details_type || ""}
                  onChange={onInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Type</option>
                  {details_type.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Debit */}
              <div>
                <FormLabel required>Debit (To)</FormLabel>
                <Select
                  name="payment_details_debit"
                  options={debitData.map((option) => ({
                    value: option.common_name,
                    label: option.common_name,
                    name: "payment_details_debit",
                  }))}
                  onChange={onInputChange}
                  value={
                    payment.payment_details_debit
                      ? {
                          value: payment.payment_details_debit,
                          label: payment.payment_details_debit,
                        }
                      : null
                  }
                  required
                  placeholder="Select Debit"
                  styles={customStyles}
                  isSearchable={true}
                />
              </div>

              {/* Amount */}
              <div>
                <FormLabel required>Amount (₹)</FormLabel>
                <input
                  type="tel"
                  name="payment_details_amount"
                  placeholder="Enter amount"
                  value={payment.payment_details_amount || ""}
                  onChange={onInputChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Company */}
              <div>
                <FormLabel required>Company</FormLabel>
                <select
                  name="payment_details_company"
                  value={payment.payment_details_company || ""}
                  onChange={onInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Company</option>
                  {company.map((option) => (
                    <option
                      key={option.company_name}
                      value={option.company_name}
                    >
                      {option.company_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Credit */}
              <div>
                <FormLabel required>Credit (From Branch)</FormLabel>
                <select
                  name="payment_details_credit"
                  value={payment.payment_details_credit || ""}
                  onChange={onInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Credit</option>
                  {branch.map((option) => (
                    <option key={option.branch_name} value={option.branch_name}>
                      {option.branch_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transaction & Narration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormLabel>Transaction Details</FormLabel>
                <textarea
                  name="payment_details_transaction"
                  value={payment.payment_details_transaction || ""}
                  onChange={onInputChange}
                  className={inputClass}
                  rows={3}
                  placeholder="Enter transaction / reference details..."
                />
              </div>

              <div>
                <FormLabel>Narration Details</FormLabel>
                <textarea
                  name="payment_details_narration"
                  value={payment.payment_details_narration || ""}
                  onChange={onInputChange}
                  className={inputClass}
                  rows={3}
                  placeholder="Enter narration notes..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className={CreateButton}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? "Updating..." : "Update Advance"}
                </button>

                <button
                  type="button"
                  className={BackButton}
                  onClick={() => navigate("/payment/advance-list")}
                >
                  Back
                </button>
              </div>

              <button
                type="button"
                onClick={() => setOpenDialog(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </form>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDialog}
          handler={() => setOpenDialog(false)}
          size="xs"
          className="rounded-2xl p-4 bg-white"
        >
          <DialogHeader className="text-base font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-500" />
            <span>Confirm Deletion</span>
          </DialogHeader>
          <DialogBody className="text-xs text-gray-600">
            Are you sure you want to delete this advance payment record? This action cannot be undone.
          </DialogBody>
          <DialogFooter className="flex gap-2">
            <button
              onClick={() => setOpenDialog(false)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              disabled={isButtonDisabled}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
            >
              {isButtonDisabled ? "Deleting..." : "Delete"}
            </button>
          </DialogFooter>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EditAdvancePayment;
