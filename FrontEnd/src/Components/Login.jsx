import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!login || !password) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        { login, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { msg, token } = response.data;
      if (msg === "ok" && token) {
        localStorage.setItem("authToken", token);
        setSuccess("Login successful!");
        setLogin("");
        setPassword("");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inscription-container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">Log In</h2>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="success" role="alert">
            {success}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            placeholder="Enter your username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="subbtn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default Login;
