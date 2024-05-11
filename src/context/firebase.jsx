import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
const storage = getStorage(firebaseApp);
const googleAuthprovider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  const registerUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  //console.log(user);

  const uploadFilesToServer = async (files) => {
    // Iterate over each file and upload them individually
    const uploadPromises = files.map(async (file) => {
      const fileRef = ref(storage, `uploads/files/${Date.now()}-${file.name}`);
      const uploadLocation = await uploadBytes(fileRef, file);

      // Assuming user details are properly populated
      return addDoc(collection(firestore, "files"), {
        fileURL: uploadLocation.ref.fullPath,
        name: `${file.name}`,
        userID: user.uid,
        userEmail: user.email,
        uploadedTime: formatDate(Date.now()),
        modifiedTime: formatDate(Date.now()),
        displayName: user.displayName,
        photoURL: user.photoURL || "",
      });
    });

    // Wait for all uploads to complete and return the results
    return Promise.all(uploadPromises);
  };

  const listAllFiles = () => {
    return getDocs(collection(firestore, "files"));
  };

  const isLoggedIn = user ? true : false;

  const getCurrentUser = () => {
    return firebaseAuth.currentUser;
  };

  const signInWithGoogle = () =>
    signInWithPopup(firebaseAuth, googleAuthprovider);

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  // time formater
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <FirebaseContext.Provider
      value={{
        registerUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        signInWithGoogle,
        isLoggedIn,
        uploadFilesToServer,
        listAllFiles,
        getCurrentUser,
        getImageURL,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export default firebaseAuth;
