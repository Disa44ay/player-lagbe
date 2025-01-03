import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Storecontext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Teams");
  const { token, setToken } = useContext(Storecontext);
  const navigate = useNavigate();

  // Handle navigation to the cart
  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the Cart page
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(""); // Clear the token
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo_new_t_bg} className="logo" alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Teams")}
          className={menu === "Teams" ? "active" : ""}
        >
          <Link to="/teams">Teams</Link>
        </li>
        <li
          onClick={() => setMenu("Manager")}
          className={menu === "Manager" ? "active" : ""}
        >
          <Link to="/manager">Manager</Link>
        </li>
        <li
          onClick={() => setMenu("Profile")}
          className={menu === "Profile" ? "active" : ""}
        >
          <Link to="/profile">Profile</Link>
        </li>
        <li
          onClick={() => setMenu("Shop")}
          className={menu === "Shop" ? "active" : ""}
        >
          <Link to="/shop">Shop</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon" onClick={handleCartClick}>
          <Link to="/cart">
            <img src={assets.icon_cart} alt="Cart Icon" />
          </Link>
          <div className="dot"></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign-in</button>
        ) : (
          <div className="navbar-logout">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
