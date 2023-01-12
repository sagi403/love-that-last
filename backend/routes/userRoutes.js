import express from "express";
import {
  authResetPassword,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserAsAdmin,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  deleteUserValidation,
  forgotPasswordValidation,
  getAllUsersValidation,
  getUserByIdValidation,
  loginUserValidation,
  registerUserValidation,
  resetPasswordValidation,
  updateUserAsAdminValidation,
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
  .patch(
    protect,
    updateUserProfileValidation,
    validateRequest,
    updateUserProfile
  );
router
  .route("/:id")
  .get(protect, admin, getUserByIdValidation, validateRequest, getUserById)
  .put(
    protect,
    admin,
    updateUserAsAdminValidation,
    validateRequest,
    updateUserAsAdmin
  )
  .delete(protect, admin, deleteUserValidation, validateRequest, deleteUser);
router.get(
  "/",
  protect,
  admin,
  getAllUsersValidation,
  validateRequest,
  getAllUsers
);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validateRequest,
  forgotPassword
);
router
  .route("/reset-password/:id/:token")
  .get(authResetPassword)
  .post(resetPasswordValidation, validateRequest, resetPassword);

export default router;
