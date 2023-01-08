const { App } = require("@slack/bolt");
const Installation = require("../installation");

const receiver = require("./receiver.js");

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
        return await Installation.saveUserWorkspaceInstall(installation);
      }
      if (installation.team !== undefined) {
        // single team app installation
        return await Installation.saveUserWorkspaceInstall(installation);
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
        return await Installation.getWorkspaceInstallation(installQuery.teamId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await Installation.getWorkspaceInstallation(installQuery.teamId);
      }
      /*if (installQuery.userId !== undefined) {
        // single team app installation lookup
        return await getWorkspaceInstallation.getWorkspaceInstallation(installQuery.userId);
      }*/
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
        return await Installation.deleteEnterpriseInstallation(
          installQuery.teamId
        );
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        return await Installation.deleteWorkspaceInstallation(
          installQuery.teamId
        );
      }
      throw new Error("Failed to delete installation");
    },
  },
  installerOptions: {
    directInstall: true,
  },
});

module.exports = app;
