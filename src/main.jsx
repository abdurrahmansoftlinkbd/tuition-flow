import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";

import AuthProvider from "./context/AuthContext";
import StudentProvider from "./context/StudentContext";
import PaymentProvider from "./context/PaymentContext";
import AttendanceProvider from "./context/AttendanceContext";
import ScheduleProvider from "./context/ScheduleContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <StudentProvider>
        <PaymentProvider>
          <AttendanceProvider>
            <ScheduleProvider>
              <App />
            </ScheduleProvider>
          </AttendanceProvider>
        </PaymentProvider>
      </StudentProvider>
    </AuthProvider>
  </StrictMode>,
);
