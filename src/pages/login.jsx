import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
    navigate("/profile")
    }
  }, [firebase,navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.loginUserWithEmailAndPassword(
        email,
        password
      );
      console.log(result);
      setSuccessMessage("User login successful");
      setMessageClassName("alert alert-success");
    } catch (error) {
      setSuccessMessage("User not found, try again");
      setMessageClassName("alert alert-warning");
    }
  };

  return (
    <div className="login-page bg-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 ">
            <div className="card bg-white rounded">
              <div className="card-body ">
                <h2 className="text-center mb-4">Login</h2>
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
                  <div className="d-grid">
                    <Button
                      onClick={handleSubmit}
                      variant="success"
                      type="submit"
                    >
                      Login
                    </Button>
                    <p className="text-center mt-3">OR</p>
                    <Button
                      variant="danger"
                      onClick={firebase.signInWithGoogle}
                    >
                      Sign In With Google
                    </Button>
                    <p className="text-center mt-3">New User?</p>
                    <Button variant="warning" href="/" block>
                      Register
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

export default LoginPage;
