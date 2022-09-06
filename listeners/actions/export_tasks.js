const { fetchTasks } = require("../../database/db.js");
const fs = require('fs');


const exportTasks = async ({ ack, say, body, client }) => {
  await ack();

  try {
    let outPutText = "";
    // fetch all tasks
    const tasks = await fetchTasks("done", body.user.id);

    // write header
    outPutText +=
      "Chekhov Data Export: " + new Date().toDateString() + "\n\n\n";

    await Promise.all(
      tasks.map(async (task) => {
        let assigned_user_name;

        if (task.assigned_user) {
          const { user } = await client.users.info({
            user: task.assigned_user,
          });
          const { profile } = user;
          assigned_user_name = profile.display_name;
        }

        outPutText += `${task.summary} ${
          assigned_user_name ? `- ${assigned_user_name}` : ""
        }`;
        outPutText +=
          "\n--------------------------------------------------------------------------\n";
      })
    );

    // create text file
    fs.writeFileSync('/tmp/test-sync.txt', 'Hey there!')
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { exportTasks };
