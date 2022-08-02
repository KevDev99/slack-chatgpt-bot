const { appHomeOpened } = require("./app_home_opened.js");
const { submitTodo } = require("./submit_todo.js");
const { deleteTodo } = require("./delete_todo.js");

module.exports.register = (app) => {
  app.event("app_home_opened", appHomeOpened);
  app.view("submit_todo", submitTodo);
  app.view("delete_todo", deleteTodo);
};
