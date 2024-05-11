import React from "react";
import Navbar from "../components/navbar";
import { useFirebase } from "../context/firebase";
const Profile = () => {
  const firebase = useFirebase();
  const user = firebase.getCurrentUser();
  return (
    <>
      <Navbar />
      <div className="Container text-center">
        <div className="Container p-4 bg-secondary">
          <h3>
            welcome to share doc react-app
            <span className="bg-dark text-warning p-2 rounded ms-3">
              {user.email}
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Profile;
