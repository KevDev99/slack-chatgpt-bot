const axios = require("axios");

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
const getWorkspaceInstallation = async (userId) => {
  try {
    
    
    // fetch user from database
    const user = await User.find({ "_id": userId });
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

module.exports = {
  deleteWorkspaceInstallation,
  deleteEnterpriseInstallation,
  getEnterpriseInstallation,
  getWorkspaceInstallation,
  saveUserOrgInstall,
  saveUserWorkspaceInstall,
};
