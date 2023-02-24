const { catchAsyncError } = require("../middleware/catchAsyncError.middleware");
const { UserModel } = require("../Models/user.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { sendEmail } = require("../utils/sendEmail");
const { sendToken } = require("../utils/sendToken");
const crypto = require("crypto");

// Get All Users
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).send({
    error: false,
    users,
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

const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).send({
    error: false,
    message: "Logged Out",
  });
});

// Update User
const updateUser = catchAsyncError(async (req, res, next) => {});

// Delete User
const deleteUser = catchAsyncError(async (req, res, next) => {});

// Forgot Password

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  // get reset Password Token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetpassword/${resetToken}`;
  const message = `Hello ${user.name} \n\n Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If You Did Not Requested This Email Then Please Ignore This Mail \n\n Regards \n EShop Team`;

  try {
    await sendEmail({
      email: user.email,
      subject: `EShop Password Recovery`,
      message,
    });
    res.status(200).send({
      error: false,
      message: `Email Send To ${user.email} Successfully `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
const resetPassord = catchAsyncError(async (req, res, next) => {
  if(!req.body.password||!req.body.confirmPassword){
    return next(new ErrorHandler("Please Enter Password & ConfirmPassord",400));
  }
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password Is Invalid Or Has Been Expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password And Confirm Password Should Match"),
      400
    );
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).send({
    error: false,
    message: "Password Changes Success",
  });
});

module.exports = {
  getAllUsers,
  deleteUser,
  loginUser,
  regiserUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassord
};
