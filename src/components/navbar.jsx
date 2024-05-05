import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseAuth, { useFirebase } from "../context/firebase";

const auth = firebaseAuth;
const Navbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false); // State to track menu active status

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase.isLoggedIn, navigate]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Document Management
        </Link>
        <button
          className={`navbar-toggler ${menuActive ? "active" : ""}`} // Add "active" class if menu is active
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setMenuActive(!menuActive)} // Toggle menu active status
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${menuActive ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                Upload Document
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/update">
                Update Document
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/share">
                Share Document
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button
              type="button"
              className={`btn ${
                menuActive ? "btn-dark" : "btn-outline-success"
              }`} // Change button color based on menu active status
              onClick={() => signOut(auth)}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
