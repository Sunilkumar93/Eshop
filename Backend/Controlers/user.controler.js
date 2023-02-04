const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");

// Get All Users 
const getAllUsers = catchAsyncError(async (req, res, next) => {
  res.status(200).send({
    error: false,
    users: "user",
  });
});

// Regiter User
const regiserUser = catchAsyncError(async (req, res, next) => {
  res.status(201).send({ error: true, message: "user added success" });
});

// Login User
const loginUser = catchAsyncError(async (req, res, next) => {});

// Update User 
const updateUser = catchAsyncError(async (req, res, next) => {});

// Delete User 
const deleteUser = catchAsyncError(async (req, res, next) => {});

module.exports={getAllUsers,deleteUser,loginUser,regiserUser,updateUser}