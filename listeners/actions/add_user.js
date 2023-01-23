const { formatState } = require("../../helper");
const db = require("../../database/db.js");

const mail_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const addUser = async ({ body, client, ack, shortcut, say }) => {
  try {
    // format state
    const state = formatState(body.view.state.values);

    // check if input is a mail
    const { add_user: email } = state;
    if (!mail_regex.test(email)) {
      return ack({
        response_action: "errors",
        errors: {
          add_user: "Please enter a valid email.",
        },
      });
    }

    // check if user already exists
    const user = await db.getUser({ email, teamId: body.team.id });

    if (user) {
      return ack({
        response_action: "errors",
        errors: {
          add_user: "User already exists.",
        },
      });
    }

    // add user
    db.addUser({ email, teamId: body.team.id });

    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = addUser;
