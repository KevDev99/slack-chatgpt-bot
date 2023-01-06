// Require the Bolt package (github.com/slackapi/bolt)
const { App, ExpressReceiver } = require("@slack/bolt");

const { connect } = require("./database/db.js");
const qs = require("qs");
const axios = require('axios');

const {
  saveUserWorkspaceInstall,
  saveUserOrgInstall,
  getWorkspaceInstallation,
  getEnterpriseInstallation,
  deleteEnterpriseInstallation,
  deleteWorkspaceInstallation,
} = require("./database/installation.js");

const { registerListeners } = require("./listeners");

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
});

receiver.router.get("/snow_oauth_redirect", async (req, res) => {
  try {
    res.writeHead(200);
    const code = req.param("code");
    const state = req.param("state");
    const clientId = "a60633d0d2986110e6aad8c0b956804e";
    const clientSecret = "A}bQmGj5vu";
    
    const axiosResponse = await axios.post("https://dev107538.service-now.com/oauth_token.do", `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=https://dev107538.service-now.com/login.do`)
    
    console.log(axiosResponse.data);
    
    res.end("Endpoint working OK");
  } catch (err) {
    console.error(err);
  }
});



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

/** Register Listeners (actions, commands, events, ... -> all slack related api endpoints) */
registerListeners(app);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
