const { getAppHome } = require("../events/app_home_opened.js");

const setHomeFilter = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // get status from body
    const status = body.actions[0].selected_option.value;
    console.log(status);
    getAppHome(status);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { setHomeFilter };
