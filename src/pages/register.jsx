import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/RegisterPage.css"; // Import custom CSS file
import { useFirebase } from "../context/firebase";
const RegisterPage = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.registerUserWithEmailAndPassword (
        email,
        password
      );
      console.log(result);
      setSuccessMessage("user created successfull");
      setMessageClassName("alert alert-success");
    } catch (error) {
      setSuccessMessage("User creation was unsuccessfull, try Again");
      setMessageClassName("alert alert-warning");
    }
  };
  // console.log(firebase);
  return (
    <div className="register-page">
      <div className="container ">
        <div className="row justify-content-center align-items-center border border-secondary">
          <h2 className="bg-info p-2 text-center">Register page</h2>
          {successMessage && (
            <div className={messageClassName}>{successMessage}</div>
          )}
          <Form className="mb-2" onSubmit={handleSubmit}>
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
            <Button variant="success" className="text-light" type="submit">
              Create Account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
