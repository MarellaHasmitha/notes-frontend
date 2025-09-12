import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial check
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for login/logout events
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("logout")); // trigger Navbar update
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        NotesApp
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/notes/add">Notes</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && (
          <button onClick={handleLogoutClick} className="btn btn-red">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
