// PlayerCard.jsx
import React, { useState } from "react";
import "./PlayerCard.css";
import "./PopupEdit.css";

const PlayerCard = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="player-card">
      <div
        className="profile-image"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0TN0pPPpBnBFJcoZFNL2pX5TaIcn4SU2aeQ&s')", // Dummy image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <button className="edit-profile" onClick={togglePopup}>
        Edit Profile
      </button>

      <div className="player-info">
        <h1>G O A T</h1>
        <div className="social-links">
          <span className="social-icon">f</span>
          <span className="social-icon">✉</span>
          <span className="social-icon">✆</span>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Edit Profile</h3>
            <input type="text" id="name" placeholder="Name" />
            <input
              type="file"
              id="image"
              accept="image/*"
              placeholder="Profile Image"
            />
            <input type="email" id="email" placeholder="Email" />
            <input type="text" id="facebook" placeholder="Facebook Link" />
            <input type="text" id="instagram" placeholder="Instagram Link" />
            <input type="text" id="contact" placeholder="Phone Number" />
            <button onClick={togglePopup}>Save</button>
            <button onClick={togglePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
