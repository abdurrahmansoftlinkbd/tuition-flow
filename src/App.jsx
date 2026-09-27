import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";

import Students from "./pages/Dashboard/Students/Students";
import AddStudent from "./pages/Dashboard/Students/AddStudent";
import StudentDetails from "./pages/Dashboard/Students/StudentDetails";
import EditStudent from "./pages/Dashboard/Students/EditStudent";

import Payments from "./pages/Dashboard/Payments/Payments";
import AddPayment from "./pages/Dashboard/Payments/AddPayment";

import Attendance from "./pages/Dashboard/Attendance/Attendance";
import AttendanceHistory from "./pages/Dashboard/Attendance/AttendanceHistory";

import Schedule from "./pages/Dashboard/Schedule/Schedule";
import AddSchedule from "./pages/Dashboard/Schedule/AddSchedule";
import EditSchedule from "./pages/Dashboard/Schedule/EditSchedule";

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

  // Protected Dashboard
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          // Overview
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
            element: <Payments />,
          },

          {
            path: "payments/add",
            element: <AddPayment />,
          },

          // Attendance
          {
            path: "attendance",
            element: <Attendance />,
          },

          {
            path: "attendance/history",
            element: <AttendanceHistory />,
          },

          // Schedule
          {
            path: "schedule",
            element: <Schedule />,
          },

          {
            path: "schedule/add",
            element: <AddSchedule />,
          },

          {
            path: "schedule/:id/edit",
            element: <EditSchedule />,
          },

          // Reports
          {
            path: "reports",
            element: (
              <PlaceholderPage
                title="Reports"
                description="View tuition, attendance, and student reports."
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
