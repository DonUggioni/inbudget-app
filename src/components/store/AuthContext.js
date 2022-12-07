import React, { createContext, useContext, useEffect, useState } from 'react';
import { ListValuesContext } from './AppContext';

import { auth, db } from '../../firestore/firestore-config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router';
import { collection, doc, setDoc } from 'firebase/firestore';

export const AuthContextValues = createContext(null);

function AuthContext({ children }) {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});
  const appContext = useContext(ListValuesContext);
  const navigate = useNavigate();

  const usersRef = collection(db, 'users');

  console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      localStorage.setItem('userId', currentUser?.uid);
    });
  }, [user]);

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
        });
        localStorage.setItem('userId', user.user.uid);
        setUser(user);
        navigate('/main');
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
      setUser(user);
      navigate('/main');
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function logout() {
    await signOut(auth);
    navigate('/');
  }

  const values = {
    setRegisterEmail,
    setRegisterPassword,
    setLoginEmail,
    setLoginPassword,
    register,
    registerUsername,
    setRegisterUsername,
    user,
    logout,
    login,
  };
  return (
    <AuthContextValues.Provider value={values}>
      {children}
    </AuthContextValues.Provider>
  );
}

export default AuthContext;
