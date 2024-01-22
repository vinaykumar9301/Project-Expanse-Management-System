const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    // Check if email is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already registered." });
    }

    // Create a new user
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ success: true, newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { loginController, registerController };