import React, { useState } from 'react';
import './RecruitmentForm.css';

const RecruitmentForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [members, setMembers] = useState(0);
  const [isTeamRecruitment, setIsTeamRecruitment] = useState(false); // Toggle between solo and team recruitment

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const incrementMembers = () => {
    setMembers(members + 1);
  };

  const decrementMembers = () => {
    if (members > 0) {
      setMembers(members - 1);
    }
  };

  const toggleRecruitmentType = () => {
    setIsTeamRecruitment((prev) => !prev);
  };

  return (
    <section className="recruitment-info">
      <div className="container">
        <h2 className="text-center">Recruitment Info</h2>
        <form action="#">
          <div className="form-group">
            <label htmlFor="venue">Venue:</label>
            <input type="text" id="venue" placeholder="Enter venue" />
          </div>

          <div className="form-group">
            <label htmlFor="slotFee">Slot Fee:</label>
            <input type="text" id="slotFee" placeholder="Slot (per-person)" />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" />
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
              />
            </div>
          </div>

          {isTeamRecruitment ? (
            <>
              <div className="form-group">
                <label htmlFor="teamA">Team (A Side):</label>
                <input type="text" id="teamA" placeholder="Player per team (without sub)" />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact:</label>
                <input type="text" id="contact" placeholder="Enter contact details" />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="members">Required Members:</label>
              <div className="member-buttons">
                <button type="button" className="btn-minus" onClick={decrementMembers}>
                  -
                </button>
                <input type="number" id="members" value={members} min="0" readOnly />
                <button type="button" className="btn-plus" onClick={incrementMembers}>
                  +
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="btn-recruit">
            Recruit
          </button>
        </form>
        <p className="toggle-recruitment" onClick={toggleRecruitmentType}>
          {isTeamRecruitment
            ? 'Recruit solo players? Click here'
            : 'Play against a team? Click here'}
        </p>
      </div>
    </section>
  );
};

export default RecruitmentForm;
