import { createContext, useContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Email + Password Registration
  const register = async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const newUser = userCredential.user;

    await updateProfile(newUser, {
      displayName: name,
    });

    return newUser;
  };

  // Email + Password Login
  const login = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  };

  // Google Login
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    return result.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthProvider;
