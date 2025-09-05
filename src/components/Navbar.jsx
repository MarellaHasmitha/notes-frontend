// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import Navbar-specific CSS

export default function Navbar() {
  const token = localStorage.getItem("token"); // Check if user is logged in

  return (
    <nav className="navbar">
      {/* App Title / Logo */}
      <Link to="/" className="navbar-logo">
        Notes App
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </>
        )}

        {token && (
          <Link to="/notes" className="navbar-link">
            Notes
          </Link>
        )}
      </div>
    </nav>
  );
}
