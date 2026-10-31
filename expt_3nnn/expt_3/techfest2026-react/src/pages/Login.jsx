import { useState } from "react";
import axios from "axios";

const API = "/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        API + "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setPassword("");
      setMessage("Welcome " + res.data.name);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Server not reachable"
      );
    }
  }

  return (
    <div className="page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p role="status">{message}</p>
      </form>
    </div>
  );
}

export default Login;