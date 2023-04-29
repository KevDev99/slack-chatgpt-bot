const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    channel: String,
    text: String,
    ts: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
