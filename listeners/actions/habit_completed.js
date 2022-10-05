const habitCompleted = async ({ ack, say, body, client }) => {
  await ack();
};

module.exports = { habitCompleted };
