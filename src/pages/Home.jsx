// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="title">Welcome to Notes App</h1>
        <p className="subtitle">Organize your thoughts effectively ✨</p>
        <button className="start-btn" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>
    </div>
  );
}
