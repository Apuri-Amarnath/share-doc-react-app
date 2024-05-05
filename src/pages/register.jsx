import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/RegisterPage.css"; // Import custom CSS file
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/profile");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.registerUserWithEmailAndPassword(
        email,
        password
      );
      console.log(result);
      setSuccessMessage("User created successfully");
      setMessageClassName("alert alert-success");
    } catch (error) {
      setSuccessMessage("User creation was unsuccessful, try again");
      setMessageClassName("alert alert-warning");
    }
  };

  return (
    <div className="register-page bg-primary">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-white rounded">
              <div className="card-body">
                <h2 className="text-center mb-4">Register</h2>
                {successMessage && (
                  <div className={messageClassName}>{successMessage}</div>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <div className="d-grid mx-3">
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Create Account
                    </Button>
                    <p className="text-center mt-3">Already have an account?</p>
                    <Button variant="warning" href="/login">
                      Login
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
