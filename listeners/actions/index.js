const { addTodo } = require("./add_todo.js");
const { blankAction } = require("./blank_action.js");
const { menuTodoSelected } = require("./menu_todo_selected.js");
const { setHomeFilter } = require("./set_home_filter.js");
const { clearUserAssignment } = require("./clear_user_assignment.js");
const { exportTasks } = require("./export_tasks.js");


module.exports.register = (app) => {
  app.action("add_todo", addTodo);
  app.action("assigned_user", blankAction);
  app.action("menu_todo_selected", menuTodoSelected);
  app.action("set_home_filter", setHomeFilter);
  app.action("clear_user_assignment", clearUserAssignment);
  app.action("export_tasks", exportTasks);
};
