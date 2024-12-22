import recruitmentModel from "../models/RecruitmentModel.js";

// Add Recruitment Info
const addRecruitment = async (req, res) => {
  try {
    const {
      venue,
      slotFee,
      date,
      startTime,
      endTime,
      contact,
      teamSize,
      requiredMembers,
      isTeamRecruitment,
    } = req.body;

    // Validate required fields
    if (
      !venue ||
      !slotFee ||
      !date ||
      !startTime ||
      !endTime ||
      !contact ||
      (isTeamRecruitment &&
        (teamSize === undefined || teamSize <= 0)) ||
      (!isTeamRecruitment &&
        (requiredMembers === undefined || requiredMembers <= 0))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check for existing recruitment with the same details
    const existingRecruitment = await recruitmentModel.findOne({
      venue,
      date,
      time: `${startTime} - ${endTime}`,
      contact,
    });

    if (existingRecruitment) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Recruitment with these details already exists",
        });
    }

    // Create a new recruitment document
    const recruitment = new recruitmentModel({
      venue,
      slotFee,
      date,
      time: `${startTime} - ${endTime}`, // Combine start and end times into "time"
      contact,
      teamOf: isTeamRecruitment ? teamSize : null,
      players: !isTeamRecruitment ? requiredMembers : null,
      isTeamRecruitment,
    });

    await recruitment.save();
    res.json({ success: true, message: "Recruitment Info Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding recruitment info" });
  }
};

// List Recruitment Info
const listRecruitment = async (req, res) => {
  try {
    const recruitmentInfo = await recruitmentModel.find({});
    res.json({ success: true, data: recruitmentInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving recruitment info" });
  }
};

// Remove Recruitment Info
const removeRecruitment = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Recruitment ID is required" });
    }

    const deletedRecruitment = await recruitmentModel.findByIdAndDelete(id);
    if (!deletedRecruitment) {
      return res
        .status(404)
        .json({ success: false, message: "Recruitment not found" });
    }

    res.json({ success: true, message: "Recruitment Info Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing recruitment info" });
  }
};

export { addRecruitment, listRecruitment, removeRecruitment };
