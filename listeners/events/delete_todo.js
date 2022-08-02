const { deleteTask } = require("../../database/db.js");

const deleteTodo = async ({ ack, body }) => {
  try {
    // send "clear" signal as response action to close the modal in slack
    await ack();

    // check if there is an external_id provided -> submit is an edit form
    const task_id = body.view.private_metadata;

    console.log(task_id);

    if (task_id) {
      await deleteTask(task_id);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { deleteTodo };
