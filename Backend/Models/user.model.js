const mongoose = require("mongoose");
const validator = require("validator");
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
  avatar:{
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  role:{
    type:String,
    default:"user",

  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
