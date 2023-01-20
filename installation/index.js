const axios = require("axios");

const { dbInstallation } = require("../database/models/installationModel.js");

class Installation {
  /** Workspace Installation */
  static async saveUserWorkspaceInstall(installation) {
    try {
      const id = installation.team.id;

      const resp = await dbInstallation.updateOne(
        { _id: installation.team.id },
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

      sendWelcomeMessage(installation);

      return resp;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /** GET Workspace Installation */
  static async getWorkspaceInstallation(installId) {
    try {
      const installation = await dbInstallation.find({ _id: installId });
      return installation[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /** DELETE Workspace Installation */
  static async deleteWorkspaceInstallation(teamId) {
    try {
      await dbInstallation.deleteMany({ "team.id": teamId });
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

const sendWelcomeMessage = async (installation) => {
  // send welcome message
  const res = await axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: installation.user.id,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Welcome to the Send As Mail Integration for Slack",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "This app enables you to easily forward messages, files, ... as mail.",
          },
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "How To Send Mails:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Click on the *'more actions' menu* on a message",
          },
        },
        {
          type: "image",
          title: {
            type: "plain_text",
            text: " ",
            emoji: true,
          },
          image_url:
            "https://www.linkpicture.com/q/Screenshot-2023-01-20-at-11.08.14.png",
          alt_text: "marg",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Click on the *Shortcut* 'Send as Mail'",
          },
        },
        {
          type: "image",
          image_url:
            "https://www.linkpicture.com/q/Screenshot-2023-01-20-at-11.13.27.png",
          alt_text: "inspiration",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "All *documents, images, ... will be automatically attatched* to the mail. The message text is automatically added to the message input on the modal:",
          },
        },
        {
          type: "image",
          image_url:
            "https://www.linkpicture.com/q/Screenshot-2023-01-20-at-11.15.26.png",
          alt_text: "inspiration",
        },
      ],
      text: "Let’s get started!",
    },
    {
      headers: {
        Authorization: `Bearer ${installation.bot.token}`,
      },
    }
  );
};

module.exports = Installation;
