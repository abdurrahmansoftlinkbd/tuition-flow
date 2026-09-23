import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200/40">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
