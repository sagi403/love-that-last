import express from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserProfileValidation,
} from "../validation/userValidation.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", registerUserValidation, validateRequest, registerUser);
router.route("/login").post(loginUserValidation, validateRequest, loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(
    protect,
    updateUserProfileValidation,
    validateRequest,
    updateUserProfile
  );
router.get("/", protect, admin, getAllUsers);

export default router;
