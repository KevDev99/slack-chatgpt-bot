const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  _id: String,
  summary: String,
  notes: String,
  assigned_user: String,
  createdBy: String,
});

module.exports = mongoose.model("Task", taskSchema);
