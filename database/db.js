const mongoose = require("mongoose");
const User = require("./models/userModel.js");

const uri = process.env.DB_URI;

const connect = async function () {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("📕 DB sucessfully connected");
  } catch (e) {
    console.error("Error when connectiong to the database", e);
  }
};

const getUser = async function (userId) {
  try {
    // fetch user from database
    const user = await User.find({ _id: userId });

    if (user[0] != undefined) {
      return user[0];
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error when fetching user", e);
  }
};



/** Get Team Bot Token */
const getTeamBotToken = async (teamId) => {
  try {
    // fetch user from database
    const team = await User.find({ _id: teamId });
    if (team.length > 0) {
      return team[0].bot.token;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  connect,
  getUser,
  
  getTeamBotToken,
};
