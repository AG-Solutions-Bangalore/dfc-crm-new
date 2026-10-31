
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import BASE_URL from "../../base/BaseUrl";
import AuthPageShell from "../../components/auth/AuthPageShell";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onResetPassword = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim()) {
      toast.error("Please fill in both Username and Email.");
      return;
    }

    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        username: username.trim(),
        email: email.trim(),
      });

      const response = await fetch(
        `${BASE_URL}/api/send-password?${params.toString()}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("New Password Sent to your Email");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(
          data.message || "Email not sent. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ResetPasswordCard = ({ className = "" }) => (
    <div
      className={`
        w-full max-w-[410px]
        rounded-2xl
        border border-slate-200
        bg-white
        p-5 sm:p-6
        shadow-[0_24px_70px_-35px_rgba(10,29,61,0.35)]
        ${className}
      `}
    >
      {/* Header */}
      <div className="mb-4">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F56616]">
          Account Recovery
        </p>

        <h2 className="font-montserrat text-2xl font-extrabold tracking-tight text-[#0A1D3D]">
          Reset Password
        </h2>

        <p className="mt-1.5 text-sm leading-5 text-slate-500">
          Enter your account details and we’ll send password reset
          instructions to your registered email.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onResetPassword} className="space-y-3.5">

        {/* Username */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Username <span className="text-[#F56616]">*</span>
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <User className="h-4 w-4" />
            </div>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-2.5 pl-10 pr-3
                text-sm font-medium text-slate-800
                transition
                focus:border-[#F56616]
                focus:bg-white
                focus:outline-none
                focus:ring-4 focus:ring-orange-100
                placeholder:text-slate-400
              "
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Email Address <span className="text-[#F56616]">*</span>
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-2.5 pl-10 pr-3
                text-sm font-medium text-slate-800
                transition
                focus:border-[#F56616]
                focus:bg-white
                focus:outline-none
                focus:ring-4 focus:ring-orange-100
                placeholder:text-slate-400
              "
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            mt-1 flex w-full items-center justify-center gap-2
            rounded-xl
            bg-[#F56616]
            px-4 py-2.5
            font-montserrat text-sm font-bold text-white
            shadow-lg shadow-orange-900/15
            transition hover:bg-[#df5a10]
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Instructions...</span>
            </>
          ) : (
            <>
              <span>Send Reset Link</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-4 border-t border-slate-100 pt-3 text-center">
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            text-sm font-semibold
            text-[#0A1D3D]
            transition-colors
            hover:text-[#F56616]
          "
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );

  return (
    <AuthPageShell>
      <ResetPasswordCard />
    </AuthPageShell>
  );
};

export default ForgetPassword;
