const monoose = require("mongoose");

const userSchema = monoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    default: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "ConfirmPassword is required and must b same"],
    default: false,
  },
});
