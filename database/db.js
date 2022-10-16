const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const Habit = require("./models/habitModel.js");
const UserHabit = require("./models/userHabitModel.js");
const Challenge = require("./models/challengeModel.js");

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

const getTeamInformation = async function (_id, fieldname) {
  try {
    const team = await User.find({ _id });
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

const updateUser = async function (_id, updateObj) {
  try {
    await User.updateOne({ _id }, updateObj);
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

const getHabits = async function () {
  try {
    const habits = await Habit.find({});
    return habits;
  } catch (err) {
    console.error(err);
  }
};

const getHabitByName = async function (name) {
  try {
    const habit = await Habit.findOne({ name });
    return habit;
  } catch (err) {
    console.error(err);
  }
};

const createUserHabit = async function ({
  name,
  targetValue,
  targetText,
  userId,
  teamId,
}) {
  try {
    // add user habit to database
    await UserHabit.create({
      habitName: name,
      targetValue,
      targetText,
      user_id: userId,
      team_id: teamId,
    });
  } catch (err) {
    console.error(err);
  }
};

const getDailyUserHabits = async function (filter) {
  try {
    const dailyUserHabits = await UserHabit.find(filter);
    return dailyUserHabits;
  } catch (error) {
    console.error(error);
  }
};

const getDailyUserHabitsScores = async function (filter) {
  try {
    const dailyUserHabitsScores = await UserHabit.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$user_id",
          count: { $sum: 1 }, // this means that the count will increment by 1
        },
      },
    ]);
    return dailyUserHabitsScores;
  } catch (error) {
    console.error(error);
  }
};

const updateDailyUserHabit = async function (id, field) {
  try {
    await UserHabit.updateOne({ _id: id }, field);
  } catch (error) {
    console.error(error);
  }
};

const getRandomUsers = async (amount = 2, teamId) => {
  try {
    const usersGrouped = await UserHabit.aggregate([
      { $match: { team_id: teamId } },
      {
        $group: {
          _id: "$user_id",
        },
      },
    ]);

    const randomUsers = [];

    for (let i = 1; i <= amount; i++) {
      let random = Math.floor(Math.random() * (usersGrouped.length - 1));

      if (!randomUsers.includes(usersGrouped[random]._id)) {
        randomUsers.push(usersGrouped[random]._id);
      } else {
        i--;
      }
    }

    return randomUsers;
  } catch (error) {
    console.error(error);
  }
};

const getLatestChallenge = async (teamId) => {
  try {
    const challenge = await Challenge.findOne({ teamId, open: true });
    return challenge;
  } catch (err) {
    console.error(err);
  }
};

const addChallenge = async (firstUserId, secondUserId, teamId) => {
  try {
    // add user habit to database
    await Challenge.create({
      firstUserId,
      secondUserId,
      teamId,
      open: true,
    });
  } catch (err) {
    console.error(err);
  }
};

const updateChallenge = async (challengeId, updatedFields) => {
  try {
    // add user habit to database
    await Challenge.updateOne(
      {
        _id: challengeId,
      },
      updatedFields
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  connect,
  getUser,
  updateUser,
  getTeamBotToken,
  getTeamInformation,
  getDailyUserHabits,
  getTeams,
  getHabits,
  getHabitByName,
  createUserHabit,
  updateDailyUserHabit,
  getDailyUserHabitsScores,
  getRandomUsers,
  addChallenge,
  getLatestChallenge,
  updateChallenge,
};
