import React from "react";
import Layout from "../../layout/Layout";
import { KeyRound, Lock } from "lucide-react";
import { CreateButton } from "../../components/common/ButtonColors";

const ChangePassword = () => {
  return (
    <Layout>
      <div className="space-y-4 max-w-xl mx-auto">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <KeyRound className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Change Password
              </h2>
              <p className="text-xs text-gray-300">
                Update account login credentials and security password
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button type="submit" className={CreateButton}>
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
