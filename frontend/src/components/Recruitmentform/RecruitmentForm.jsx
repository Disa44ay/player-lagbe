import React, { useState } from 'react';
import './RecruitmentForm.css';

const RecruitmentForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [members, setMembers] = useState(0); // State for members

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

          <div className="form-group">
            <label htmlFor="members">Required Members:</label>
            <div className="member-buttons">
              <button type="button" className="btn-minus" onClick={decrementMembers}>-</button>
              <input type="number" id="members" value={members} min="0" readOnly />
              <button type="button" className="btn-plus" onClick={incrementMembers}>+</button>
            </div>
          </div>
          
          <button type="submit" className="btn-recruit">Recruit</button>
        </form>
      </div>
    </section>
  );
};

export default RecruitmentForm;
