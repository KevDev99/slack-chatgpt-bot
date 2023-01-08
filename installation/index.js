const axios = require("axios");

const { dbInstallation } = require("../database/models/installationModel.js");

class Installation {
  /** Workspace Installation */
  static async saveUserWorkspaceInstall(installation) {
    try {
      const id = installation.team.id;

      const resp = await dbInstallation.updateOne(
        { _id: installation.user.id },
        {
          team: { id: installation.team.id, name: installation.team.name },
          // entperise id is null on workspace install
          enterprise: { id: "null", name: "null" },
          // user scopes + token is null on workspace install
          user: {
            token: installation.user.token,
            scopes: installation.user.scopes,
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

      sendWelcomeMessage(installation.user.id, installation.bot.token);

      return resp;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /** GET Workspace Installation */
  static async getWorkspaceInstallation(installId) {
    try {
      const installation = await Installation.find({ _id: installId });
      return installation[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /** DELETE Workspace Installation */
  static async deleteWorkspaceInstallation(teamId) {
    try {
      await Installation.deleteMany({ "team.id": teamId });
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

const sendWelcomeMessage = (installationUserId, botToken) => {
  // send welcome message
  axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: installationUserId,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Welcome to the ServiceNow Integration for Slack",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "This app enables you to easily submit, manage, and collaborate on Incidents, IT service requests and more right here within Slack.",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Before you and your team can do all these amazing things, you'll need to connect your ServiceNow instance to Slack.*",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: " ",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "🔗 Connect ServiceNow to Slack",
              emoji: true,
            },
            value: "click_me_123",
            url: process.env.BASE_URL + "/snow_oauth_redirect",
            action_id: "button-action",
          },
        },
      ],
      text: "Let’s get started!",
    },
    {
      headers: {
        Authorization: `Bearer ${botToken}`,
      },
    }
  );
};

module.exports = Installation;
