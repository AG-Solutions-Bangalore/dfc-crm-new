import React from "react";
import Profile from "./Profile";
import { Menu } from "lucide-react";

const Header = ({ toggleMobileSidebar }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Mobile Menu Trigger */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* User Profile on the right side */}
      <div className="flex items-center ml-auto">
        <Profile showUserDetails />
      </div>
    </div>
  );
};

export default Header;
