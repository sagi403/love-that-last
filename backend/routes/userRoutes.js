import express from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", protect, getAllUsers);

export default router;
