import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  req.session = { jwt: generateToken(user) };

  res.status(201).json({ success: true });
});

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session = { jwt: generateToken(user) };

    res.json({ success: true });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  req.session = null;

  res.send({ success: true });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { id, name, email, isAdmin } = req.user;

  res.json({ id, name, email, isAdmin });
});

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email && !password && !name) {
    res.status(400);
    throw new Error("No data provided");
  }

  req.user.name = name || req.user.name;

  if (email) {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      res.status(400);
      throw new Error("Email already exists");
    }

    req.user.email = email;
  }

  if (password) {
    req.user.password = password;
  }

  const updatedUser = await req.user.save();

  req.session = { jwt: generateToken(req.user) };

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
