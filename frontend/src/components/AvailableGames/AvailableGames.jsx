import { useContext } from "react";
import { RecruitmentContext } from "../../Context/RecruitmentContext.jsx";
import './AvailableGames.css';

const AvailableGames = () => {
  const { availableGames, loading, error } = useContext(RecruitmentContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Separate games into solo and team categories based on teamRecruitment
  const soloGames = availableGames.filter((game) => !game.isTeamRecruitment);
  const teamGames = availableGames.filter((game) => game.isTeamRecruitment);

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
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                      <td>{game.players || "TBA"}</td>
                      <td>{game.slotFee || "TBA"}</td>
                      <td>{game.contact || "TBA"}</td>
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
                  <th>Team Size</th>
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
                      <td>{game.teamOf || "TBA"}</td>
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                      <td>{game.slotFee || "TBA"}</td>
                      <td>{game.contact || "TBA"}</td>
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
