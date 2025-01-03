import React, { useState, useContext } from "react";
import axios from "axios";
import "./TeamRecruitmentForm.css";
import { RecruitmentContext } from "../../Context/RecruitmentContext";  
import { AuthContext } from "../../Context/AuthContext"; // Import AuthContext

const TeamRecruitmentForm = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [teamSize, setTeamSize] = useState(0); 
  const [venue, setVenue] = useState("");
  const [slotFee, setSlotFee] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");

  const { setAvailableGames, loading, error } = useContext(RecruitmentContext); 
  const { isManager } = useContext(AuthContext); // Access isManager from AuthContext

  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const incrementTeamSize = () => setTeamSize(teamSize + 1);
  const decrementTeamSize = () => {
    if (teamSize > 0) setTeamSize(teamSize - 1);
  };

  const isFutureDate = () => {
    const now = new Date();
    const selectedDate = new Date(date);
    const selectedStartTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${startTime}`);
    return selectedStartTime > now;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFutureDate()) {
      alert("You cannot post recruitment for a time that is before the current time.");
      return;
    }

    const formattedDate = new Date(date).toISOString();

    const recruitmentData = {
      venue,
      slotFee,
      date: formattedDate,
      startTime,
      endTime,
      contact,
      isTeamRecruitment: true, 
      teamSize, 
    };

    try {
      const response = await axios.post("https://player-lagbe-backend.onrender.com/api/recruitment/add", recruitmentData);
      if (response.data.success) {
        alert("Team recruitment posted successfully!");
      } else {
        alert("Error posting team recruitment!");
      }
    } catch (error) {
      console.error("Error posting recruitment:", error.response ? error.response.data : error.message);
      alert("Failed to post team recruitment");
    }
  };

  return (
    <section className="recruitment-info">
      <div className="container">
        {/* Conditional Header */}
        <h2 className="text-center">{isManager ? "Team Recruitment" : "Team Recruitment"}</h2>
        {!isManager && (
          <p className="inactive-message">
            *Become a manager to post team recruitment
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="venue">Venue:</label>
            <input
              type="text"
              id="venue"
              placeholder="Enter venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              disabled={!isManager} // Disable input if not manager
            />
          </div>

          <div className="form-group">
            <label htmlFor="slotFee">Slot Fee:</label>
            <input
              type="text"
              id="slotFee"
              placeholder="Slot (per-team)"
              value={slotFee}
              onChange={(e) => setSlotFee(e.target.value)}
              required
              disabled={!isManager} // Disable input if not manager
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={!isManager} // Disable input if not manager
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <div className="time-input">
              <input
                type="text"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
                placeholder="Start Time (HH:MM:SS)"
                pattern="\d{2}:\d{2}:\d{2}"
                required
                disabled={!isManager} // Disable input if not manager
              />
              <span className="time-separator">-</span>
              <input
                type="text"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
                placeholder="End Time (HH:MM:SS)"
                pattern="\d{2}:\d{2}:\d{2}"
                required
                disabled={!isManager} // Disable input if not manager
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="teamSize">Team Size (without substitutions):</label>
            <div className="member-buttons">
              <button
                type="button"
                className="btn-minus"
                onClick={decrementTeamSize}
                disabled={!isManager} // Disable button if not manager
              >
                -
              </button>
              <input type="number" id="teamSize" value={teamSize} min="0" readOnly />
              <button
                type="button"
                className="btn-plus"
                onClick={incrementTeamSize}
                disabled={!isManager} // Disable button if not manager
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              placeholder="Enter contact details"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={!isManager} // Disable input if not manager
            />
          </div>

          <button type="submit" className={`btn-recruit ${isManager ? "" : "inactive"}`} disabled={!isManager}>
            Recruit
          </button>
          {!isManager && (
            <p className="inactive-message">
              Become a manager to post team recruitment.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default TeamRecruitmentForm;
