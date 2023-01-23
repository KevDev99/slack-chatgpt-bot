const { formatState } = require("../../helper");

const mail_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const addUser = async ({ body, client, ack, shortcut, say }) => {
  try {
    // format state
    const state = formatState(body.view.state.values);

    // check if input is a mail
    const { add_user } = state;
    if (!mail_regex.test(add_user)) {
      return  ack({
        response_action: "errors",
        errors: {
          add_user: "Please enter a valid email.",
        },
      });
    }
    
    

    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = addUser;
