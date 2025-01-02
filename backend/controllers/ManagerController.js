import ManagerModel from "../models/ManagerModel.js";
import fs from "fs";
import UserModel from "../models/UserModel.js"; // Import the UserModel for validation

// Add Manager
const addManager = async (req, res) => {
  try {
    const { name, email, contact, teamName, players } = req.body;

    console.log("Add Manager Request Body:", { name, email, contact, teamName, players });
    console.log("Uploaded File:", req.file);

    if (!name || !email || !contact || !teamName || !players) {
      return res.status(400).json({
        success: false,
        message: "All fields except team logo are required",
      });
    }

    // Check for existing manager with the same email, name, or teamName
    const existingManager = await ManagerModel.findOne({
      $or: [{ email }, { name }, { teamName }],
    });

    if (existingManager) {
      if (existingManager.email === email) {
        return res.status(400).json({ success: false, message: "Same user cannot be manager of two teams" });
      }
      if (existingManager.teamName === teamName) {
        return res.status(400).json({ success: false, message: "Please provide a unique team name" });
      }
      if (existingManager.name === name) {
        return res.status(400).json({ success: false, message: "This name is already used by another manager" });
      }
    }

    // Validate players
    const playerNames = JSON.parse(players); // Parse players if sent as a JSON string
    const validUsers = await UserModel.find({ name: { $in: playerNames } }).select("name");
    const validUserNames = validUsers.map((user) => user.name);

    const invalidPlayers = playerNames.filter((player) => !validUserNames.includes(player));
    if (invalidPlayers.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Player name(s) ${invalidPlayers.join(", ")} do not match with any valid user`,
      });
    }

    // Set teamLogo to null if no file is uploaded
    const teamLogo = req.file ? req.file.filename : null;

    const newManager = new ManagerModel({
      name,
      email,
      contact,
      teamName,
      players: playerNames,
      teamLogo,
    });

    await newManager.save();
    res.json({ success: true, message: "Manager added successfully" });
  } catch (error) {
    console.error("Error adding manager:", error);
    res.status(500).json({ success: false, message: "Error adding manager" });
  }
};

// Edit Manager
const editManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, teamName, players } = req.body;

    console.log("Edit Manager Request Body:", { name, email, contact, teamName, players });
    console.log("Uploaded File:", req.file);

    const existingManager = await ManagerModel.findById(id);
    if (!existingManager) {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }

    // Check if updated values conflict with other managers
    const conflictingManager = await ManagerModel.findOne({
      _id: { $ne: id }, // Exclude the current manager from the search
      $or: [{ email }, { name }, { teamName }],
    });

    if (conflictingManager) {
      if (conflictingManager.email === email) {
        return res.status(400).json({ success: false, message: "Same user cannot be manager of two teams" });
      }
      if (conflictingManager.teamName === teamName) {
        return res.status(400).json({ success: false, message: "Please provide a unique team name" });
      }
      if (conflictingManager.name === name) {
        return res.status(400).json({ success: false, message: "This name is already used by another manager" });
      }
    }

    // Validate players
    const playerNames = JSON.parse(players); // Parse players if sent as a JSON string
    const validUsers = await UserModel.find({ name: { $in: playerNames } }).select("name");
    const validUserNames = validUsers.map((user) => user.name);

    const invalidPlayers = playerNames.filter((player) => !validUserNames.includes(player));
    if (invalidPlayers.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Player name(s) ${invalidPlayers.join(", ")} do not match with any valid user`,
      });
    }

    let updatedLogo = existingManager.teamLogo;
    if (req.file) {
      fs.unlink(`uploads/${existingManager.teamLogo}`, () => {});
      updatedLogo = req.file.filename;
    }

    existingManager.name = name;
    existingManager.email = email;
    existingManager.contact = contact;
    existingManager.teamName = teamName;
    existingManager.players = playerNames;
    existingManager.teamLogo = updatedLogo;

    await existingManager.save();
    res.json({ success: true, message: "Manager updated successfully" });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ success: false, message: "Error updating manager" });
  }
};


// Remove Manager
const removeManager = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("Remove Manager Request Body:", req.body);

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Manager ID is required" });
    }

    const manager = await ManagerModel.findById(id);
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, message: "Manager not found" });
    }

    // Delete the team logo file
    fs.unlink(`uploads/${manager.teamLogo}`, () => {});

    // Delete the manager from the database
    await ManagerModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Manager removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing manager" });
  }
};

// List Managers
const listManagers = async (req, res) => {
  try {
    const managers = await ManagerModel.find().populate(
      "players",
      "name email"
    );
    res.json({ success: true, data: managers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving managers" });
  }
};

export { addManager, editManager, removeManager, listManagers };
