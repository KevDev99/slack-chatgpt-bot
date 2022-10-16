const mongoose = require("mongoose");
const challengeSchema = mongoose.Schema(
  {
    _id: String,
    firstUserId: String,
    secondUserId: String,
    open: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("challenge", challengeSchema);
