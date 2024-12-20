// itemController.js
import itemModel from "../models/playerLagbeModel.js";
import fs from "fs";

// Add new item
const addItem = async (req, res) => {
  // Debugging incoming request
  console.log("File:", req.file); // Logs the uploaded file info
  console.log("Body:", req.body); // Logs the text fields in the request

  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.category ||
    !req.file
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  let image_filename = `${req.file.filename}`;

  const item = new itemModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await item.save();
    res.json({ success: true, message: "Item Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all itemn list
const listItem = async (req, res) => {
  try {
    const items = await itemModel.find({});
    res.json({ success: true, data: items });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove item
const removeItem = async (req, res) => {
  try {
    const item = await itemModel.findById(req.body.id);

    //to delete the image form the uploads folder
    fs.unlink(`uploads/${item.image}`, () => {});

    //to delete the data from the database
    await itemModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Item removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Correctly export addItem
export { addItem, listItem, removeItem };
