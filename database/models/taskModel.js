const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    summary: String,
    notes: String,
    assigned_user: String,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
