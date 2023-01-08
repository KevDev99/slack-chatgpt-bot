const connectServiceNow = async ({ body, client, logger, ack }) => {
  try {
    // ...
    console.log(body.view.state.values);

    //await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectServiceNow;
