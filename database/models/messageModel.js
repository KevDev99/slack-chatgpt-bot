const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    channel: String,
    message: String,
    ts: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
