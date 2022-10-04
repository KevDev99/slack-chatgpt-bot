const { formatMessageState } = require("../../helper");
const { updateUser, getTeamInformation } = require("../../database/db.js");

const submitDailyHabit = async ({ ack, say, body, client }) => {
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
          // View identifier
          callback_id: "view_1",
          title: {
            type: "plain_text",
            text: "Open Modal",
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "Welcome to a modal with _blocks_",
              },
              accessory: {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click me!",
                },
                action_id: "button_abc",
              },
            },
            {
              type: "input",
              block_id: "input_c",
              label: {
                type: "plain_text",
                text: "What are your hopes and dreams?",
              },
              element: {
                type: "plain_text_input",
                action_id: "dreamy_input",
                multiline: true,
              },
            },
          ],
          submit: {
            type: "plain_text",
            text: "Submit",
          },
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

module.exports = { submitDailyHabit };
