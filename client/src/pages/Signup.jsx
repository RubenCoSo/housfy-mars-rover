import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import * as PATHS from "../utils/paths";
const API_URL = process.env.REACT_APP_SERVER_URL;


export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    email:"",
    password: "",
  });
  const { username, email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    axios
      .post(`${API_URL}/auth/signup`, form)
      .then((createdUser) => {
        console.log(createdUser);
        navigate(PATHS.LOGINPAGE);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="Text"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="text"
          name="email"
          placeholder="Text"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
