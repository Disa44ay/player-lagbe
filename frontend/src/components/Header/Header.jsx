import React from "react";
import "./Header.css";

const Header = ({ setShowLogin, isLoggedIn }) => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Player Lagbe</h2>
        <p>
          Where Players Meet Games! <br />
          Discover a platform designed to connect players seamlessly, <br />
          making it effortless to find your next game.
        </p>
        {!isLoggedIn ? (
          // Show "Register Now" button if not logged in
          <button onClick={() => setShowLogin(true)}>register now!</button>
        ) : (
          // Show welcome message if logged in
          <p className="welcome-message">Welcome, you are all set to find your next match!</p>
        )}
      </div>
    </div>
  );
};

export default Header;
