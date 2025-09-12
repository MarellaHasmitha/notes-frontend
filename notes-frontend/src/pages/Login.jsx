import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const showMessage = (text, redirect = null) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
      if (redirect) navigate(redirect);
    }, 2000); // 2 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const token = res.data;

      if (!token) {
        setError("❌ No token received from server.");
        return;
      }

      localStorage.setItem("token", token);

      // Trigger Navbar update immediately
      window.dispatchEvent(new Event("login"));

      // Show success message and redirect to NoteForm page
      showMessage("✅ Login successful! Redirecting to Notes...", "/notes/add");
      setError("");
    } 
    catch (err) {
  console.log("Full Error:", err.response); // Debug: see what backend sends
  let backendMsg = "❌ Login failed. Please try again.";

  if (err.response) {
    if (err.response.data) {
      // If backend sends { message: "..." }
      backendMsg = err.response.data.message || err.response.data.error || err.response.data;
    } else {
      backendMsg = `❌ Error ${err.response.status}: ${err.response.statusText}`;
    }
  }

  setError(backendMsg);
}
};

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Login</h2>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
          required
        />

        <button className="auth-button" type="submit">
          Login
        </button>
        <button
          type="button"
          className="back-home"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
}
