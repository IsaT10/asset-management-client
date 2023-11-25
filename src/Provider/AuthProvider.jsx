import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from '../Config/Firebase';
// import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);

    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  const userProfileUpdate = (name, image) => {
    setLoading(true);

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const verifyEmail = () => {
    setLoading(true);

    return sendEmailVerification(auth.currentUser);
  };

  const resetPassword = (email) => {
    setLoading(true);

    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logIn,
        googleSignIn,
        logOut,
        userProfileUpdate,
        verifyEmail,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
