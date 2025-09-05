// Login.js
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch {
      alert("Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="auth-input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="auth-input" />
        <button className="auth-button">Login</button>
        <button type="button" className="back-home" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </form>
    </div>
  );
}
