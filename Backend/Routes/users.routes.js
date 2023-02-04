const express = require("express");
const {
  getAllUsers,
  regiserUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../Controlers/user.controler");

const userRouter = express.Router();

// Get All User -Admin
userRouter.get("/", getAllUsers);

// Register User
userRouter.post("/register", regiserUser);

// Login User
userRouter.post("/login", loginUser);

// Update User -Admin
userRouter.patch("/:id", updateUser);

// delete User -Admin
userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };
