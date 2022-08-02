const { getAppHome } = require("../events/app_home_opened.js");
const { updateTask } = require("../../database/db.js");

const clearUserAssignment = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // get task id
    const task_id = body.view.private_metadata;
    
    console.log(body.view.blocks);
    
    client.views.update({
      view: body.view,
      view_id: body.view.id
    })

    console.log(body);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { clearUserAssignment };
