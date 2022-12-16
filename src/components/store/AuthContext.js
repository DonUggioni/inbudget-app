import React, { createContext, useContext, useEffect, useState } from "react";
import { ListValuesContext } from "./AppContext";

import { auth, db } from "../../firestore/firestore-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export const AuthContextValues = createContext(null);

function AuthContext({ children }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const appContext = useContext(ListValuesContext);
  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        appContext.setUser(currentUser);
        localStorage.setItem("userId", currentUser.uid);
        navigate("/main");
        appContext.getInitialBudget();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.user]);

  async function register() {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      if (user) {
        await setDoc(doc(usersRef, user.user.uid), {
          userId: user.user.uid,
          username: registerUsername,
          email: registerEmail,
          image: null,
        });
        appContext.setUser(user);
        localStorage.setItem("userId", user.user.uid);
        navigate("/main");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function login() {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (user) {
        appContext.setUser(user);
        localStorage.setItem("userId", user.user.uid);
        appContext.getInitialBudget();
        navigate("/main");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  // Google authentication
  const googleAuth = new GoogleAuthProvider();

  async function googleSignUp() {
    try {
      const data = await signInWithPopup(auth, googleAuth);
      const user = data.user;
      if (user) {
        await setDoc(doc(usersRef, user.uid), {
          userId: user.uid,
          username: user.displayName,
          email: user.email,
          image: user.photoURL,
        });
        appContext.setUser(user);
        localStorage.setItem("userId", user.uid);

        navigate("/main");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function googleLogin() {
    try {
      const data = await signInWithPopup(auth, googleAuth);
      const user = data.user;

      if (user) {
        await updateDoc(doc(usersRef, user.uid), {
          userId: user.uid,
          username: user.displayName,
          email: user.email,
          image: user.photoURL,
        });
        localStorage.setItem("userId", user.uid);
        appContext.setUser(user);
        appContext.getInitialBudget();
        navigate("/main");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  const values = {
    setRegisterEmail,
    setRegisterPassword,
    setLoginEmail,
    setLoginPassword,
    register,
    registerUsername,
    setRegisterUsername,
    logout,
    login,
    googleSignUp,
    googleLogin,
  };
  return (
    <AuthContextValues.Provider value={values}>
      {children}
    </AuthContextValues.Provider>
  );
}

export default AuthContext;
