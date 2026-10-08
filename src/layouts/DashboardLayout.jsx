import { Outlet } from "react-router";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex min-h-screen flex-col bg-base-200/40">
        <DashboardNavbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
