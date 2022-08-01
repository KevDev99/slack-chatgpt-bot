const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const Task = require("./models/taskModel.js");

const uri =
  "mongodb+srv://" +
  process.env.DB_USERNAME +
  ":" +
  process.env.DB_PASSWORD +
  "@cluster0.hq9t1.mongodb.net/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";

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

const addUser = async function (_id, team_id) {
  try {
    const user = new User({
      _id,
      team: {
        id: team_id,
        name: "",
      },
    });

    await user.save();
  } catch (e) {
    console.error("Error when adding user", e);
  }
};

const addTask = async function (summary, notes, assigned_user, createdBy) {
  try {
    const task = new Task({
      summary,
      notes,
      assigned_user,
      createdBy,
    });

    await task.save();
  } catch (error) {
    console.error(error);
    return error;
  }
};

const fetchTasks = async function (status = "open") {
  try {
    // fetch user from database
    const tasks = await Task.find({ status }).sort({ createdAt: "desc" });

    return tasks;
  } catch (e) {
    console.error("Error when fetching tasks", e);
  }
};

/** Workspace Installation */
const saveUserWorkspaceInstall = async (installation) => {
  try {
    // if there is a user token the user will be stored seperately in the database (instead the team entry)
    // the token will be also later needed to change the users status and to set the absence (pause notifications) special user scope
    const id = installation.user.token
      ? installation.user.id
      : installation.team.id;

    const resp = await User.updateOne(
      { _id: id },
      {
        team: { id: installation.team.id, name: installation.team.name },
        // entperise id is null on workspace install
        enterprise: { id: "null", name: "null" },
        // user scopes + token is null on workspace install
        user: {
          token: installation.user.token,
          scopes: installation.user.token,
          id: installation.user.id,
        },
        tokenType: installation.tokenType,
        isEnterpriseInstall: installation.isEnterpriseInstall,
        appId: installation.appId,
        authVersion: installation.authVersion,
        bot: {
          scopes: installation.bot.scopes,
          token: installation.bot.token,
          userId: installation.bot.userId,
          id: installation.bot.id,
        },
      },
      { upsert: true }
    );

    return resp;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/** Enterprise Installation */
const saveUserOrgInstall = async function (installation) {
  try {
    const resp = await User.updateOne(
      { _id: installation.enterprise.id },
      {
        team: "null",
        enterprise: {
          id: installation.enterprise.id,
          name: installation.enterprise.name,
        },
        user: {
          token: installation.user.token,
          scopes: installation.user.scopes,
          id: installation.user.id,
        },
        tokenType: installation.tokenType,
        isEnterpriseInstall: installation.isEnterpriseInstall,
        appId: installation.appId,
        authVersion: installation.authVersion,
        bot: "null",
      },
      { upsert: true }
    );
    return resp;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/** GET Workspace Installation */
const getWorkspaceInstallation = async (teamId) => {
  try {
    // fetch user from database
    const user = await User.find({ "team.id": teamId });
    return user[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

/** GET Enterprise Installation */
const getEnterpriseInstallation = async (enterpriseId) => {
  try {
    // fetch user from database
    const user = await User.find({ "enterprise.id": enterpriseId });
    return user[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

/** DELETE Enterprise Installation */
const deleteEnterpriseInstallation = async (enterpriseId) => {
  try {
    await User.deleteMany({ "enterprise.id": enterpriseId });
  } catch (error) {
    console.error(error);
    return error;
  }
};

/** DELETE Workspace Installation */
const deleteWorkspaceInstallation = async (teamId) => {
  try {
    await User.deleteMany({ "team.id": teamId });
  } catch (error) {
    console.error(error);
    return error;
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
  addUser,
  addTask,
  fetchTasks,
  saveUserWorkspaceInstall,
  saveUserOrgInstall,
  getWorkspaceInstallation,
  getEnterpriseInstallation,
  deleteWorkspaceInstallation,
  deleteEnterpriseInstallation,
  getTeamBotToken,
};
