import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Document Management
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            <Link className="btn btn-outline-success" to="/login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
