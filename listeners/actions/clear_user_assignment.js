const { getAppHome } = require("../events/app_home_opened.js");
const { updateTask, getTask } = require("../../database/db.js");
const { getEditModal } = require("./edit_todo.js");

const clearUserAssignment = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // get task id
    const taskId = body.view.private_metadata;
    const task = await getTask(taskId);

    // get basic view
    const modal = await getEditModal(task);

    // update the view
    body.view.blocks.map((block) => {
      if (block?.accessory?.type === "conversations_select") {
        // IMPORTANT! the block id needs to change -> else slack persists the values
        block.block_id = new Date().toString();
        delete block?.accessory?.initial_conversation;
      }
    });

    modal.view.blocks = body.view.blocks;

    await client.views.update({
      view: modal.view,
      view_id: body.view.id,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { clearUserAssignment };
