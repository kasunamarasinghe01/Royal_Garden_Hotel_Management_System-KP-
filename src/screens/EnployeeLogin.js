import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../config/axios";
import {toast} from 'react-toastify'
import useAuthContext from "../hooks/useAuthContext";


function EmployeeLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useAuthContext();

  const handleLogin = async e => {
    e.preventDefault();

    if (!username || !password)
    return toast.error("Both username & password are required");

  try {
    const response = await axiosPublic.post(
      "/auth/login",
      JSON.stringify({ username, password, type: "Employee" })
    );

    console.log(response.data);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {token: response.data.token, user: response.data.user}
    });
    toast.success("Login success");
    navigate('/dashbord');

  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
  }


  }

  return (
    <div className="login w-100  d-flex justify-content-center align-items-center">
      <Form className="login-form shadow w-50 px-4 py-5 mt-5" onSubmit={handleLogin}>
        <h2 className="login-form-title" style={{ textAlign: "center" }}>
          Login
        </h2>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Employee Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Employee Number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <Button type="submit" variant="primary" className="auth-btn">
              {/* disabled=
              {loading || !username.trim() || !password.trim() || !type.trim()} */}
              Login
            </Button>
          </div>

          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-dark btn-sm mb-3"
              onClick={() => navigate("/home")}
            >
              &larr; Back to Home Page
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EmployeeLogin;
