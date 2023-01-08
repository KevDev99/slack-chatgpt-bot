const 

class Installation {
  /** Workspace Installation */
  static async saveUserWorkspaceInstall(installation) {
    try {
      // if there is a user token the user will be stored seperately in the database (instead the team entry)
      // the token will be also later needed to change the users status and to set the absence (pause notifications) special user scope
      const id = installation.team.id;

      // get users timezone
      const {
        data: { ok, user },
      } = await axios.post(
        "https://slack.com/api/users.info",
        new URLSearchParams({
          user: installation.user.id,
          token: installation.bot.token,
        })
      );

      if (!ok) throw "Error getting users info";

      const resp = await User.updateOne(
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
