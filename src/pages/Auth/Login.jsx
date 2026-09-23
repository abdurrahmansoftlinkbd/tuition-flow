import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import GoogleButton from "../../components/auth/GoogleButton";

const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "No account was found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    default:
      return "Unable to sign in. Please try again.";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      const redirectPath = location.state?.from?.pathname || "/dashboard";

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/40">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-content">
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

              <span className="text-xl font-bold tracking-tight">
                TuitionFlow
              </span>
            </Link>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-base-content/60">
                Sign in to manage your tuition activities.
              </p>
            </div>

            {/* Google */}
            <div className="mt-6">
              <GoogleButton />
            </div>

            {/* Divider */}
            <div className="divider my-6 text-xs text-base-content/40">
              OR CONTINUE WITH EMAIL
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-error py-3 text-sm">
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-6 border-t border-base-200 pt-6 text-center text-sm">
              <span className="text-base-content/60">
                Don't have an account?
              </span>{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create one
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-base-content/50 hover:text-base-content"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
