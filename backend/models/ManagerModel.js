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

// Middleware to auto-set userId for manager and players based on their names
managerSchema.pre("validate", async function (next) {
  try {
    // Trim spaces from the manager's name and players' names
    const trimmedName = this.name.trim();
    console.log("Trimmed Manager Name:", trimmedName); // Log to check the exact manager name

    // Fetch the manager's userId based on the trimmed name
    const manager = await userModel.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } });
    
    console.log("Manager Query Result:", manager); // Log the result of the query

    if (!manager) {
      return next(new Error("Manager name must correspond to a valid user."));
    }
    this.userId = manager._id;

    // Fetch the userIds for all players based on their names
    const playerUserIds = await Promise.all(
      this.players.map(async (playerName) => {
        const trimmedPlayerName = playerName.trim();  // Trim spaces from player names
        console.log("Trimmed Player Name:", trimmedPlayerName); // Log to check the player name
        
        const player = await userModel.findOne({ name: { $regex: new RegExp(`^${trimmedPlayerName}$`, 'i') } });
        
        console.log("Player Query Result:", player); // Log the result of the player query

        if (!player) {
          throw new Error(`Player with name ${trimmedPlayerName} does not exist in the system.`);
        }
        return player._id;
      })
    );
    this.playersUserIds = playerUserIds;

    next();
  } catch (error) {
    next(error);
  }
});


// Model Export
const ManagerModel = mongoose.models.manager || mongoose.model("manager", managerSchema);
export default ManagerModel;
