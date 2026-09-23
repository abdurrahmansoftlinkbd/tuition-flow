import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const GoogleButton = () => {
  const { loginWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await loginWithGoogle();
    } catch (error) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else {
        setError("Unable to sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn btn-outline w-full"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Connecting to Google...
          </>
        ) : (
          <>
            {/* Google Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.7-.06-1.37-.18-2.02H12v3.82h5.24a4.48 4.48 0 01-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.19z"
              />
              <path
                fill="#34A853"
                d="M12 21c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0012 21z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.08A5.86 5.86 0 016.23 12c0-.37.06-.73.15-1.08V8.39H3.29A9.01 9.01 0 002.25 12c0 1.45.35 2.82 1.04 4.03l3.25-2.95z"
              />
              <path
                fill="#EA4335"
                d="M12 6.89c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.97 14.63 3 12 3a9.75 9.75 0 00-8.71 5.39l3.25 2.53C6.31 8.61 8.46 6.89 12 6.89z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>

      {error && <p className="mt-2 text-center text-xs text-error">{error}</p>}
    </div>
  );
};

export default GoogleButton;
