const { addTodo } = require('./add_todo.js');
const { blankAction } = require('./blank_action.js');

module.exports.register = (app) => {
  app.action('add_todo', addTodo);
  app.action('assigned_user', blankAction)
};