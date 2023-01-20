const { formatState } = require("../../helper");

const addUser = async ({ body, client, ack, shortcut, say }) => {
  try {
    await ack();

    // format state
    const state = formatState(body.view.state.values);
    
    // check if input is a mail
    
  } catch (err) {
    console.error(err);
  }
};

module.exports = addUser;
