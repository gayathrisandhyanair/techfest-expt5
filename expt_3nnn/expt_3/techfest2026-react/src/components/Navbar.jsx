import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="site-brand" onClick={closeMenu}>
          TechFest <span>2026</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>

        <div
          id="site-menu"
          className={`site-menu ${menuOpen ? "is-open" : ""}`}
        >
          <div className="site-links">
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/events" onClick={closeMenu}>
              Events
            </NavLink>
            <NavLink to="/gallery" onClick={closeMenu}>
              Gallery
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
            <NavLink to="/my-registrations" onClick={closeMenu}>
              My Registrations
            </NavLink>
          </div>

          <div className="site-actions">
            <NavLink
              to="/login"
              className="nav-login"
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <Link
              to="/signup"
              className="nav-signup"
              onClick={closeMenu}
            >
              Sign Up
            </Link>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } theme`}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;