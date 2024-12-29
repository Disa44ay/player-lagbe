import express from "express";
import multer from "multer";
import { addManager, editManager, removeManager, listManagers } from "../controllers/ManagerController.js";

const ManagerRoute = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: "uploads", // Directory for storing uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

// Middleware for handling file uploads
const upload = multer({ storage });

// Routes
ManagerRoute.post("/add", upload.single("teamLogo"), addManager);
ManagerRoute.patch("/edit/:id", upload.single("teamLogo"), editManager); // Pass file for editing
ManagerRoute.get("/list", listManagers);
ManagerRoute.post("/remove", removeManager);

export default ManagerRoute;

