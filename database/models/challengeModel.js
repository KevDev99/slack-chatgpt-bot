const mongoose = require("mongoose");
const challengeSchema = mongoose.Schema(
  {
    firstUserId: String,
    secondUserId: String,
    open: Boolean,
    teamId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("challenge", challengeSchema);
