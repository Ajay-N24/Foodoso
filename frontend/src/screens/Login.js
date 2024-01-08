import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const jso = await response.json();
    console.log(jso);
    if (!jso.success) {
      alert("invalid credentials");
    } else if (jso.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", jso.authToken);
      navigate("/");
    }
  };
  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            Register yourself
          </Link>
        </form>
      </div>
    </div>
  );
}
