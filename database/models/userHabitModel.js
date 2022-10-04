const mongoose = require("mongoose");
const userHabitSchema = mongoose.Schema(
  {
    habitName: String,
    targetValue: String,
    user_id: String,
    status: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserHabit", userHabitSchema);
