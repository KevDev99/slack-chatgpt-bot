const { getAppHome } = require("../events/app_home_opened.js");
const { updateTask } = require("../../database/db.js");

const clearUserAssignment = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // get task id
    const task_id = body.view.private_metadata;

    body.view.blocks.map((block) => {
      if (block?.accessory?.type === "conversations_select") {
        delete block?.accessory?.initial_conversation;
      }
    });

    console.log(body.view);

    client.views.update({
      view: body.view,
      view_id: body.view.id,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { clearUserAssignment };
