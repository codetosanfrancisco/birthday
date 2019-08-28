let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: String,
  birthday: Date
});

module.exports = mongoose.model("User", userSchema);
