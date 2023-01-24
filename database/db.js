const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const { dbInstallation } = require("./models/installationModel.js");

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

const getUser = async function (filter) {
  try {
    // fetch user from database
    const user = await User.find(filter);

    return user[0];
  } catch (e) {
    console.error("Error when fetching user", e);
  }
};

const addUser = async function (userFields) {
  try {
    // fetch user from database
    const user = await User.create(userFields);

    return user[0];
  } catch (e) {
    console.error("Error when adding user", e);
  }
};

const removeUser = async function (filterField) {
  try {
    await User.deleteOne(filterField);
  } catch (e) {
    console.error("Error when deleting user", e);
  }
};

const getUsers = async function (teamId) {
  try {
    // fetch user from database
    const users = await User.find({ teamId });

    return users;
  } catch (e) {
    console.error("Error when fetching user", e);
  }
};

const getTeamBotToken = async (teamId) => {
  try {
    // fetch user from database
    const team = await dbInstallation.find({ _id: teamId });
    if (team.length > 0) {
      return team[0].bot.token;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getTeamInformation = async function (_id, fieldname) {
  try {
    const team = await dbInstallation.find({ _id });
    if (team[0] != undefined) {
      if (fieldname.includes(".")) {
        const [field1, field2] = fieldname.split(".");
        return team[0][field1][field2];
      }
      return team[0][fieldname];
    } else {
      return null;
    }
  } catch (e) {
    console.error("Failed to update user", e);
  }
};

const getTeams = async function (filter = {}) {
  try {
    const teams = await User.find(filter);
    return teams;
  } catch (err) {
    console.error(err);
  }
};

const insertUser = async function (email, teamId) {
  try {
    // add user
    await User.insertOne({ email, teamId });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  connect,
  getUser,
  getTeamBotToken,
  getTeamInformation,
  getTeams,
  getUsers,
  addUser,
  removeUser
};
