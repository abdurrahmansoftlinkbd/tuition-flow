import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";

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
  // Public Pages
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

  // Protected Pages
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          // Dashboard Overview
          {
            index: true,
            element: <DashboardHome />,
          },

          // Students
          {
            path: "students",
            element: (
              <PlaceholderPage
                title="Students"
                description="Manage all of your tuition students from here."
              />
            ),
          },

          {
            path: "students/add",
            element: (
              <PlaceholderPage
                title="Add Student"
                description="The student creation form will be implemented in the next stage."
              />
            ),
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
                description="The payment recording form will be implemented in the payment module."
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
                description="Manage your upcoming tuition classes and schedules."
              />
            ),
          },

          // Reports
          {
            path: "reports",
            element: (
              <PlaceholderPage
                title="Reports"
                description="View tuition, payment, attendance, and student reports."
              />
            ),
          },

          // Profile
          {
            path: "profile",
            element: (
              <PlaceholderPage
                title="Profile"
                description="Manage your TuitionFlow profile information."
              />
            ),
          },

          // Settings
          {
            path: "settings",
            element: (
              <PlaceholderPage
                title="Settings"
                description="Configure your TuitionFlow account preferences."
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
