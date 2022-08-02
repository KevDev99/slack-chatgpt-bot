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

  // check if there is already a user assigned
  if (task.assigned_user) {
    // add as initial value
    user_select.accessory.initial_conversation = task.assigned_user;
  }

  editModal.view.blocks.push(user_select);

  if (task.assigned_user) {
    // add "clear assignment button"
    editModal.view.blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Clear user assignment",
            emoji: true,
          },
          value: "click_me_123",
          action_id: "clear_user_assignment",
        },
      ],
    });
  }

  return editModal;
};

module.exports = { getEditModal };
