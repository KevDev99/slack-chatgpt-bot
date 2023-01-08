const { formatState } = require("../../helper");

const connectServiceNow = async ({ body, client, logger, ack }) => {
  try {
    // format body state
    formatState(body.view.state.values);

    // check if instance url is reachable

    // check if instance url + client id is correct

    // acknowledge request

    // refresh home screen

    //await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectServiceNow;
