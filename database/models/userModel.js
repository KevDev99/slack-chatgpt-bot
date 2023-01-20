const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: String,
  email: String,
  teamId: String,
});

module.exports = mongoose.model("User", userSchema);
