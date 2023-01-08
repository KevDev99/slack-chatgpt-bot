const { App } = require("@slack/bolt");
const receiver = require("./config/receiver.js");
const { connect } = require("./database/db.js");
const { registerListeners } = require("./listeners");
const { registerRoutes } = require('./routes');


const app = new App({
  receiver: receiver,
  scopes: ["chat:write"],
  installationStore: {
    storeInstallation: async (installation) => {
      if (
        installation.isEnterpriseInstall &&
        installation.enterprise !== undefined
      ) {
        // handle storing org-wide app installation
        return await saveUserOrgInstall(installation);
      }
      if (installation.team !== undefined) {
        // single team app installation
        return await saveUserWorkspaceInstall(installation);
      }
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      // Bolt will pass your handler an installQuery object
      // Change the lines below so they fetch from your database
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        // handle org wide app installation lookup
        return await getEnterpriseInstallation(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await getWorkspaceInstallation(installQuery.teamId);
      }
      if (installQuery.userId !== undefined) {
        // single team app installation lookup
        return await getWorkspaceInstallation(installQuery.userId);
      }
      throw new Error("Failed fetching installation");
    },
    deleteInstallation: async (installQuery) => {
      // Bolt will pass your handler  an installQuery object
      // Change the lines below so they delete from your database
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        // org wide app installation deletion
        return await deleteEnterpriseInstallation(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        return await deleteWorkspaceInstallation(installQuery.teamId);
      }
      throw new Error("Failed to delete installation");
    },
  },
  installerOptions: {
    directInstall: true,
    userScopes: ["users.profile:write"],
  },
});

// connect to db
connect();
// register Listeners (actions, commands, events, ... -> all slack related api endpoints)
registerListeners(app);
// register routes
registerRoutes(receiver);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
