import React, { useState, useContext } from 'react';
import { RecruitmentContext } from '../../Context/RecruitmentContext';
import axios from 'axios';
import './RecruitmentForm.css';

const RecruitmentForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [members, setMembers] = useState(0);
  const [isTeamRecruitment, setIsTeamRecruitment] = useState(false); // Toggle between solo and team recruitment
  const [venue, setVenue] = useState('');
  const [slotFee, setSlotFee] = useState('');
  const [date, setDate] = useState('');
  const [contact, setContact] = useState('');
  const [teamA, setTeamA] = useState(''); // Number of players per team for team recruitment

  const { setAvailableGames, loading, error } = useContext(RecruitmentContext); // Access context

  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const incrementMembers = () => setMembers(members + 1);
  const decrementMembers = () => {
    if (members > 0) setMembers(members - 1);
  };
  const toggleRecruitmentType = () => setIsTeamRecruitment((prev) => !prev);
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Format the date to match the backend format
    const formattedDate = new Date(date).toISOString(); // Converts to ISO 8601 format
    
    // Construct recruitment data based on whether it's solo or team recruitment
    const recruitmentData = {
      venue,
      slotFee,
      date: formattedDate,  // Date in correct format
      startTime,
      endTime,
      contact,
      isTeamRecruitment,
      ...(isTeamRecruitment ? { teamSize: parseInt(teamA, 10) } : { requiredMembers: members }),
    };
  
    console.log('Sending recruitment data:', JSON.stringify(recruitmentData));  // Log the data sent to server
  
    try {
      const response = await axios.post('http://localhost:4000/api/recruitment/add', recruitmentData);
      console.log('Server response:', response.data);  // Inspect server response
      if (response.data.success) {
        alert('Recruitment posted successfully!');
      } else {
        alert('Error posting recruitment!');
      }
    } catch (error) {
      console.error('Error posting recruitment:', error.response ? error.response.data : error.message);
      alert('Failed to post recruitment');
    }
  };
  
  return (
    <section className="recruitment-info">
      <div className="container">
        <h2 className="text-center">Recruitment Info</h2>
        <form onSubmit={onSubmitHandler}>
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

          {/* Team or solo recruitment fields */}
          {isTeamRecruitment ? (
            <>
              <div className="form-group">
                <label htmlFor="teamA">Team (A Side):</label>
                <input
                  type="number"
                  id="teamA"
                  placeholder="Player per team (without sub)"
                  value={teamA}
                  onChange={(e) => setTeamA(e.target.value)}
                  required
                />
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

          {/* Contact information - required for both solo and team */}
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
