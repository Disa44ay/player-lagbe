import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import './ManagerForm.css';

const ManagerForm = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [image, setImage] = useState(null); // To hold the logo image
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    teamName: "",
    players: [], // An array of players
  });
  const [showForm, setShowForm] = useState(false); // To control form visibility

  // Handle input changes for manager details
  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Handle players array update (add/remove)
  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...data.players];
    updatedPlayers[index] = value;
    setData((data) => ({ ...data, players: updatedPlayers }));
  };

  const addPlayer = () => {
    setData((data) => ({ ...data, players: [...data.players, ""] }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("teamName", data.teamName);
    formData.append("players", JSON.stringify(data.players)); // Stringify players array
    if (image) {
      formData.append("teamLogo", image); // Append uploaded file
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/manager/add",
        formData
      );

      // Check if the response is successful or not
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          contact: "",
          teamName: "",
          players: [],
        });
        setImage(null);
        toast.success(response.data.message); // Show success message
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      toast.error("Failed to register manager");
      console.error(error);
    }
  };

  // Close the form when the cross button is clicked
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="manager-container">
      {/* Manager Header */}
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
              setShowForm(true); // Show form if user is logged in
            }
          }}
          disabled={!isLoggedIn} // Disable the button if user is not logged in
        >
          Become A Manager!
        </button>
      </div>

      {/* New Div for Form */}
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
                  src={image ? URL.createObjectURL(image) : "/path/to/default/image"}
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

            <div className="input-container">
              <p>Manager Name</p>
              <input
                onChange={onChangehandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Manager Name"
                required
              />
            </div>

            <div className="input-container">
              <p>Email</p>
              <input
                onChange={onChangehandler}
                value={data.email}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="input-container">
              <p>Contact</p>
              <input
                onChange={onChangehandler}
                value={data.contact}
                type="text"
                name="contact"
                placeholder="Contact Number"
                required
              />
            </div>

            <div className="input-container">
              <p>Team Name</p>
              <input
                onChange={onChangehandler}
                value={data.teamName}
                type="text"
                name="teamName"
                placeholder="Team Name"
                required
              />
            </div>

            <div className="players-container">
              <p>Players</p>
              {data.players.map((player, index) => (
                <div key={index} className="player-input">
                  <input
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    value={player}
                    type="text"
                    name="players"
                    placeholder={`Player ${index + 1}`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addPlayer}
                className="add-player-btn"
              >
                +
              </button>
            </div>

            <button type="submit" className="submit-btn">
              Done!
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagerForm;
