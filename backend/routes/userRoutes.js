import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/profile").get(getUserProfile);

export default router;
