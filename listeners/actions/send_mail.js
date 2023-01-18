const sendMail = async ({ body, client, ack, shortcut }) => {
  try {
    await ack();
    
    console.log(shortcut.message);

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
          {
            type: "input",
            block_id: "receipts",
            element: {
              type: "multi_static_select",
              placeholder: {
                type: "plain_text",
                text: "Select receipts",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "kevin.taufer@outlook.com",
                    emoji: true,
                  },
                  value: "kevin.taufer@outlook.com",
                },
              ],
              action_id: "receipts-action",
            },
            label: {
              type: "plain_text",
              text: "Receipts",
              emoji: true,
            },
          },
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
