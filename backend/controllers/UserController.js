import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.josn({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//registered user
const registeredUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if user with the same email exists
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Check if user with the same name exists
    const nameExists = await userModel.findOne({ name });
    if (nameExists) {
      return res.json({
        success: false,
        message: "User with this name exists. Please enter another username or add symbols to make it unique.",
      });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the new user with hashed password
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Saving the new user
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove user by admin
const removeUser = async (req, res) => {
  const { userId } = req.body; // Assuming user ID is passed in the request body
  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing user" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { name: 1, email: 1, password: 1 }); // Fetch name, email, and hashed password
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching users" });
  }
};

export { loginUser, registeredUser, removeUser, getAllUsers };

