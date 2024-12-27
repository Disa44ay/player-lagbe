import React, { useState, useContext } from 'react';
import axios from 'axios';
import './TeamRecruitmentForm.css';
import { RecruitmentContext } from '../../Context/RecruitmentContext';  

const TeamRecruitmentForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [teamSize, setTeamSize] = useState(0); // Use teamSize instead of members
  const [venue, setVenue] = useState('');
  const [slotFee, setSlotFee] = useState('');
  const [date, setDate] = useState('');
  const [contact, setContact] = useState('');

  const { setAvailableGames, loading, error } = useContext(RecruitmentContext);  // Use RecruitmentContext

  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const incrementTeamSize = () => setTeamSize(teamSize + 1); // Increment team size
  const decrementTeamSize = () => {
    if (teamSize > 0) setTeamSize(teamSize - 1); // Decrement team size
  };

  // Helper function to check if the selected recruitment time is before the current time
  const isFutureDate = () => {
    const now = new Date();
    const selectedDate = new Date(date);
    const selectedStartTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${startTime}`);
    
    return selectedStartTime > now;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the recruitment time is in the future
    if (!isFutureDate()) {
      alert('You cannot post recruitment for a time that is before the current time.');
      return;
    }

    // Format the date to match the backend format
    const formattedDate = new Date(date).toISOString();

    // Construct recruitment data based on team recruitment
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

    console.log('Sending recruitment data:', JSON.stringify(recruitmentData));  // Log data before sending

    try {
      const response = await axios.post('http://localhost:4000/api/recruitment/add', recruitmentData);
      console.log('Server response:', response.data);  // Inspect server response
      if (response.data.success) {
        alert('Team recruitment posted successfully!');
      } else {
        alert('Error posting team recruitment!');
      }
    } catch (error) {
      console.error('Error posting recruitment:', error.response ? error.response.data : error.message);
      alert('Failed to post team recruitment');
    }
  };

  return (
    <section className="recruitment-info">
      <div className="container">
        <h2 className="text-center">Team Recruitment</h2>
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
              placeholder="Slot (per-team)"
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
            <label htmlFor="teamSize">Team Size (without substitutions):</label>
            <div className="member-buttons">
              <button type="button" className="btn-minus" onClick={decrementTeamSize}>
                -
              </button>
              <input type="number" id="teamSize" value={teamSize} min="0" readOnly />
              <button type="button" className="btn-plus" onClick={incrementTeamSize}>
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

          <button type="submit" className="btn-recruit">
            Recruit
          </button>
        </form>
      </div>
    </section>
  );
};

export default TeamRecruitmentForm;
