const { deleteTask } = require("../../database/db.js");
const { getAppHome } = require("./app_home_opened.js");

const deleteTodo = async ({ ack, body, client }) => {
  try {
    // send "clear" signal as response action to close the modal in slack
    await ack();

    console.log(body.view);

    // check if there is an external_id provided -> submit is an edit form
    const task_id = body.view.private_metadata;

    // get user id from body
    const userId = body["user"]["id"];

    console.log(task_id);

    if (task_id) {
      await deleteTask(task_id);
    }

    // update view
    client.views.publish({
      view: (await getAppHome()).view,
      user_id: userId,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { deleteTodo };
