const getEditModal = async () => {


  try {
    const editModal = {
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        callback_id: "submit_todo",
        title: {
          type: "plain_text",
          text: "Add new task",
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
              action_id: "notes",
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
              action_id: "assigned_user",
            },
          },
        ],
      },
    };

    return editModal
  } catch (error) {
    console.error(error);
  }
};

module.exports = { editTodo };
