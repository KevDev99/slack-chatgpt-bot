const { getAppHome } = require("../events/app_home_opened.js");

const setHomeFilter = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // get status from body

    const status = body.actions[0].selected_option?.value;
    

    if (!status) return;

    // update view
    client.views.publish({
      view: (await getAppHome(body.user.id, status)).view,
      user_id: body.user.id,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { setHomeFilter };
