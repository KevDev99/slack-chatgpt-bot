const getEditModal = (task) => {
  

  const editModal = {
    // View payload
    view: {
      type: "modal",
      callback_id: "submit_todo",
      title: {
        type: "plain_text",
        text: "Edit task",
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
            initial_value: task.summary,
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
            initial_value: task.notes,
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
      ],
    },
  };

  // check if a user has been assigned to -> add user as initial user
  const user_select = {
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
  };

  if (task.assigned_user) {
    console.log("assigned user");
    user_select.inital_user = task.assigned_user;
  }

  editModal.view.blocks.push(user_select);

  return editModal;
};

module.exports = { getEditModal };
