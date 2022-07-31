const { getUser, addUser } = require("../../database/db.js");

const appHomeOpened = async ({ event, client, say, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({
      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: "home",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Welcome to your personal Drink-Water Reminder 🥛",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "This app secures your water intake and ensures that you always stay hydrated. ",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Why Is Water So Important?* \n\n  * boosts energy 🔋 \n  * improve mood 😀 \n  * fight off illness 💪 \n  * keep skin looking good 🧑‍🦲 \n  ... ",
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Configure your reminder with the following button and get right started",
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
                  text: "Personalize",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "set_reminder",
              },
            ],
          },
        ],
      },
    });

    // if the users visits the application for the first time - send him a welcome message
    const { user } = event;
    // check if event.view is given -> else the user is leaving the app home
    if (event.view) {
      const { team_id } = event.view;
      if (!(await getUser(user))) {
        // when user doesn't exist -> add him to db and sent a welcome message
        await addUser(user, team_id);
        await say({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `Hello <@${user}> and welcome to Checkov - your shared ToDo list ✅🫂!`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "You can perform any needed operation over the *Home Page* 🏠 \n so check it out ⬆️ \n\n here is a quick overview of all available *commands* ",
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "Start",
                    emoji: true,
                  },
                  value: "click_me_123",
                  action_id: "set_reminder",
                },
              ],
            },
          ],
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { appHomeOpened };
