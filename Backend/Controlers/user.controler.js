const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { UserModel } = require("../Models/user.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");

// Get All Users
const getAllUsers = catchAsyncError(async (req, res, next) => {
  res.status(200).send({
    error: false,
    users: "user",
  });
});

// Regiter User
const regiserUser = catchAsyncError(async (req, res, next) => {
  const user = new UserModel(req.body);
  const userSaved = await user.save();
  res.status(201).send({ error: false, message: "User Registration Success" });
});

// Login User
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  //checking user exist or not
  const user = await UserModel.findOne({
    email: { $regex: email, $options: "i" },
  }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email And Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email And Password", 401));
  }
  sendToken(user, 200, res);
});

// Logout User

const logoutUser=catchAsyncError(async (req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).send({
    error:false,
    message:"Logged Out"
  })
})

// Update User
const updateUser = catchAsyncError(async (req, res, next) => {});

// Delete User
const deleteUser = catchAsyncError(async (req, res, next) => {});

module.exports = {
  getAllUsers,
  deleteUser,
  loginUser,
  regiserUser,
  updateUser,
  logoutUser
};
