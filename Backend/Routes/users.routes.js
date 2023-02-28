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
  getSingleUsers,
  updateRole,
} = require("../Controlers/user.controler");
const {
  Autherise,
  AutheriseRole,
} = require("../middleware/autherise.middleware");

const userRouter = express.Router();

// Get All User -Admin
userRouter.get("/admin/users", Autherise, AutheriseRole("admin"), getAllUsers);

// Get Single User -Admin
userRouter.get("/admin/user/:id", Autherise, AutheriseRole("admin"), getSingleUsers);

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

// Update User Role  --Admin
userRouter.patch("/admin/update/:id",Autherise,AutheriseRole("admin"),updateRole)

// delete User -Admin
userRouter.delete("/admin/delete/:id", Autherise, AutheriseRole("admin"), deleteUser);

// forgot Password
userRouter.post("/forgotpassword", forgotPassword);

// resetPassword
userRouter.patch("/resetpassword/:token", resetPassord);

//Update Password

userRouter.patch("/update/password", Autherise, updatePassword);

module.exports = { userRouter };
