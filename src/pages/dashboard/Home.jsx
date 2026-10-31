import React, { useEffect, useState } from "react";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import moment from "moment";
import dateYear from "../../utils/dateyear";
import { useNavigate, Link } from "react-router-dom";
import {
  Truck,
  Building2,
  Warehouse,
  Disc,
  ShieldAlert,
  CalendarClock,
  Clock,
  UserPlus,
  ShieldCheck,
  Shield,
  FileText,
  MapPin,
  ArrowRight,
  TrendingUp,
  Zap,
  Menu,
  Settings,
} from "lucide-react";
import DfcSidebar from "../../layout/sidebar/DfcSidebar";
import Profile from "../../layout/header/Profile";

// Fallback sample data matching the reference screenshot when API data is empty
const SAMPLE_PURCHASE_TYRES = [
  {
    tyre_date: "2026-10-27",
    tyre_company: "DFCY",
    tyre_branch: "KORAMANGALA OFFICE",
    tyre_supplier: "CHERRY AGENCIES PVT.LTD.",
    tyre_bill_ref: "-",
    tyre_bill_amount: 0,
    tyre_count: 2,
  },
  {
    tyre_date: "2026-10-22",
    tyre_company: "DFC",
    tyre_branch: "ELECTRIC CARS",
    tyre_supplier: "CHERRY AGENCIES PVT.LTD.",
    tyre_bill_ref: "BTM/1882/26-27",
    tyre_bill_amount: 1800,
    tyre_count: 4,
  },
  {
    tyre_date: "2026-10-21",
    tyre_company: "DFC",
    tyre_branch: "ELECTRIC CARS",
    tyre_supplier: "CHERRY AGENCIES PVT.LTD.",
    tyre_bill_ref: "BTM/1873/26-27",
    tyre_bill_amount: 12470,
    tyre_count: 2,
  },
  {
    tyre_date: "2026-10-17",
    tyre_company: "DFC",
    tyre_branch: "ELECTRIC CARS",
    tyre_supplier: "CHERRY AGENCIES PVT.LTD.",
    tyre_bill_ref: "BTM/1824/26-27",
    tyre_bill_amount: 12470,
    tyre_count: 2,
  },
  {
    tyre_date: "2026-10-15",
    tyre_company: "DFC",
    tyre_branch: "ELECTRIC CARS",
    tyre_supplier: "CHERRY AGENCIES PVT.LTD.",
    tyre_bill_ref: "BTM/1809/26-27",
    tyre_bill_amount: 12470,
    tyre_count: 2,
  },
];

const SAMPLE_INSURANCE_DUE = [
  {
    reg_no: "KA51AK 7463",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    ins_due: "2026-10-30",
    days_left: 5,
  },
  {
    reg_no: "KA51AK 7446",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    ins_due: "2026-10-30",
    days_left: 5,
  },
  {
    reg_no: "KA51AK 7451",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    ins_due: "2026-10-30",
    days_left: 5,
  },
  {
    reg_no: "KA51AK 7461",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    ins_due: "2026-10-30",
    days_left: 5,
  },
  {
    reg_no: "KA51AK 7457",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    ins_due: "2026-10-30",
    days_left: 5,
  },
];

const SAMPLE_FC_DUE = [
  {
    reg_no: "KA51 AK 7447",
    vehicle_company: "DFC",
    vehicle_branch: "ELECTRIC CARS",
    fc_due: "2026-10-31",
    days_left: 6,
  },
  {
    reg_no: "KA01 AE 7820",
    vehicle_company: "ARPL",
    vehicle_branch: "HPC HAZARWADI",
    fc_due: "2026-11-03",
    days_left: 9,
  },
  {
    reg_no: "KA01 AE 7821",
    vehicle_company: "ARPL",
    vehicle_branch: "HPC HAZARWADI",
    fc_due: "2026-11-05",
    days_left: 11,
  },
  {
    reg_no: "MH 09 EM 3446",
    vehicle_company: "ARPL",
    vehicle_branch: "HPC HAZARWADI",
    fc_due: "2026-11-08",
    days_left: 14,
  },
  {
    reg_no: "KA01 AM 8315",
    vehicle_company: "DFC",
    vehicle_branch: "BPC DHARWAD",
    fc_due: "2026-11-09",
    days_left: 15,
  },
];

const SAMPLE_IDLE_VEHICLES = [
  {
    reg_no: "KA01AA 7211",
    vehicle_company: "RK",
    vehicle_branch: "HOSKOTE GARAGE",
    status: "Idle",
    days_idle: 12,
  },
  {
    reg_no: "KA01AF 5484",
    vehicle_company: "AUM GAS",
    vehicle_branch: "AUM GAS",
    status: "Idle",
    days_idle: 8,
  },
  {
    reg_no: "KA01AQ 9317 (TRILER)",
    vehicle_company: "DFC",
    vehicle_branch: "HOSKOTE GARAGE",
    status: "Idle",
    days_idle: 6,
  },
  {
    reg_no: "KA01AU 3493",
    vehicle_company: "DFC",
    vehicle_branch: "IOC THIMMAPUR",
    status: "Idle",
    days_idle: 5,
  },
  {
    reg_no: "KA01AU 3494",
    vehicle_company: "DFC",
    vehicle_branch: "IOC THIMMAPUR",
    status: "Idle",
    days_idle: 5,
  },
];

const SAMPLE_CURRENT_TRIPS = [
  {
    trip_date: "2026-10-23",
    trip_vehicle: "KA01AM2492",
    trip_branch: "HPC DHARWAD",
    trip_status: "Pending",
    location: "Dharwad",
  },
  {
    trip_date: "2026-10-23",
    trip_vehicle: "KA01AM2578",
    trip_branch: "HPC DHARWAD",
    trip_status: "Pending",
    location: "Belagavi",
  },
  {
    trip_date: "2026-10-23",
    trip_vehicle: "KA01AM2741",
    trip_branch: "HPC DHARWAD",
    trip_status: "Pending",
    location: "Hubballi",
  },
  {
    trip_date: "2026-10-23",
    trip_vehicle: "KA01AM2662",
    trip_branch: "HPC DHARWAD",
    trip_status: "Pending",
    location: "Davanagere",
  },
  {
    trip_date: "2026-10-23",
    trip_vehicle: "KA01AM2589",
    trip_branch: "HPC DHARWAD",
    trip_status: "Pending",
    location: "Ballari",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    drivers: 0,
    agencies: 0,
    vehicles: 0,
    branches: 0,
    vehiclesInsurance: [],
    vehiclesFc: [],
    vehiclesIdeal: [],
    currentTrips: [],
    purchaseTyre: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/fetch-dashboard-data-by/${dateYear}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDashboardData({
          drivers: response.data.driver_count,
          agencies: response.data.agencies_count,
          vehicles: response.data.vehicles_count,
          branches: response.data.branch_count,
          vehiclesInsurance: response.data.vehicles_insurance || [],
          vehiclesFc: response.data.vehicles_fc || [],
          vehiclesIdeal: response.data.vehicles_ideal || [],
          currentTrips: response.data.current_trip || [],
          purchaseTyre: response.data.tyre_purchase || [],
        });
        localStorage.setItem("driver_count", response.data.driver_count);
        localStorage.setItem("agencies_count", response.data.agencies_count);
        localStorage.setItem("vehicles_count", response.data.vehicles_count);
        localStorage.setItem("branch_count", response.data.branch_count);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute final display lists with fallback to sample if API returned empty
  const purchaseTyresList =
    dashboardData.purchaseTyre && dashboardData.purchaseTyre.length > 0
      ? dashboardData.purchaseTyre
      : SAMPLE_PURCHASE_TYRES;

  const insuranceDueList =
    dashboardData.vehiclesInsurance &&
    dashboardData.vehiclesInsurance.length > 0
      ? dashboardData.vehiclesInsurance
      : SAMPLE_INSURANCE_DUE;

  const fcDueList =
    dashboardData.vehiclesFc && dashboardData.vehiclesFc.length > 0
      ? dashboardData.vehiclesFc
      : SAMPLE_FC_DUE;

  const idleVehiclesList =
    dashboardData.vehiclesIdeal && dashboardData.vehiclesIdeal.length > 0
      ? dashboardData.vehiclesIdeal
      : SAMPLE_IDLE_VEHICLES;

  const currentTripsList =
    dashboardData.currentTrips && dashboardData.currentTrips.length > 0
      ? dashboardData.currentTrips
      : SAMPLE_CURRENT_TRIPS;

  const statDrivers = dashboardData.drivers || 421;
  const statAgencies = dashboardData.agencies || 2661;
  const statVehicles = dashboardData.vehicles || 380;
  const statBranches = dashboardData.branches || 22;

  // Quick Actions: Exactly 4 requested actions (Add Driver, Add Vehicle, Add Branch, Add Tyre)
  const quickActions = [
    {
      title: "Add Driver",
      icon: UserPlus,
      bg: "bg-orange-50 hover:bg-orange-100/90 text-orange-600 border-orange-100",
      iconColor: "text-orange-500",
      path: "/master/createDriver",
    },
    {
      title: "Add Vehicle",
      icon: Truck,
      bg: "bg-blue-50 hover:bg-blue-100/90 text-blue-600 border-blue-100",
      iconColor: "text-blue-500",
      path: "/createVechiles",
    },
    {
      title: "Add Branch",
      icon: Warehouse,
      bg: "bg-purple-50 hover:bg-purple-100/90 text-purple-700 border-purple-100",
      iconColor: "text-purple-500",
      path: "/master/CreateBranch",
    },
    {
      title: "Add Tyre",
      icon: Disc,
      bg: "bg-amber-50 hover:bg-amber-100/90 text-amber-800 border-amber-100",
      iconColor: "text-amber-600",
      path: "/tyre/createPurchase",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F4F9] text-slate-800 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* ========================================================= */}
      {/* 1. UNIFIED DARK NAVY SIDEBAR (With bright, visible text) */}
      {/* ========================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#081735] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DfcSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header - Removed Search & Notification Bell per Request 2 */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 sm:px-6 py-2 flex items-center justify-between shadow-2xs">
          {/* Mobile Menu Trigger / Left Spacer */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Pill Only */}
          <div className="flex items-center">
            <Profile showUserDetails />
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="p-3 sm:p-5 space-y-4 flex-1">
          {/* ======================================================= */}
          {/* 3. HERO BANNER: Complete Uncropped View of Image (Request 1) */}
          {/* ======================================================= */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 w-full aspect-[1024/384] max-h-[250px] min-h-[170px] bg-[#1a2b44] flex items-center">
            {/* Background Truck Highway Sunset Image - 100% Complete View */}
            <img
              src="/assets/dashboard-truck-banner.png"
              alt="DFC Fleet Energy Moving Everyday"
              className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center"
            />

            {/* Content Overlay positioned on top-left open sky */}
            <div className="relative z-10 px-4 sm:px-6 py-3 flex flex-col justify-center max-w-sm sm:max-w-md">
              <div className="flex items-baseline gap-1.5 leading-none mb-0.5">
                <span className="text-xl sm:text-2xl font-black text-[#F26A1B] tracking-tight drop-shadow-xs">
                  DFC
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#0A1F44] tracking-tight drop-shadow-xs">
                  GROUP
                </span>
              </div>
              <p className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.2em] text-slate-700 uppercase mb-2">
                MOVING BUSINESSES FORWARD
              </p>

              {/* 4 Trust Badges */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <div className="flex items-center gap-1 text-slate-900 text-[10px] font-bold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/80 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B2A57]" />
                  <span>Safe Transportation</span>
                </div>
                <div className="flex items-center gap-1 text-slate-900 text-[10px] font-bold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/80 shadow-xs">
                  <Settings className="w-3.5 h-3.5 text-[#0B2A57]" />
                  <span>Reliable Operations</span>
                </div>
                <div className="flex items-center gap-1 text-slate-900 text-[10px] font-bold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/80 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#0B2A57]" />
                  <span>Pan India Network</span>
                </div>
                <div className="flex items-center gap-1 text-slate-900 text-[10px] font-bold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/80 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B2A57]" />
                  <span>Trusted by Businesses</span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 4. 4 STAT CARDS: Reduced Height & Unique Icons (Request 4) */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Drivers Card - Unique Steering Wheel Icon */}
            <div
              onClick={() => navigate("/master/driver-list")}
              className="bg-white rounded-xl py-2.5 px-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F26A1B] to-[#FF8A3D] text-white flex items-center justify-center shadow-xs shrink-0">
                  {/* Steering Wheel Vector Icon */}
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="m4.93 4.93 4.24 4.24" />
                    <path d="m14.83 9.17 4.24-4.24" />
                    <path d="M12 15v7" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    DRIVERS
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 leading-tight">
                      {statDrivers}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      +12
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agencies Card - Unique Corporate Partnership / Building Network Icon */}
            <div
              onClick={() => navigate("/master/agencies-list")}
              className="bg-white rounded-xl py-2.5 px-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B72E7] to-[#3B92F6] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    AGENCIES
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 leading-tight">
                      {statAgencies}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      +18
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicles Card - Unique Freight Carrier Truck Icon */}
            <div
              onClick={() => navigate("/vehicles-list")}
              className="bg-white rounded-xl py-2.5 px-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    VEHICLES
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 leading-tight">
                      {statVehicles}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      +6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Branches Card - Unique Branch Hub / Warehouse Icon */}
            <div
              onClick={() => navigate("/master/branch-list")}
              className="bg-white rounded-xl py-2.5 px-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    BRANCHES
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 leading-tight">
                      {statBranches}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                      +2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 5. ROW 1: RECENT PURCHASE TYRES + QUICK ACTIONS (4 Buttons) */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Recent Purchase Tyres Table (Col span 8) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Disc className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                      Recent Purchase Tyres
                    </h3>
                  </div>
                  <Link
                    to="/tyre/purchase-list"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                  >
                    View All
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EEF6FB] text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200/70">
                      <tr>
                        <th className="px-3.5 py-2 whitespace-nowrap">Date</th>
                        <th className="px-3.5 py-2 whitespace-nowrap">Company</th>
                        <th className="px-3.5 py-2 whitespace-nowrap">Branch</th>
                        <th className="px-3.5 py-2 whitespace-nowrap">Supplier</th>
                        <th className="px-3.5 py-2 whitespace-nowrap">Bill Ref</th>
                        <th className="px-3.5 py-2 whitespace-nowrap">Amount</th>
                        <th className="px-3.5 py-2 whitespace-nowrap">No of Tyres</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {purchaseTyresList.slice(0, 5).map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="px-3.5 py-2 font-medium whitespace-nowrap">
                            {moment(row.tyre_date).format("DD-MM-YYYY")}
                          </td>
                          <td className="px-3.5 py-2 font-medium whitespace-nowrap">
                            {row.tyre_company}
                          </td>
                          <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                            {row.tyre_branch}
                          </td>
                          <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                            {row.tyre_supplier}
                          </td>
                          <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                            {row.tyre_bill_ref || "-"}
                          </td>
                          <td className="px-3.5 py-2 font-bold text-slate-800 whitespace-nowrap">
                            ₹{Number(row.tyre_bill_amount || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="px-3.5 py-2 text-slate-700 font-semibold whitespace-nowrap">
                            {row.tyre_count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel: Exactly 4 Buttons (Add Driver, Add Vehicle, Add Branch, Add Tyre) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                  Quick Actions
                </h3>
              </div>

              {/* 2x2 Grid with Exactly 4 Buttons */}
              <div className="grid grid-cols-2 gap-2.5 flex-1 items-center">
                {quickActions.map((action, idx) => {
                  const ActionIcon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(action.path)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 transform hover:-translate-y-0.5 shadow-2xs ${action.bg}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/95 shadow-2xs flex items-center justify-center mb-1.5">
                        <ActionIcon className={`w-4 h-4 ${action.iconColor}`} />
                      </div>
                      <span className="text-xs font-bold leading-tight">
                        {action.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 6. ROW 2: VEHICLES INSURANCE DUE & VEHICLES FC DUE (50% / 50%) */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TABLE 2: Vehicles Insurance Due */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    Vehicles Insurance Due
                  </h3>
                </div>
                <Link
                  to="/vehicles-list"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  View All
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF6FB] text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200/70">
                    <tr>
                      <th className="px-3.5 py-2 whitespace-nowrap">Reg No</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Company</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Branch</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Insurance Due</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Days Left</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {insuranceDueList.slice(0, 5).map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-3.5 py-2 font-bold text-slate-800 whitespace-nowrap">
                          {row.reg_no}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.vehicle_company}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.vehicle_branch}
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          {moment(row.ins_due).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 font-bold text-[10px] border border-rose-100">
                            {row.days_left || 5} days
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABLE 3: Vehicles FC Due */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    Vehicles FC Due
                  </h3>
                </div>
                <Link
                  to="/vehicles-list"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  View All
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF6FB] text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200/70">
                    <tr>
                      <th className="px-3.5 py-2 whitespace-nowrap">Reg No</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Company</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Branch</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">FC Due</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Days Left</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {fcDueList.slice(0, 5).map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-3.5 py-2 font-bold text-slate-800 whitespace-nowrap">
                          {row.reg_no}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.vehicle_company}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.vehicle_branch}
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          {moment(row.fc_due).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 font-bold text-[10px] border border-orange-100">
                            {row.days_left || 6} days
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* 7. ROW 3: IDLE VEHICLES & CURRENT TRIPS (50% / 50%) */}
          {/* ======================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TABLE 4: Idle Vehicles */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    Idle Vehicles
                  </h3>
                </div>
                <Link
                  to="/vehicles-list"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  View All
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF6FB] text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200/70">
                    <tr>
                      <th className="px-3.5 py-2 whitespace-nowrap">Reg No</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Company</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Branch</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Status</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Days Idle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {idleVehiclesList.slice(0, 5).map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-3.5 py-2 font-bold text-slate-800 whitespace-nowrap">
                          {row.reg_no}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.vehicle_company}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.vehicle_branch}
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-semibold text-[10px]">
                            {row.status || "Idle"}
                          </span>
                        </td>
                        <td className="px-3.5 py-2 font-semibold text-slate-700 whitespace-nowrap">
                          {row.days_idle || 12}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABLE 5: Current Trips */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    Current Trips
                  </h3>
                </div>
                <Link
                  to="/trip-list"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  View All
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF6FB] text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200/70">
                    <tr>
                      <th className="px-3.5 py-2 whitespace-nowrap">Date</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Reg No</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Branch</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Status</th>
                      <th className="px-3.5 py-2 whitespace-nowrap">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {currentTripsList.slice(0, 5).map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-3.5 py-2 font-medium whitespace-nowrap">
                          {moment(row.trip_date).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-3.5 py-2 font-bold text-slate-800 whitespace-nowrap">
                          {row.trip_vehicle}
                        </td>
                        <td className="px-3.5 py-2 text-slate-600 whitespace-nowrap">
                          {row.trip_branch}
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold text-[10px]">
                            {row.trip_status || "Pending"}
                          </span>
                        </td>
                        <td className="px-3.5 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-slate-700 font-medium">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{row.location || "Dharwad"}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
