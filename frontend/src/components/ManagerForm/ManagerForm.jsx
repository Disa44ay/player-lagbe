import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import './ManagerForm.css';

const ManagerForm = () => {
  const { isLoggedIn, isManager, id } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    teamName: "",
    players: [],
    teamLogo: null,
  });
  const [managers, setManagers] = useState([]);
  const [currentManager, setCurrentManager] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch managers when component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/manager/list");

        if (response.data && Array.isArray(response.data.data)) {
          setManagers(response.data.data);

          const userManager = response.data.data.find(
            (manager) => manager.userId === id
          );

          setCurrentManager(userManager);

          if (userManager) {
            setData({
              name: userManager.name,
              email: userManager.email,
              contact: userManager.contact,
              teamName: userManager.teamName,
              players: userManager.players,
              teamLogo: userManager.teamLogo,
            });
          }
        } else {
          toast.error("Managers data is missing or not in expected format.");
        }
      } catch (error) {
        console.error("Error fetching manager list:", error);
        toast.error("Failed to fetch managers.");
      }
    };

    if (id) fetchManagers();
  }, [id]);

  // Handle input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Handle player input changes
  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...data.players];
    updatedPlayers[index] = value;
    setData((data) => ({ ...data, players: updatedPlayers }));
  };

  const addPlayer = () => {
    setData((data) => ({ ...data, players: [...data.players, ""] }));
  };

  // Handle form submission for adding or editing
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("teamName", data.teamName);
    formData.append("players", JSON.stringify(data.players));
    if (image) {
      formData.append("teamLogo", image);
    }

    try {
      const apiUrl = isEditing
        ? `http://localhost:4000/api/manager/edit/${currentManager._id}`
        : "http://localhost:4000/api/manager/add";

      const response = await axios({
        method: isEditing ? "patch" : "post",
        url: apiUrl,
        data: formData,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form data after submission
        setData({
          name: "",
          email: "",
          contact: "",
          teamName: "",
          players: [],
          teamLogo: null,
        });
        setImage(null);
        setShowForm(false);

        if (isEditing) {
          setIsEditing(false);
          setCurrentManager((prev) => ({
            ...prev,
            ...data,
            teamLogo: image ? URL.createObjectURL(image) : data.teamLogo,
          }));
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to submit manager data.");
      console.error(error);
    }
  };

  // Close the form
  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  // Show manager information if isManager is true
  if (isManager && currentManager) {
    return (
      <div className="manager-info-container">
        <h2>Manager Information</h2>
        <div className="logo-container">
          <img
            src={`http://localhost:4000/images/${currentManager.teamLogo}`}
            alt={`${currentManager.teamName} Logo`}
            className="team-logo"
          />
        </div>
        <p><strong>Name:</strong> {currentManager.name}</p>
        <p><strong>Email:</strong> {currentManager.email}</p>
        <p><strong>Contact:</strong> {currentManager.contact}</p>
        <p><strong>Team Name:</strong> {currentManager.teamName}</p>
        <p><strong>Players:</strong></p>
        <ul>
          {currentManager.players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
        <div className="action-buttons">
          <button
            onClick={() => {
              setIsEditing(true);
              setShowForm(true);
            }}
            className="edit-btn"
          >
            Edit
          </button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div className="manager-container">
      <div className="manager-header">
        <p className="manager-header-p">
          <h2>GOT A TEAM? </h2><br />
          Step up as a manager and lead your squad to victory! <br />
          Compete, rise, and take your team to the next level!
        </p>
        <button
          className="manager-button"
          onClick={() => {
            if (!isLoggedIn) {
              toast.info("Please log in to proceed.");
            } else {
              setShowForm(true);
            }
          }}
          disabled={!isLoggedIn}
        >
          Become A Manager!
        </button>
      </div>

      {showForm && (
        <div className="manager-form-container">
          <div className="close-button-container">
            <button onClick={closeForm} className="close-btn">×</button>
          </div>
          <form className="manager-form" onSubmit={onSubmitHandler}>
            <div className="img-upload-container">
              <p>Upload Team Logo</p>
              <label htmlFor="image">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `http://localhost:4000/images/${data.teamLogo}`
                  }
                  alt="team-logo"
                  className="team-logo"
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
              />
            </div>

            {/* Remaining form fields */}
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Manager Name"
              required
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="contact"
              value={data.contact}
              onChange={onChangeHandler}
              placeholder="Contact"
              required
            />
            <input
              type="text"
              name="teamName"
              value={data.teamName}
              onChange={onChangeHandler}
              placeholder="Team Name"
              required
            />
            {data.players.map((player, index) => (
              <input
                key={index}
                type="text"
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                required
              />
            ))}
            <button type="button" onClick={addPlayer}>
              Add Player
            </button>

            <button type="submit" className="submit-btn">
              {isEditing ? "Update" : "Done!"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagerForm;
