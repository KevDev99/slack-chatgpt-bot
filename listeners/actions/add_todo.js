const addTodo = async ({ ack, say, body, client }) => {
  await ack();

  try {
    const todoModal = {
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
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "summary_input",
              placeholder: {
                type: "plain_text",
                text: "Summarize your task",
              },
            },
            label: {
              type: "plain_text",
              text: "✔️ Summary",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              multiline: true,
              action_id: "notes_input",
              placeholder: {
                type: "plain_text",
                text: "Additional notes...",
              },
            },
            label: {
              type: "plain_text",
              text: "✍️ Notes (optional)",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "👤 *Assign to (optional):*",
            },
            accessory: {
              type: "users_select",
              placeholder: {
                type: "plain_text",
                text: "Select a user",
                emoji: true,
              },
              action_id: "assigntouser_select",
            },
          },
        ],
      },
    };

    const result = await client.views.open(todoModal);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addTodo };
