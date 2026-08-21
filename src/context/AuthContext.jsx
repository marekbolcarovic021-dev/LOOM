import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REGISTER
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // LOGIN
  const login = async (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // LOGOUT
  const logout = async () => {
    return signOut(auth);
  };

  // FIREBASE AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log("Firebase user:", user);

        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase auth error:", error);
        setCurrentUser(null);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
