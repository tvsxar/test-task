import { useState } from "react";
import "../styles/LoginForm.scss"; 

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (data.status === 1 && data.token) {
        onLogin(data.token);
      } else {
        setError("Wrong email or password");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Login failed. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Log in</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
      />
      <button type="submit" className="login-button">Log in</button>
      {error && <p className="login-error">{error}</p>}
    </form>
  );
}