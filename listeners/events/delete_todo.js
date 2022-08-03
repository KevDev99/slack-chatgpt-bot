const { deleteTask, getTask } = require("../../database/db.js");
const { getAppHome } = require("./app_home_opened.js");

const moment = require("moment");

const deleteTodo = async ({ ack, body, client }) => {
  try {
    // send "clear" signal as response action to close the modal in slack
    await ack();

    // check if there is an external_id provided -> submit is an edit form
    const task_id = body.view.private_metadata;

    // get user id from body
    const userId = body["user"]["id"];

    const task = await getTask(task_id);

    if (task_id) {
      await deleteTask(task_id);
    }

    // inform assigned user about deletion
    if (task.assigned_user) {
      client.chat.postMessage({
        channel: task.assigned_user,
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "🗑️ Following task has been deleted:",
              emoji: true,
            },
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: task.summary,
              emoji: true,
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "by: " + `<@${userId}>`,
              },
              {
                type: "mrkdwn",
                text:
                  "at: " + moment().format("YYYY-MM-DD, h:mm:ss a") + " GMT",
              },
            ],
          },
        ],
      });
    }

    // update view
    client.views.publish({
      view: (await getAppHome(userId, "open")).view,
      user_id: userId,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { deleteTodo };
