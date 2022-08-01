const { addTodo } = require('./add_todo.js');

module.exports.register = (app) => {
  app.action('add_todo', addTodo);
};