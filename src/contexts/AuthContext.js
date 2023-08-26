import { createContext, useContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function singin_with_google({ target }) {
    target.parentElement.setAttribute("disabled", "true");

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      setCurrentUser({ ...user });
      navigator("/");
    } catch (error) {
      console.dir(error);
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Closed");
        target.parentElement.removeAttribute("disabled");
      }
    }
  }

  async function signin_with_facebook({ target }) {
    target.parentElement.setAttribute("disabled", "true");

    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;

      setCurrentUser({ ...user });
      let a = document.createElement("a");
      a.setAttribute("href", "/");
      a.click();
    } catch (error) {
      console.dir(error);
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Closed");
        target.parentElement.removeAttribute("disabled");
      }
    }
  }

  function singin_with_email_password(email, password) {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Signout

  async function sign_out() {
    const auth = getAuth(app);
    return signOut(auth);
  }

  const value = {
    currentUser,
    singin_with_google,
    signin_with_facebook,
    singin_with_email_password,
    sign_out,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
