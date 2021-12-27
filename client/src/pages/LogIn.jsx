import React, { useState, useContext } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup";
import * as PATHS from "../utils/paths";
import { AuthContext } from "../context/auth.context";
const API_URL = process.env.REACT_APP_SERVER_URL;

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);
  const { logInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    axios
      .post(`${API_URL}/auth/login`, form)
      .then((response) => {
        console.log(`JWT token`, response.data.authToken);

        const token = response.data.authToken;
        logInUser(token);
        navigate(PATHS.HOMEPAGE);
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="username"
          value={username}
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
