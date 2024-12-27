import { useState, useContext } from "react";
import { RecruitmentContext } from "../../Context/RecruitmentContext.jsx";
import AuthContext from "../../Context/AuthContext"; // Import the AuthContext
import './AvailableGames.css';

const AvailableGames = () => {
  const { availableGames, loading, error } = useContext(RecruitmentContext);
  const { isLoggedIn } = useContext(AuthContext); // Get the logged-in status

  const [showMoreSolo, setShowMoreSolo] = useState(false);
  const [showMoreTeams, setShowMoreTeams] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Get the current date and time
  const currentDateTime = new Date();

  // Function to check if a game is valid based on the current time
  const isValidGame = (game) => {
    const gameDate = new Date(game.date);
    const gameStartTime = new Date(`${game.date}T${game.startTime}`);

    // Check if the game date is in the past
    if (gameDate < currentDateTime) {
      return false;
    }

    // Check if the game start time is within 4 hours of the current time
    const timeDifference = (gameStartTime - currentDateTime) / (1000 * 60 * 60); // Convert ms to hours
    if (timeDifference < 4) {
      return false;
    }

    return true;
  };

  // Separate games into solo and team categories based on teamRecruitment
  const soloGames = availableGames.filter((game) => !game.isTeamRecruitment && isValidGame(game));
  const teamGames = availableGames.filter((game) => game.isTeamRecruitment && isValidGame(game));

  // Show no more than 3 games in each section
  const visibleSoloGames = showMoreSolo ? soloGames : soloGames.slice(0, 2);
  const visibleTeamGames = showMoreTeams ? teamGames : teamGames.slice(0, 2);

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
                {visibleSoloGames.length > 0 ? (
                  visibleSoloGames.map((game, index) => (
                    <tr key={index}>
                      <td>{game.venue}</td>
                      <td>{game.time}</td>
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                      <td>{game.players || "TBA"}</td>
                      <td>{game.slotFee || "TBA"}</td>
                      <td>{game.contact || "TBA"}</td>
                      <td className="action-buttons">
                        {isLoggedIn ? (
                          <>
                            <button className="games-btn join-btn">Join</button>
                            <button className="games-btn cancel-btn">Cancel</button>
                          </>
                        ) : (
                          <span>Log in to join</span>
                        )}
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
          {soloGames.length > 2 && !showMoreSolo && (
            <button className="see-more-btn" onClick={() => setShowMoreSolo(true)}>
              See More...
            </button>
          )}
          {showMoreSolo && soloGames.length > 2 && (
            <button className="see-more-btn" onClick={() => setShowMoreSolo(false)}>
              Show Less
            </button>
          )}
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
                  <th>Team Size</th>
                  <th>Date</th>
                  <th>Slot Fee</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleTeamGames.length > 0 ? (
                  visibleTeamGames.map((game, index) => (
                    <tr key={index}>
                      <td>{game.venue}</td>
                      <td>{game.time}</td>
                      <td>{game.teamOf || "TBA"}</td>
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                      <td>{game.slotFee || "TBA"}</td>
                      <td>{game.contact || "TBA"}</td>
                      <td className="action-buttons">
                        {isLoggedIn ? (
                          <>
                            <button className="games-btn join-btn">Join</button>
                            <button className="games-btn cancel-btn">Cancel</button>
                          </>
                        ) : (
                          <span>Log in to join</span>
                        )}
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
          {teamGames.length > 2 && !showMoreTeams && (
            <button className="see-more-btn" onClick={() => setShowMoreTeams(true)}>
              See More...
            </button>
          )}
          {showMoreTeams && teamGames.length > 2 && (
            <button className="see-more-btn" onClick={() => setShowMoreTeams(false)}>
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableGames;
