import { Link } from "react-router-dom";

const DashboardNavbar = ({ onMenuClick }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-base-200 bg-base-100 px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="btn btn-ghost btn-square lg:hidden"
          aria-label="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div>
          <p className="text-xs text-base-content/50">Dashboard</p>
          <h1 className="text-sm font-semibold sm:text-base">Overview</h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification */}
        <button className="btn btn-ghost btn-circle" aria-label="Notifications">
          <div className="indicator">
            <span className="indicator-item h-2.5 w-2.5 rounded-full bg-error" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
              />
            </svg>
          </div>
        </button>

        {/* User */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-base-200"
          >
            <div className="avatar placeholder">
              <div className="w-9 rounded-full bg-primary text-primary-content">
                <span className="text-xs font-semibold">AR</span>
              </div>
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold">Abdur Rahman</p>
              <p className="text-xs text-base-content/50">Tutor</p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden h-4 w-4 text-base-content/50 sm:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
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
              <button className="text-error">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
