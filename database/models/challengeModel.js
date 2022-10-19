const mongoose = require("mongoose");
const challengeSchema = mongoose.Schema(
  {
    userList: [],
    open: Boolean,
    teamId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("challenge", challengeSchema);
