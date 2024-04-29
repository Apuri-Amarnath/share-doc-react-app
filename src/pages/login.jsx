import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const LoginPage = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.loginUserWithEmailAndPassword(
        email,
        password
      );
      console.log(result);
      setSuccessMessage("user login Successfull");
      setMessageClassName("alert alert-success");
    } catch (error) {
      setSuccessMessage("user not found, try Again");
      setMessageClassName("alert alert-warning");
    }
  };
  // console.log(firebase);
  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center border border-secondary">
          <h2 className="bg-info p-2 text-center">Login page</h2>
          {successMessage && (
            <div className={messageClassName}>{successMessage}</div>
          )}
          <Form className="mb-2">
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
            <Button
              onClick={handleSubmit}
              variant="success"
              className="text-light"
              type="submit"
            >
              Login
            </Button>
          </Form>
          <div className="container mb-3">
            <h5>OR</h5>
            <Button variant="danger" onClick={firebase.signInWithGoogle}>Sign In With Google</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
