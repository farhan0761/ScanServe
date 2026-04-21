import React, { useState } from "react";
import "./Main.css";
import { Link, useNavigate } from "react-router-dom";

export default function Main_page({ cart = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="main-page-container">
      <nav className="navbar">

        <div className="sec-glass">
          <p className="logo-p" onClick={() => navigate("/")}>
            Flavour Hub
          </p>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
          <li className="logo" onClick={() => navigate("/")}>
            Flavour Hub
          </li>

          <Link onClick={() => setMenuOpen(false)} to="/">
            <li className="nav-item">Home</li>
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/menu">
            <li className="nav-item">Main Menu</li>
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/about">
            <li className="nav-item">About Us</li>
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/contact">
            <li className="nav-item">Contact Us</li>
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/cart">
            <li className="nav-item">
              Your Food ({cart.length})
            </li>
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/book">
            <li>
              <button className="book-btn">Book a Table</button>
            </li>
          </Link>
        </ul>

      </nav>
    </div>
  );
}