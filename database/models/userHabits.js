const mongoose = require("mongoose");
const userHabits = mongoose.Schema({
  _id: String,
  habitName: String,
  targetValue: String,
  status: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("userhabits", userHabits);
