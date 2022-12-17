import express from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { loginUserValidation } from "../validation/userValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", registerUser);
router.route("/login").post(loginUserValidation, validateRequest, loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", protect, admin, getAllUsers);

export default router;
