const sendMail = async ({ body, client, ack }) => {
  try {
    await ack();

    await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        // View identifier
        callback_id: "submit_sendmail",
        title: {
          type: "plain_text",
          text: "Send Mail",
        },
        blocks: [
          
        ],
        submit: {
          type: "plain_text",
          text: "Send",
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendMail;