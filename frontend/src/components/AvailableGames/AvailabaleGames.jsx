import React, { useState, useEffect } from 'react';
import './AvailableGames.css';

const AvailableGames = () => {
  const [soloGames, setSoloGames] = useState([]);
  const [teamGames, setTeamGames] = useState([]);

  useEffect(() => {
    // Mock data
    const fetchedSoloGames = [
      { venue: 'City Stadium', time: '10:00:00 - 11:30:00', date: '2024-12-20', players: 5, fee: '$10', contact: '123-456-7890' },
      { venue: 'Downtown Arena', time: '12:00:00 - 13:30:00', date: '2024-12-21', players: 8, fee: '$15', contact: '987-654-3210' },
    ];

    const fetchedTeamGames = [
      { venue: 'Westfield Ground', time: '15:00:00 - 16:30:00', teamOf: '7', date: '2024-12-22', fee: '$20', contact: '456-789-1230' },
      { venue: 'Eastside Park', time: '17:00:00 - 18:30:00', teamOf: '10', date: '2024-12-23', fee: '$25', contact: '654-321-9870' },
    ];

    setSoloGames(fetchedSoloGames);
    setTeamGames(fetchedTeamGames);
  }, []);

  return (
    <div className="available-games-section">
      <div className="games-container">
        <h2 className="games-title">Available Games</h2>

        {/* Solo Section */}
        <div className="games-section">
          <h3 className="games-subtitle">Solo</h3>
          <div className="table-wrapper">
            <table className="games-table">
              <thead>
                <tr>
                  <th>Venue</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Players</th>
                  <th>Slot Fee</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {soloGames.length > 0 ? (
                  soloGames.map((game, index) => (
                    <tr key={index}>
                      <td>{game.venue}</td>
                      <td>{game.time}</td>
                      <td>{game.date}</td>
                      <td>{game.players}</td>
                      <td>{game.fee}</td>
                      <td>{game.contact}</td>
                      <td className="action-buttons">
                        <button className="games-btn join-btn">Join</button>
                        <button className="games-btn cancel-btn">Cancel</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No solo games available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teams Section */}
        <div className="games-section">
          <h3 className="games-subtitle">Teams</h3>
          <div className="table-wrapper">
            <table className="games-table">
              <thead>
                <tr>
                  <th>Venue</th>
                  <th>Time</th>
                  <th>Team(A side)</th>
                  <th>Date</th>
                  <th>Slot Fee</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamGames.length > 0 ? (
                  teamGames.map((game, index) => (
                    <tr key={index}>
                      <td>{game.venue}</td>
                      <td>{game.time}</td>
                      <td>{game.teamOf}</td>
                      <td>{game.date}</td>
                      <td>{game.fee}</td>
                      <td>{game.contact}</td>
                      <td className="action-buttons">
                        <button className="games-btn join-btn">Join</button>
                        <button className="games-btn cancel-btn">Cancel</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No team games available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableGames;
