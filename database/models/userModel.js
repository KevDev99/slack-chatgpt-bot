const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
  },
  { _id: false }
);

module.exports = mongoose.model("User", userSchema);
