import React, { useState } from "react";
import DfcSidebar from "./sidebar/DfcSidebar";
import Header from "./header/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isReportPage = pathname.startsWith("/report-");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex font-sans antialiased text-slate-800 ${
        isReportPage ? "report-layout bg-[#f4f6fa]" : "crm-layout bg-[#f0f4f9]"
      }`}
    >
      {/* Unified Dark Navy DfcSidebar for Desktop & Mobile Drawer */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Mobile Header Only - Hidden on Desktop because Profile is pinned in the Sidebar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 py-2 flex items-center justify-between shadow-2xs">
          <Header
            toggleMobileSidebar={() => setMobileMenuOpen(true)}
            toggleSidebar={() => {}}
          />
        </header>

        {/* Page Container */}
        <main className="p-3 sm:p-4 flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-[calc(100vh-120px)]">{children}</div>
          <div className="pt-2 mt-auto">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
