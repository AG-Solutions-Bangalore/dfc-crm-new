import React from "react";
import Layout from "../../layout/Layout";
import { User, Mail, MessageSquare } from "lucide-react";
import { CreateButton } from "../../components/common/ButtonColors";

const Profile = () => {
  return (
    <Layout>
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <User className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                User Profile
              </h2>
              <p className="text-xs text-gray-300">
                View and manage personal account details and communication preferences
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                className="block text-xs font-semibold text-gray-700 mb-1.5"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors"
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold text-gray-700 mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold text-gray-700 mb-1.5"
                htmlFor="message"
              >
                Bio / Notes
              </label>
              <textarea
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors"
                id="message"
                placeholder="Enter notes or additional account info..."
                rows="4"
              />
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button type="submit" className={CreateButton}>
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
