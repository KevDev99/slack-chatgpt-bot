const addTodo = async ({ ack, say, body, client }) => {
  await ack();

  try {
    const todoModal = {
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        callback_id: "submit_todo",
        title: {
          type: "plain_text",
          text: "New Task",
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
              action_id: "summary",
              placeholder: {
                type: "plain_text",
                text: " ",
              },
            },
            label: {
              type: "plain_text",
              text: "Summary",
              emoji: true,
            },
          },

          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Assign to: (optional)*",
            },
            accessory: {
              type: "conversations_select",
              placeholder: {
                type: "plain_text",
                text: "Select user",
                emoji: true,
              },
              filter: {
                include: ["im"],
                exclude_bot_users: true,
              },
              action_id: "assigned_user",
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
