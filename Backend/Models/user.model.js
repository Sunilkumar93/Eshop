const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter User Name"],
    minLength: [3, "User Name Should Be More Then 3 CharAt"],
    maxLength: [32, "Name Should Not More Then 32 CharAt"],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
