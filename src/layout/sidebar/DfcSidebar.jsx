import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Truck,
  Warehouse,
  Route,
  Disc,
  ShieldAlert,
  CalendarClock,
  Clock,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Wrench,
  CreditCard,
  FileText,
  CheckSquare,
  UserCheck,
  UserCog,
  Building,
  X,
} from "lucide-react";
import DfcLogo from "../../components/auth/DfcLogo";
import menuItemsData from "../../json/menuItems.json";
import Profile from "../header/Profile";

const MENU_ICONS = {
  Dashboard: LayoutDashboard,
  Master: Users,
  Company: Building,
  Branch: Warehouse,
  "Tyre Position": CircleDot,
  "Tyre Make": CircleDot,
  "Service Type": Wrench,
  Team: Users,
  Driver: Users,
  Agencies: Building2,
  Vendor: Building,
  Vehicles: Truck,
  Tyre: Disc,
  Purchase: Disc,
  "Fitted Tyre": Disc,
  "Stock Tyre": Disc,
  "Under Inspec.": Disc,
  "Tyre Histroy": Disc,
  Service: Wrench,
  Trip: Route,
  Payments: CreditCard,
  ToBranch: Warehouse,
  Advance: CreditCard,
  Details: FileText,
  Todo: CheckSquare,
  Report: BarChart3,
  "User Management": UserCheck,
  "User Type": UserCog,
  Settings: Settings,
};

const DfcSidebar = ({ onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize expanded menus based on current URL path
  const [expandedMenus, setExpandedMenus] = useState(() => {
    const initial = {
      Master: false,
      Tyre: false,
      Payments: false,
      Report: false,
    };
    menuItemsData.forEach((item) => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some(
          (sub) => sub.href === location.pathname
        );
        if (hasActiveChild) {
          initial[item.title] = true;
        }
      }
    });
    return initial;
  });

  const toggleSubMenu = (menuTitle) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuTitle]: !prev[menuTitle],
    }));
  };

  return (
    <div className="w-full h-full bg-[#081735] text-white flex flex-col justify-between select-none">
      {/* Brand Logo Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#081735]">
        <Link
          to="/home"
          onClick={onCloseMobile}
          className="flex items-center gap-2 group"
        >
          <DfcLogo className="h-8" />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-xl font-black text-[#F56616] tracking-tight">
                DFC
              </span>
              <span className="text-xl font-black text-white tracking-tight">
                GROUP
              </span>
            </div>
            <div className="h-[1.5px] w-full bg-[#F56616] my-1"></div>
            <span className="text-[7.5px] font-bold tracking-[0.2em] text-slate-300 uppercase">
              MOVING BUSINESSES FORWARD
            </span>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Scrollable Navigation List - All text is bright & readable without hover */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scroll">
        {menuItemsData.map((item, idx) => {
          const Icon = MENU_ICONS[item.title] || LayoutDashboard;
          const hasSub = item.subItems && item.subItems.length > 0;
          const isDashboard =
            item.href === "/home" || item.title === "Dashboard";
          const isCurrentRoute = location.pathname === item.href;
          const isExpanded = expandedMenus[item.title];

          if (isDashboard) {
            const isActive =
              location.pathname === "/home" || location.pathname === "/";
            return (
              <div
                key={idx}
                onClick={() => {
                  navigate("/home");
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold cursor-pointer mb-1.5 transition-all ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#F56616] to-[#FF8A3D] shadow-md shadow-orange-500/25"
                    : "text-slate-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4 text-white" />
                <span className="text-sm tracking-wide text-white">
                  {item.title}
                </span>
              </div>
            );
          }

          if (hasSub) {
            const hasActiveChild = item.subItems.some(
              (sub) => sub.href === location.pathname
            );
            return (
              <div key={idx} className="space-y-0.5">
                <button
                  onClick={() => toggleSubMenu(item.title)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-left transition-all group ${
                    hasActiveChild
                      ? "text-white bg-white/10 font-bold"
                      : "text-slate-100 hover:text-white hover:bg-white/10 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        hasActiveChild ? "text-[#F56616]" : "text-slate-300"
                      } group-hover:text-[#F56616] transition-colors`}
                    />
                    <span className="text-xs tracking-wide text-slate-100 group-hover:text-white">
                      {item.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-transform" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-transform" />
                  )}
                </button>

                {/* Submenu Dropdown Items */}
                {isExpanded && (
                  <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-white/15 ml-5 my-0.5">
                    {item.subItems.map((sub, sIdx) => {
                      const isSubActive = location.pathname === sub.href;
                      return (
                        <Link
                          key={sIdx}
                          to={sub.href || "#"}
                          onClick={onCloseMobile}
                          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            isSubActive
                              ? "text-white bg-[#F56616] font-bold shadow-xs"
                              : "text-slate-200 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSubActive ? "bg-white" : "bg-slate-400"
                            }`}
                          ></span>
                          <span>{sub.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Direct Nav Item without submenus
          return (
            <Link
              key={idx}
              to={item.href || "#"}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition-all text-xs group ${
                isCurrentRoute
                  ? "text-white bg-gradient-to-r from-[#F56616] to-[#FF8A3D] font-bold shadow-xs"
                  : "text-slate-100 hover:text-white hover:bg-white/10 font-medium"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isCurrentRoute ? "text-white" : "text-slate-300"
                } group-hover:text-[#F56616] transition-colors`}
              />
              <span className="tracking-wide text-slate-100 group-hover:text-white">
                {item.title}
              </span>
            </Link>
          );
        })}

        {/* Shortcuts Section */}
        <div className="pt-2 pb-1 border-t border-white/10 mt-2">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Shortcuts
          </span>
          <Link
            to="/vehicles-list"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/10 font-medium transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-slate-300" />
            <span>Insurance Due</span>
          </Link>
          <Link
            to="/vehicles-list"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/10 font-medium transition-all"
          >
            <CalendarClock className="w-3.5 h-3.5 text-slate-300" />
            <span>FC Due</span>
          </Link>
          <Link
            to="/vehicles-list"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/10 font-medium transition-all"
          >
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>Idle Vehicles</span>
          </Link>
          <Link
            to="/profile"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-white/10 font-medium transition-all"
          >
            <Settings className="w-3.5 h-3.5 text-slate-300" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Bottom Profile Section (Replaces Cylinders per User Request) */}
      <div className="p-2 border-t border-white/10 bg-[#06122b] shrink-0">
        <Profile inSidebar={true} />
      </div>
    </div>
  );
};

export default DfcSidebar;

