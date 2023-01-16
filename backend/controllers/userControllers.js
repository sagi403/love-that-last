import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { keys } from "../keys.js";

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

  req.session = { jwt: generateToken({ id: user.id, isAdmin: user.isAdmin }) };

  res.status(201).json({ success: true });
});

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session = {
      jwt: generateToken({ id: user.id, isAdmin: user.isAdmin }),
    };

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

    if (emailExist && emailExist.email !== req.user.email) {
      res.status(400);
      throw new Error("Email already exists");
    }

    req.user.email = email;
  }

  if (password) {
    req.user.password = password;
  }

  const updatedUser = await req.user.save();

  req.session = {
    jwt: generateToken({ id: req.user.id, isAdmin: req.user.isAdmin }),
  };

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
  const pageSize = 10;
  const page = +req.query.pageNumber || 1;

  const users = await User.find({})
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const count = await User.countDocuments({});

  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user as admin
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserAsAdmin = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name;
    user.isAdmin = isAdmin;

    const emailExist = await User.findOne({ email });

    if (emailExist && emailExist.email !== user.email) {
      res.status(400);
      throw new Error("Email already exists");
    }

    user.email = email;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    res.status(404);
    throw new Error("User not found");
  }
  const { id, password } = oldUser;

  const secret = keys.jwtSecret + password;
  const token = generateToken({ id }, secret, "10m");
  const link = `${keys.url}/reset-password/${id}/${token}`;

  sendEmail({ email, userName: oldUser.name, link });

  res.json({ message: "Check your email for a password reset link" });
});

// @desc    Reset password auth
// @route   GET /api/users/reset-password/:id/:token
// @access  Private
const authResetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  const oldUser = await User.findById(id);

  if (!oldUser) {
    res.status(404);
    throw new Error("User not found");
  }

  const secret = keys.jwtSecret + oldUser.password;
  const { id: userId } = jwt.verify(token, secret);

  if (userId !== id) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ message: "Verified" });
});

// @desc    Reset password
// @route   POST /api/users/reset-password/:id/:token
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findById(id);

  if (!oldUser) {
    res.status(404);
    throw new Error("User not found");
  }

  const secret = keys.jwtSecret + oldUser.password;
  const { id: userId } = jwt.verify(token, secret);

  if (userId !== id) {
    res.status(404);
    throw new Error("User not found");
  }

  oldUser.password = password;
  await oldUser.save();

  res.json({ message: "Password updated" });
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserAsAdmin,
  deleteUser,
  forgotPassword,
  authResetPassword,
  resetPassword,
};
