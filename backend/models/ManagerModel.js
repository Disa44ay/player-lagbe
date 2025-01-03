import mongoose from "mongoose";
import userModel from "./UserModel.js";

// Manager Schema Definition
const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    unique: true, // Ensure team names are unique
  },
  players: {
    type: [
      {
        type: String, // Store player names
        required: true,
      }
    ],
    default: [], // Array of player names
  },
  teamLogo: {
    type: String, // Optional team logo (URL or file path)
    default: null,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true, // Reference to the User model
  },
  playersUserIds: {
    type: [mongoose.Types.ObjectId], // Array of player userIds
    required: true,
  }
});

// Model Export
const ManagerModel = mongoose.models.manager || mongoose.model("manager", managerSchema);
export default ManagerModel;
