import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseAuth, { useFirebase } from "../context/firebase";
import "../styles/navbar.css";

const auth = firebaseAuth;
const Navbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase.isLoggedIn, navigate]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          Document Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item rounded ">
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
        </div>
        <div className="nav-item">
          <button
            type="button"
            className="btn btn-dark text-light"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
