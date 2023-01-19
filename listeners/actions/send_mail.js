
const sendMail = async ({ body, client, ack, shortcut }) => {
  try {
    await ack();

    if (!shortcut.message) {
      return;
    }

    // get text
    const text = shortcut.message.text;

    // create string of all file download urls
    // to submit over "payload" in form
    let filesString = "";

    // get files
    if (shortcut.message.files) {
      // add private download url to the files array
      shortcut.message.files.map((file, index) => {
        filesString += file.url_private_download;
        if (index + 1 < shortcut.message.files.length) {
          filesString += ";";
        }
      });
    }

    await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        private_metadata: filesString,
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
              focus_on_load: true,
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
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: " ",
            },
          },
          {
            type: "input",
            block_id: "message",
            label: {
              type: "plain_text",
              text: "Message",
              emoji: true,
            },
            element: {
              type: "plain_text_input",
              multiline: true,
              initial_value: text || "",
              focus_on_load: false,
              action_id: "message-action",
            },
            optional: true,
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
