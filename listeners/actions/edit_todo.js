const getEditModal = (task) => {
  const editModal = {
    // View payload
    view: {
      private_metadata: task._id,
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
  };

  /*if (task.assigned_user) {
    user_select.accessory.initial_user = task.assigned_user;
  }

  editModal.view.blocks.push(user_select);

  return editModal;
};

module.exports = { getEditModal };
