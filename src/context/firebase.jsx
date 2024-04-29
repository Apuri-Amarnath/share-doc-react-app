import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
//firebase context creation
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCcnA7w9-iN_Nm7y5RF4ZDu93FMePgGCO8",
  authDomain: "share-doc-2d6aa.firebaseapp.com",
  projectId: "share-doc-2d6aa",
  storageBucket: "share-doc-2d6aa.appspot.com",
  messagingSenderId: "1004226598069",
  appId: "1:1004226598069:web:71d7472b74cf3a3e52dafc",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleAuthprovider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const registerUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithGoogle = ()=>signInWithPopup(firebaseAuth,googleAuthprovider)
  return (
    <FirebaseContext.Provider
      value={{
        registerUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        signInWithGoogle,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
