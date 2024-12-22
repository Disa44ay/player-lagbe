import express from "express";
import { addRecruitment,removeRecruitment,listRecruitment } from "../controllers/RecruitmentController.js";

const RecruitmentRoute = express.Router();

// Route to add recruitment info
RecruitmentRoute.post("/add", addRecruitment);

// Route to list all recruitment info
RecruitmentRoute.get("/list", listRecruitment);

// Route to remove recruitment info
RecruitmentRoute.post("/remove", removeRecruitment);

export default RecruitmentRoute;
