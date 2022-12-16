import asyncHandler from "express-async-handler";

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === "1" && password === "2") {
    res.json({
      msg: "success",
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { loginUser };
