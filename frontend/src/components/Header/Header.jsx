import React, { useContext } from "react";
import "./Header.css";
import AuthContext from "../../Context/AuthContext";

const Header = ({ setShowLogin }) => {
  const { isLoggedIn, user } = useContext(AuthContext); // Destructure values from AuthContext

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
          <button onClick={() => setShowLogin(true)}>Register Now!</button>
        ) : (
          // Show welcome message with username if logged in
          <p className="welcome-message">
            Welcome,You are all set to find your next match!
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
