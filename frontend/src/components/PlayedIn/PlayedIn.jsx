// PlayedIn.jsx
import React from "react";
import "./PlayedIn.css";

const PlayedIn = () => {
  return (
    <div className="played-in">
      <h4>Played In</h4>
      <div className="tournaments">
        <div className="tournament">EFC S1</div>
        <div className="tournament">EFC S2</div>
        <div className="tournament">EPI</div>
        <button className="add-more">Add More...</button>
      </div>

      <h4>Member of</h4>
      <div className="teams">
        <div className="team">RedLocks</div>
        <button className="add-more">Add More...</button>
      </div>
    </div>
  );
};

export default PlayedIn;
