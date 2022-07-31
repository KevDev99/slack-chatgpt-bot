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
        
        // BLOCK KIT LINK: https://app.slack.com/block-kit-builder/T01JNNW3ZFD#%7B%22blocks%22:%5B%7B%22type%22:%22header%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22Hello%20and%20welcome%20to%20Checkov%20-%20your%20Shared%20ToDo%20List%20%E2%9C%85%F0%9F%AB%82!%22,%22emoji%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22You%20can%20perform%20any%20needed%20operation%20over%20the%20*Home%20Page*%20%F0%9F%8F%A0%20%5Cn%20so%20%20-%20check%20it%20out%20%E2%AC%86%EF%B8%8F%20%5Cn%5Cn%20%22%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%20%22,%22emoji%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22here%20is%20a%20quick%20overview%20of%20all%20available%20*commands*%22%7D%7D,%7B%22type%22:%22divider%22%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22%5Cn%5Cn%20*/newtask*%20-%20creates%20a%20new%20task%22%7D,%22accessory%22:%7B%22type%22:%22button%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%20%E2%9E%95%22,%22emoji%22:true%7D,%22value%22:%22click_me_123%22,%22action_id%22:%22button-action%22%7D%7D%5D%7D
        await say({
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "Hello and welcome to Checkov - your Shared ToDo List ✅🫂!",
                emoji: true,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "You can perform any needed operation over the *Home Page* 🏠 \n so  - check it out ⬆️ \n\n ",
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
              type: "section",
              text: {
                type: "mrkdwn",
                text: "here is a quick overview of all available *commands*",
              },
            },
            {
              type: "divider",
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "\n\n */newtask* - creates a new task",
              },
              accessory: {
                type: "button",
                text: {
                  type: "plain_text",
                  text: " ➕",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "newtask",
              },
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
