const mongoose = require("mongoose");
const habitSchema = mongoose.Schema({
  _id: String,
  name: String,
  text: String,
  inputBlock: [],
});

module.exports = mongoose.model("habit", habitSchema);
