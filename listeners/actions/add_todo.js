const {} = require("../../database/db.js");

const { getTimes } = require("../../helper/index.js");

const setReminder = async ({ ack, say, body, client }) => {
  await ack();

  try {
    const reminderModal = {
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        callback_id: "submit_reminder",
        title: {
          type: "plain_text",
          text: "Set your reminder",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Save",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
         
        ],
      },
    };

    const result = await client.views.open(reminderModal);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { setReminder };
