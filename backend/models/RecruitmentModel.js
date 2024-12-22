import mongoose from "mongoose";

const recruitmentSchema = new mongoose.Schema({
  venue: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true, // Example: "10:00:00 - 11:30:00"
  },
  date: {
    type: Date,
    required: true,
  },
  players: {
    type: Number,
    default: null, // Used for solo games
  },
  teamOf: {
    type: Number,
    default: null, // Used for team games
  },
  slotFee: {
    type: String,
    required: true, // Example: "$10"
  },
  contact: {
    type: String,
    required: true, // Example: "123-456-7890"
  },
  isTeamRecruitment: {
    type: Boolean,
    required: true, // Determines if it's a solo or team game
  },
});

const RecruitmentModel =
  mongoose.models.recruitment ||
  mongoose.model("recruitment", recruitmentSchema);

export default RecruitmentModel;
