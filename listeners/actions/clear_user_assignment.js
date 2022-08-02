const { getAppHome } = require("../events/app_home_opened.js");
const { updateTask } = require("../../database/db.js");

const clearUserAssignment = async ({ ack, say, body, client }) => {
  await ack();

  try {
    
    // get task id
    const task_id = body.view.private_metadata;
    
    // unset user assignment in database
    updateTask(task_id, {})
    
    // update view

    
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { clearUserAssignment };
