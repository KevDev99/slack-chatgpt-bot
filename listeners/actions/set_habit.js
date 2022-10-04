const { formatMessageState } = require("../../helper");
const { updateUser, getTeamInformation } = require("../../database/db.js");

const setHabit = async ({ ack, say, body, client }) => {
  await ack();

  // check if approve or deny
  const action = body.actions[0];

  if (!action) return;

  if (action.value === "approve") {
    // open modal to select daily habit
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: "modal",
          callback_id: "set_habit_target",
          title: {
            type: "plain_text",
            text: "Set Your Habits",
            emoji: true,
          },
          submit: {
            type: "plain_text",
            text: "Next",
            emoji: true,
          },
          close: {
            type: "plain_text",
            text: "Cancel",
            emoji: true,
          },
          blocks: [
            {
              type: "input",
              element: {
                type: "checkboxes",
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "🥛 Drink Water",
                      emoji: true,
                    },
                    value: "drink-water",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "🦶 Get steps in",
                      emoji: true,
                    },
                    value: "get-steps-in",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "🤸‍♂️ Movement snack",
                      emoji: true,
                    },
                    value: "movement-snack",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "🧠 Mindfulness activity",
                      emoji: true,
                    },
                    value: "mindfulness-activity",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "🍱 Make balanced meals",
                      emoji: true,
                    },
                    value: "make-balanced-meals",
                  },
                ],
              },
              label: {
                type: "plain_text",
                text: "Choose your daily habits:",
                emoji: true,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    // update message"you’ve declined your habits today. No worries, get after it tomorrow!"
    await client.chat.update({
      channel: body.channel.id,
      ts: body.message.ts,
      text: "you’ve declined your habits today. No worries, get after it tomorrow!",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `you’ve declined your habits today. No worries, get after it tomorrow!`,
          },
        },
      ],
    });
  }
};

module.exports = { setHabit };
