const express = require("express");
const {
  getAllUsers,
  regiserUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  forgotPassword,
  resetPassord,
  getUserDetails,
  updatePassword,
} = require("../Controlers/user.controler");
const { Autherise } = require("../middleware/autherise.middleware");

const userRouter = express.Router();

// Get All User -Admin
userRouter.get("/", getAllUsers);

// Get User Details

userRouter.get("/me", Autherise, getUserDetails);

// Register User
userRouter.post("/register", regiserUser);

// Login User
userRouter.post("/login", loginUser);

//Logout User
userRouter.get("/logout", logoutUser);

// Update User
userRouter.patch("/update/profile", Autherise, updateUser);

// Update User Role

// delete User -Admin
userRouter.delete("/:id", deleteUser);

// forgot Password
userRouter.post("/forgotpassword", forgotPassword);

// resetPassword
userRouter.patch("/resetpassword/:token", resetPassord);

userRouter.patch("/update/password", Autherise, updatePassword);

module.exports = { userRouter };
