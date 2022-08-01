const { updateTask } = require("../../database/db.js");
const { getAppHome } = require("../events/app_home_opened.js");
const { getEditModal } = require("./edit_todo.js");

const menuTodoSelected = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // check which option the user has choosen
    const [selected_option, selected_option_taskId] =
      body.actions[0].selected_option.value.split("-");

    switch (selected_option) {
      case "complete_todo":
        await markTodoAsComplete(selected_option_taskId, body.user.id, client);
      case "edit_todo":
        await editTodo(
          selected_option_taskId,
          body.user.id,
          client,
          body.trigger_id
        );
    }
  } catch (error) {
    console.error(error);
  }
};

const markTodoAsComplete = async function (taskId, userId, client) {
  await updateTask(taskId, { status: "done" });

  // update view
  await client.views.publish({
    view: (await getAppHome()).view,
    user_id: userId,
  });
};

const editTodo = async function (todoId, userId, client, trigger_id) {
  await client.views.open({ view: getEditModal().view, trigger_id });
};

module.exports = { menuTodoSelected };
