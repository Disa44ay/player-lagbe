import React, { useState, useContext } from 'react';
import axios from 'axios';
import './RecruitmentForm.css';
import { AuthContext } from '../../Context/AuthContext'; 

const RecruitmentForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [members, setMembers] = useState(0);
  const [venue, setVenue] = useState('');
  const [slotFee, setSlotFee] = useState('');
  const [date, setDate] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const { isLoggedIn } = useContext(AuthContext);  // Get the logged-in status

  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const incrementMembers = () => setMembers(members + 1);
  const decrementMembers = () => {
    if (members > 0) setMembers(members - 1);
  };

  // Function to check if the selected time is at least 6 hours in the future
  const isFutureDateTime = () => {
    const selectedDateTime = new Date(date + 'T' + startTime);
    const currentDateTime = new Date();
    const timeDiff = selectedDateTime - currentDateTime;
    
    return timeDiff >= 6 * 60 * 60 * 1000; // Check if the time difference is 6 hours or more
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFutureDateTime()) {
      setError('The selected date and time must be at least 6 hours in the future.');
      return;
    }

    setError(''); // Clear any previous error

    const formattedDate = new Date(date).toISOString();

    const recruitmentData = {
      venue,
      slotFee,
      date: formattedDate,
      startTime,
      endTime,
      contact,
      isTeamRecruitment: false, // Set this flag to false for solo recruitment
      requiredMembers: members, // Pass the required number of members for solo recruitment
    };

    try {
      const response = await axios.post('https://player-lagbe-backend.onrender.com/api/recruitment/add', recruitmentData);
      if (response.data.success) {
        alert('Solo recruitment posted successfully!');
      } else {
        alert('Error posting solo recruitment!');
      }
    } catch (error) {
      console.error('Error posting recruitment:', error.response ? error.response.data : error.message);
      alert('Failed to post solo recruitment');
    }
  };

  return (
    <section className="recruitment-info">
      <div className="container">
        <h2 className="text-center">Solo Recruitment</h2>
        <p className="note">
                *You cannot post a recruitment for a time that is starting less than 6 hours from now.
              </p>
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="slotFee">Slot Fee:</label>
            <input
              type="text"
              id="slotFee"
              placeholder="Slot (per-person)"
              value={slotFee}
              onChange={(e) => setSlotFee(e.target.value)}
              required
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
              <button type="button" className="btn-minus" onClick={decrementMembers}>
                -
              </button>
              <input type="number" id="members" value={members} min="0" readOnly />
              <button type="button" className="btn-plus" onClick={incrementMembers}>
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
            />
          </div>

          {isLoggedIn ? (
            <>
              <button type="submit" className="btn-recruit">
                Recruit
              </button>
            </>
          ) : (
            <p className='login-prompt'>
              Login to post recruitment
            </p>
          )}
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
};

export default RecruitmentForm;
