import { NavLink, useLocation } from "react-router";

import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/dashboard/students",
      icon: GraduationCap,
    },
    {
      name: "Payments",
      path: "/dashboard/payments",
      icon: CircleDollarSign,
    },
    {
      name: "Attendance",
      path: "/dashboard/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Schedule",
      path: "/dashboard/schedule",
      icon: CalendarDays,
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: BarChart3,
    },
  ];

  const closeDrawerOnMobile = () => {
    const drawer = document.getElementById("dashboard-drawer");

    if (drawer) {
      drawer.checked = false;
    }
  };

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      {/* Mobile Overlay */}
      <label
        htmlFor="dashboard-drawer"
        aria-label="Close sidebar"
        className="drawer-overlay"
      />

      {/* Sidebar */}
      <div className="flex min-h-full flex-col bg-base-100 is-drawer-close:w-16 is-drawer-open:w-64">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-base-200 px-3">
          <NavLink
            to="/dashboard"
            onClick={closeDrawerOnMobile}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-content">
              <span className="text-lg font-bold">T</span>
            </div>

            <div className="overflow-hidden is-drawer-close:hidden">
              <p className="truncate text-lg font-bold tracking-tight">
                TuitionFlow
              </p>

              <p className="truncate text-xs text-base-content/40">
                Tuition management
              </p>
            </div>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-base-content/40 is-drawer-close:hidden">
            Menu
          </p>

          <ul className="menu w-full gap-1 p-0">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={closeDrawerOnMobile}
                    title={item.name}
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                      }`
                    }
                    data-tip={item.name}
                  >
                    <Icon className="size-5 shrink-0" />

                    <span className="is-drawer-close:hidden">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="border-t border-base-200 p-2">
          <NavLink
            to="/dashboard/settings"
            onClick={closeDrawerOnMobile}
            title="Settings"
            className={({ isActive }) =>
              `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center ${
                isActive
                  ? "bg-base-200 text-base-content"
                  : "text-base-content/70 hover:bg-base-200"
              }`
            }
            data-tip="Settings"
          >
            <Settings className="size-5 shrink-0" />

            <span className="is-drawer-close:hidden">Settings</span>
          </NavLink>
        </div>

        {/* Desktop Collapse Button */}
        <div className="hidden border-t border-base-200 p-2 lg:block">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-sm w-full justify-start is-drawer-close:justify-center"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className="size-5 transition-transform is-drawer-close:rotate-180" />

            <span className="is-drawer-close:hidden">Collapse</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
