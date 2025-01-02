import React, { useEffect, useState } from "react";
import "./Teams.css";
import { toast } from "react-toastify";
import axios from "axios";

const Teams = ({ url }) => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(`${url}/api/manager/list`);
        if (response.data.success) {
          setManagers(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch team list");
        }
      } catch (error) {
        toast.error("Error fetching team list");
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, [url]);

  const handleRemoveManager = async (managerId) => {
    try {
      const response = await axios.post(`${url}/api/manager/remove`, {
        id: managerId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setManagers((prevManagers) =>
          prevManagers.filter((manager) => manager._id !== managerId)
        );
      } else {
        toast.error(response.data.message || "Error removing manager");
      }
    } catch (error) {
      toast.error("Error removing manager");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teams-container">
      <h1>Team List</h1>
      {!managers || managers.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <table className="teams-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Team Name</th>
              <th>Players</th>
              <th>Manager Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager._id} className="team-row">
                <td className={manager.teamLogo ? "team-logo-cell" : "no-logo"}>
                  {manager.teamLogo ? (
                    <img
                      src={`${url}/images/${manager.teamLogo}`}
                      alt={`${manager.teamName} Logo`}
                      className="team-logo"
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
                <td className="highlighted-team-name"><h3>{manager.teamName}</h3></td>
                <td>
                  <details>
                    <summary>View Players</summary>
                    <ul>
                      {manager.players.map((player, index) => (
                        <li key={index}>{player}</li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td>{manager.name}</td>
                <td>{manager.email}</td>
                <td>{manager.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teams;
