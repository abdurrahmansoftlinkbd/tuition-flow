import { NavLink } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: (
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
            d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"
          />
        </svg>
      ),
    },
    {
      name: "Students",
      path: "/dashboard/students",
      icon: (
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
            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm7-1a3 3 0 100-6m4 16v-2a4 4 0 00-3-3.87"
          />
        </svg>
      ),
    },
    {
      name: "Payments",
      path: "/dashboard/payments",
      icon: (
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
            d="M3 7h18M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm4 9h4"
          />
        </svg>
      ),
    },
    {
      name: "Attendance",
      path: "/dashboard/attendance",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm4-4l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      name: "Schedule",
      path: "/dashboard/schedule",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: (
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
            d="M4 19V5m0 14h16M8 15v-4m4 4V8m4 7v-6"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col border-r border-base-200 bg-base-100">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-base-200 px-5">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
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
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>

          <span className="text-lg font-bold tracking-tight">TuitionFlow</span>
        </NavLink>

        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm btn-square lg:hidden"
          aria-label="Close sidebar"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-base-content/40">
          Menu
        </p>

        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-base-200 p-4">
        <NavLink
          to="/dashboard/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-base-200 text-base-content"
                : "text-base-content/70 hover:bg-base-200"
            }`
          }
        >
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
              d="M10.3 4.1l.4-1.1h2.6l.4 1.1a2 2 0 002.8 1l1-.5 1.8 1.8-.5 1a2 2 0 001 2.8l1.1.4v2.6l-1.1.4a2 2 0 00-1 2.8l.5 1-1.8 1.8-1-.5a2 2 0 00-2.8 1l-.4 1.1h-2.6l-.4-1.1a2 2 0 00-2.8-1l-1 .5-1.8-1.8.5-1a2 2 0 00-1-2.8l-1.1-.4V10l1.1-.4a2 2 0 001-2.8l-.5-1 1.8-1.8 1 .5a2 2 0 002.8-1z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
