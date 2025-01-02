import React, { useEffect, useState } from 'react';
import './TeamList.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const TeamList = ({ url }) => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(`${url}/api/manager/list`);
        if (response.data.success) {
          setManagers(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch manager list");
        }
      } catch (error) {
        toast.error("Error fetching manager list");
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, [url]);

  const handleRemoveManager = async (managerId) => {
    try {
      const response = await axios.post(`${url}/api/manager/remove`, { id: managerId });
      if (response.data.success) {
        toast.success(response.data.message);
        setManagers((prevManagers) => prevManagers.filter((manager) => manager._id !== managerId));
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
    <div className="team-list">
      <h1>Manager List</h1>
      {!managers || managers.length === 0 ? (
        <p>No managers found.</p>
      ) : (
        <ul>
          {managers.map((manager) => (
            <li key={manager._id} className="manager-item">
              <div className="manager-info">
                <section className="logo-section">
                  <img src={`${url}/images/`+ manager.teamLogo} alt={`${manager.teamName} Logo`} className="team-logo" />
                </section>
                <div>
                  <h2>{manager.name}</h2>
                  <p>Email: {manager.email}</p>
                  <p>Contact: {manager.contact}</p>
                  <p>Team: {manager.teamName}</p>
                  <details>
                    <summary>Players</summary>
                    <ul>
                      {manager.players.map((player, index) => (
                        <li key={index}>{player}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
              <button className="remove-button" onClick={() => handleRemoveManager(manager._id)}>
                Remove Manager
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamList;
