const { formatMessageState } = require("../../helper");
const { updateUser, getHabits } = require("../../database/db.js");

const setHabit = async ({ ack, say, body, client }) => {
  await ack();

  // check if approve or deny
  const action = body.actions[0];

  if (!action) return;

  // set messagets and channel as private metadata to update the message later on
  const private_metadata = body.message.ts + ";" + body.channel.id;

  // fetch all habits
  const habits = await getHabits();

  const habitsBlock = getHabitsBlock(habits);

  if (action.value === "approve") {
    // open modal to select daily habit
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: "modal",
          private_metadata: private_metadata,
          callback_id: "set_habit_target",
          title: {
            type: "plain_text",
            text: "Set Your Habits",
            emoji: true,
          },
          submit: {
            type: "plain_text",
            text: "Next",
            emoji: true,
          },
          close: {
            type: "plain_text",
            text: "Cancel",
            emoji: true,
          },
          blocks: habitsBlock,
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    // update message"you’ve declined your habits today. No worries, get after it tomorrow!"
    await client.chat.update({
      channel: body.channel.id,
      ts: body.message.ts,
      text: "you’ve declined your habits today. No worries, get after it tomorrow!",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `you’ve declined your habits today. No worries, get after it tomorrow!`,
          },
        },
      ],
    });
  }
};

const getHabitsBlock = (habits) => {
  const habitsBlock = [
    {
      type: "input",
      element: {
        type: "checkboxes",
        options: [],
      },
      label: {
        type: "plain_text",
        text: "Choose Your Habits ",
        emoji: true,
      },
    },
  ];

  habits.map((habit) => {
    habitsBlock[0].element.options.push({
      text: {
        type: "plain_text",
        text: habit.text,
        emoji: true,
      },
      value: habit.value,
    });
  });

  return habitsBlock;
};

module.exports = { setHabit };
