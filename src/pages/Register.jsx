// Register.js
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/login");
    } catch {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="auth-input" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="auth-input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="auth-input" />
        <button className="auth-button">Register</button>
        <button type="button" className="back-home" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </form>
    </div>
  );
}
