import { Link, useLocation, useNavigate } from "react-router";

import { Bell, Menu, ChevronDown } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Tutor";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const getPageInfo = () => {
    const path = location.pathname;

    if (path === "/dashboard") {
      return {
        label: "Dashboard",
        title: "Overview",
      };
    }

    if (path === "/dashboard/students") {
      return {
        label: "Students",
        title: "Students",
      };
    }

    if (path === "/dashboard/students/add") {
      return {
        label: "Students",
        title: "Add Student",
      };
    }

    if (path.startsWith("/dashboard/students/")) {
      return {
        label: "Students",
        title: path.endsWith("/edit") ? "Edit Student" : "Student Details",
      };
    }

    if (path === "/dashboard/payments") {
      return {
        label: "Payments",
        title: "Payments",
      };
    }

    if (path === "/dashboard/payments/add") {
      return {
        label: "Payments",
        title: "Record Payment",
      };
    }

    if (path === "/dashboard/attendance") {
      return {
        label: "Attendance",
        title: "Attendance",
      };
    }

    if (path === "/dashboard/attendance/history") {
      return {
        label: "Attendance",
        title: "Attendance History",
      };
    }

    if (path === "/dashboard/schedule") {
      return {
        label: "Schedule",
        title: "Schedule",
      };
    }

    if (path === "/dashboard/schedule/add") {
      return {
        label: "Schedule",
        title: "Add Class",
      };
    }

    if (path.startsWith("/dashboard/schedule/") && path.endsWith("/edit")) {
      return {
        label: "Schedule",
        title: "Edit Class",
      };
    }

    if (path === "/dashboard/reports") {
      return {
        label: "Reports",
        title: "Reports & Analytics",
      };
    }

    if (path === "/dashboard/profile") {
      return {
        label: "Account",
        title: "Profile",
      };
    }

    if (path === "/dashboard/settings") {
      return {
        label: "Account",
        title: "Settings",
      };
    }

    return {
      label: "Dashboard",
      title: "TuitionFlow",
    };
  };

  const pageInfo = getPageInfo();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-base-200 bg-base-100/95 backdrop-blur">
      <div className="navbar min-h-16 px-4 sm:px-6">
        {/* Left */}
        <div className="flex flex-1 items-center gap-3">
          {/* Mobile Menu */}
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-square lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </label>

          {/* Desktop Drawer Toggle */}
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-square hidden lg:flex"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </label>

          <div>
            <p className="text-xs text-base-content/50">{pageInfo.label}</p>

            <h1 className="text-sm font-semibold sm:text-base">
              {pageInfo.title}
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            aria-label="Notifications"
          >
            <div className="indicator">
              <span className="indicator-item h-2 w-2 rounded-full bg-error" />

              <Bell className="size-5" />
            </div>
          </button>

          {/* Account */}
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-base-200"
            >
              <div className="avatar placeholder">
                <div className="w-9 rounded-full bg-primary text-primary-content">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={displayName} />
                  ) : (
                    <span className="text-xs font-semibold">{initials}</span>
                  )}
                </div>
              </div>

              <div className="hidden max-w-44 text-left sm:block">
                <p className="truncate text-sm font-semibold">{displayName}</p>

                <p className="truncate text-xs text-base-content/50">
                  {user?.email}
                </p>
              </div>

              <ChevronDown className="hidden size-4 text-base-content/50 sm:block" />
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-200 bg-base-100 p-2 shadow-lg"
            >
              <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li>

              <li>
                <Link to="/dashboard/settings">Settings</Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-error"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
