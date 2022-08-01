const { addTodo } = require("./add_todo.js");
const { blankAction } = require("./blank_action.js");
const { menuTodoSelected } = require("./menu_todo_selected.js");

module.exports.register = (app) => {
  app.action("add_todo", addTodo);
  app.action("assigned_user", blankAction);
  app.action("menu_todo_selected", menuTodoSelected);
};
