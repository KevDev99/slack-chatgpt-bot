const axios = require('axios');

const {Installation: dbInstallation}   = require("./models/installationModel.js");

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

      // send welcome message
      await axios.post(
        "https://slack.com/api/chat.postMessage",
        {
          channel: installation.user.id,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*You made it!🎉*",
              },
            },
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "Let’s get started!",
                emoji: true,
              },
            },
            {
              type: "input",
              element: {
                type: "channels_select",
                placeholder: {
                  type: "plain_text",
                  text: "Pick an public channel...",
                  emoji: true,
                },
              },
              label: {
                type: "plain_text",
                text: "Which channel would you like to post your round up to ?",
              },
            },
            {
              type: "section",
              text: {
                type: "plain_text",
                text: " ",
                emoji: true,
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    emoji: true,
                    text: "Submit",
                  },
                  style: "primary",
                  value: "approve_button",
                  action_id: "submit_channel",
                },
              ],
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

      return resp;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
