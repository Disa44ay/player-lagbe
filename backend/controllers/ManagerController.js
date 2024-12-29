import ManagerModel from "../models/ManagerModel.js";
import fs from "fs";

// Add Manager
const addManager = async (req, res) => {
  try {
    const { name, email, contact, teamName, players } = req.body;

    // Properly formatted console log for incoming request data
    console.log("Add Manager Request Body:", {
      name,
      email,
      contact,
      teamName,
      players,
    });
    console.log("Uploaded File:", req.file);

    if (!name || !email || !contact || !teamName || !players) {
      return res.status(400).json({
        success: false,
        message: "All fields except team logo are required",
      });
    }

    const existingManager = await ManagerModel.findOne({ teamName });
    if (existingManager) {
      return res.status(400).json({ success: false, message: "Team name already exists" });
    }

    // Set teamLogo to null if no file is uploaded
    const teamLogo = req.file ? req.file.filename : null;

    const newManager = new ManagerModel({
      name,
      email,
      contact,
      teamName,
      players: JSON.parse(players), // Parse players if sent as JSON string
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

    // Properly formatted console log for incoming request data
    console.log("Edit Manager Request Body:", {
      name,
      email,
      contact,
      teamName,
      players,
    });
    console.log("Uploaded File:", req.file);

    const existingManager = await ManagerModel.findById(id);
    if (!existingManager) {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }

    let updatedLogo = existingManager.teamLogo;
    if (req.file) {
      // Remove old file if a new logo is uploaded
      console.log("Removing old logo file:", existingManager.teamLogo);
      fs.unlink(`uploads/${existingManager.teamLogo}`, () => {});
      updatedLogo = req.file.filename; // Update with new file
    }

    existingManager.name = name;
    existingManager.email = email;
    existingManager.contact = contact;
    existingManager.teamName = teamName;
    existingManager.players = JSON.parse(players); // Parse players if sent as JSON string
    existingManager.teamLogo = updatedLogo; // Only update if a new logo is provided

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
