import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: "students",
        element: <div className="text-2xl font-bold">Students Page</div>,
      },

      {
        path: "payments",
        element: <div className="text-2xl font-bold">Payments Page</div>,
      },

      {
        path: "attendance",
        element: <div className="text-2xl font-bold">Attendance Page</div>,
      },

      {
        path: "schedule",
        element: <div className="text-2xl font-bold">Schedule Page</div>,
      },

      {
        path: "reports",
        element: <div className="text-2xl font-bold">Reports Page</div>,
      },

      {
        path: "settings",
        element: <div className="text-2xl font-bold">Settings Page</div>,
      },

      {
        path: "profile",
        element: <div className="text-2xl font-bold">Profile Page</div>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
