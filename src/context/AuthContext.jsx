import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext(null);

const googleProvider =
  new GoogleAuthProvider();

/*
======================================================
FIREBASE AUTH PERSISTENCE

Keep the user logged in on this device.

Firebase stores the authentication session locally.
The user's password is NOT stored by LOOM.
======================================================
*/

const authPersistence =
  setPersistence(
    auth,
    browserLocalPersistence
  );

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
  const [currentUser, setCurrentUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // REGISTER
  const signup = async (
    email,
    password
  ) => {

    await authPersistence;

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // LOGIN
  const login = async (
    email,
    password
  ) => {

    await authPersistence;

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // GOOGLE LOGIN / SIGN UP
  const googleLogin = async () => {

    await authPersistence;

    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // LOGOUT
  const logout = async () => {
    return signOut(auth);
  };

  // FIREBASE AUTH STATE
  useEffect(() => {

    let unsubscribe;

    authPersistence
      .then(() => {

        unsubscribe =
          onAuthStateChanged(
            auth,
            (user) => {

              console.log(
                "Firebase user:",
                user
              );

              setCurrentUser(user);
              setLoading(false);
            },
            (error) => {

              console.error(
                "Firebase auth error:",
                error
              );

              setCurrentUser(null);
              setLoading(false);
            }
          );

      })
      .catch((error) => {

        console.error(
          "Firebase persistence error:",
          error
        );

        setCurrentUser(null);
        setLoading(false);

      });

    return () => {

      if (unsubscribe) {
        unsubscribe();
      }

    };

  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;