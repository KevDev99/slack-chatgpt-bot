const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: String,
  teamId: String,
});

module.exports = mongoose.model("User", userSchema);
