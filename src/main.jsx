import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import StudentProvider from "./context/StudentContext";
import PaymentProvider from "./context/PaymentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <StudentProvider>
        <PaymentProvider>
          <App />
        </PaymentProvider>
      </StudentProvider>
    </AuthProvider>
  </StrictMode>,
);
