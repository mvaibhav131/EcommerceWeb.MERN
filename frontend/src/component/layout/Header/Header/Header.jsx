import React from "react";
import logo from "../../../images/blog-shopify.jpg";
import search from "../../../images/search.webp";
import profile from "../../../images/profile.png";
import cart from "../../../images/carts.png";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {

 
  return (
    <div>
      <nav class="navbarhead">
        <div class="container-fluid ">
          <span class="navbar-text">
        </span>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="d-flex">
            <Link to="/">
              <img
                src={logo}
                 alt="navbarlogo"
                className="logo"
              />
            </Link>
        </div>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            
            <ul className="navbar-nav">
            <div className="options">
              <li className="nav-item">
                <Link to="/" className="nav-link mx-2" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link mx-2" aria-current="page">
                 Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link mx-2" aria-current="page">
                 Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link mx-2" aria-current="page">
                  About
                </Link>
              </li>
              </div>
              <div className="icons"></div>
              <Link to="/search">
              <img
                src={search}
                 alt="navbarlogo"
                className="log"
              />
            </Link>
            <Link to="/profile">
              <img
                src={profile}
                 alt="navbarlogo"
                className="log"
              />
            </Link>
            <Link to="/cart">
              <img
                src={cart}
                 alt="navbarlogo"
                className="log"
              />
            </Link>
             </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;