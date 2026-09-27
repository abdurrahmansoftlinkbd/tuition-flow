import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";

import Students from "./pages/Dashboard/Students/Students";
import AddStudent from "./pages/Dashboard/Students/AddStudent";
import StudentDetails from "./pages/Dashboard/Students/StudentDetails";
import EditStudent from "./pages/Dashboard/Students/EditStudent";

import ProtectedRoute from "./routes/ProtectedRoute";

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        <p className="mt-2 text-sm text-base-content/60">{description}</p>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  // Public
  {
    path: "/",
    element: <Home />,
  },

  // Authentication
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  // Protected
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },

          // Students
          {
            path: "students",
            element: <Students />,
          },

          {
            path: "students/add",
            element: <AddStudent />,
          },

          {
            path: "students/:id",
            element: <StudentDetails />,
          },

          {
            path: "students/:id/edit",
            element: <EditStudent />,
          },

          // Payments
          {
            path: "payments",
            element: (
              <PlaceholderPage
                title="Payments"
                description="View and manage your tuition payment records."
              />
            ),
          },

          {
            path: "payments/add",
            element: (
              <PlaceholderPage
                title="Record Payment"
                description="Record a new tuition payment."
              />
            ),
          },

          // Attendance
          {
            path: "attendance",
            element: (
              <PlaceholderPage
                title="Attendance"
                description="Track student attendance and class participation."
              />
            ),
          },

          // Schedule
          {
            path: "schedule",
            element: (
              <PlaceholderPage
                title="Schedule"
                description="Manage your upcoming tuition classes."
              />
            ),
          },

          // Reports
          {
            path: "reports",
            element: (
              <PlaceholderPage
                title="Reports"
                description="View tuition and student reports."
              />
            ),
          },

          // Profile
          {
            path: "profile",
            element: (
              <PlaceholderPage
                title="Profile"
                description="Manage your TuitionFlow profile."
              />
            ),
          },

          // Settings
          {
            path: "settings",
            element: (
              <PlaceholderPage
                title="Settings"
                description="Manage your account preferences."
              />
            ),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
