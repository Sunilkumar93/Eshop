const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter User Name"],
    minLength: [3, "User Name Should Be More Then 3 CharAt"],
    maxLength: [32, "Name Should Not More Then 32 CharAt"],
  },
  email: {
    type: String,
    required: [true, "Please Enter User Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password Should More Then 8 CharAt"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(
    this.password,
    +process.env.PASSWORD_ENCRIPTION_ROUND
  );
});

// get JWT Token

userSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.Expires_In,
  });
};

userSchema.methods.comparePassword = async function (payload) {
  return await bcrypt.compare(payload, this.password);
};

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
