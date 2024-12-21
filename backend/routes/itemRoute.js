//routes.js
import express from "express"
import multer from "multer"
import { addItem,removeItem,listItem } from "../controllers/itemController.js";

const itemRouter = express.Router();

//manage storage engine using multer storage method

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
//middleware
const upload = multer({ storage: storage });

itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.get("/list", listItem);
itemRouter.post("/remove", removeItem);

//itemRouter.post("/add", addItem);

export default itemRouter;
