const { fetchTasks } = require("../../database/db.js");

const exportTasks = async ({ ack, say, body, client }) => {
  await ack();

  try {
    let outPutText = "";
    // fetch all tasks
    const tasks = await fetchTasks("done", body.user.id);
    
    tasks.map(async (task) => {
      let assigned_user;

      if(task.assigned_user) {
        assigned_user = await client.users.profile.get({user: task.assigned_user})
      }
      
      outPutText += `${task.summary} ${assigned_user? `- ${assigned_user}` : ""}`;
      outPutText += "\n--------------------------------------------------------------------------\n"
    })
    
    console.log(outPutText);

    // export to text file
  } catch (error) {
    console.error(error);
  }
};

module.exports = { exportTasks };
