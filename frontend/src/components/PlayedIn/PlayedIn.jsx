// PlayedIn.jsx
import React from "react";
import "./PlayedIn.css";

const PlayedIn = () => {
  return (
    <div className="played-in">
      <h4>Tournaments Played</h4>
      <div className="tournaments">
        <div
          className="tournament-slot"
          style={{
            backgroundImage:
              "url(https://www.yakagency.com/assets/Uploads/UCL-logo.jpg)",
          }}
        >
          <span className="tournament-label">UCL</span>
        </div>
        <div
          className="tournament-slot"
          style={{
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_GqONRemZpdH60AcYNjBMD5LL5hR5pROow&s)",
          }}
        >
          <span className="tournament-label">EPL</span>
        </div>
        <div
          className="tournament-slot"
          style={{
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtJC8bpqkPJDQeURDLASYBU5B_1jlrQLVmA&s)",
          }}
        >
          <span className="tournament-label">FA Cup</span>
        </div>
        <button className="add-more">
          <i className="fa fa-plus"></i> Add More...
        </button>
      </div>

      <h4>Member of</h4>
      <div className="teams">
        <div
          className="team-slot"
          style={{
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL9wM-hkqjW6Oh-GYJ32kWInYJj_fVrzsZfw&s)",
          }}
        >
          <span className="team-label">Chelsea</span>
        </div>
        <button className="add-more">
          <i className="fa fa-plus"></i> Add More...
        </button>
      </div>
    </div>
  );
};

export default PlayedIn;
