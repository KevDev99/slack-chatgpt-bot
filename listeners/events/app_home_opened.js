const { getUser, addUser, fetchTasks } = require("../../database/db.js");

const appHomeOpened = async ({ event, client, say, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */

    // return the app home
    const result = await client.views.publish(await getAppHome(event.user));

    // if the users visits the application for the first time - send him a welcome message
    const { user } = event;
    // check if event.view is given -> else the user is leaving the app home
    if (event.view) {
      const { team_id } = event.view;
      if (!(await getUser(user))) {
        // when user doesn't exist -> add him to db and sent a welcome message
        await addUser(user, team_id);

        // BLOCK KIT LINK: https://app.slack.com/block-kit-builder/T01JNNW3ZFD#%7B%22blocks%22:%5B%7B%22type%22:%22header%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22Hello%20and%20welcome%20to%20Checkov%20-%20your%20Shared%20ToDo%20List%20%E2%9C%85%F0%9F%AB%82!%22,%22emoji%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22You%20can%20perform%20any%20needed%20operation%20over%20the%20*Home%20Page*%20%F0%9F%8F%A0%20%5Cn%20so%20%20-%20check%20it%20out%20%E2%AC%86%EF%B8%8F%20%5Cn%5Cn%20%22%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%20%22,%22emoji%22:true%7D%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22here%20is%20a%20quick%20overview%20of%20all%20available%20*commands*%22%7D%7D,%7B%22type%22:%22divider%22%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22%5Cn%5Cn%20*/newtask*%20-%20creates%20a%20new%20task%22%7D,%22accessory%22:%7B%22type%22:%22button%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%20%E2%9E%95%22,%22emoji%22:true%7D,%22value%22:%22click_me_123%22,%22action_id%22:%22button-action%22%7D%7D%5D%7D
        await say({
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "Hello and welcome to Checkov - your Shared ToDo List ✅🫂!",
                emoji: true,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "You can perform any needed operation over the *Home Page* 🏠 \n so  - check it out ⬆️ \n\n ",
              },
            },
            {
              type: "section",
              text: {
                type: "plain_text",
                text: " ",
                emoji: true,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "here is a quick overview of all available *commands*",
              },
            },
            {
              type: "divider",
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "\n\n */newtask* - creates a new task",
              },
              accessory: {
                type: "button",
                text: {
                  type: "plain_text",
                  text: " ➕",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "newtask",
              },
            },
          ],
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const getAppHome = async (userId, status = "open") => {
  const appHome = {
    /* the user that opened your app's app home */
    user_id: userId,

    /* the view object that appears in the app home*/

    /* HOME BLOCK KIT LINK: https://app.slack.com/block-kit-builder/T01JNNW3ZFD#%7B%22type%22:%22home%22,%22blocks%22:%5B%7B%22type%22:%22actions%22,%22elements%22:%5B%7B%22type%22:%22button%22,%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%E2%9E%95%20Add%20to-do%22,%22emoji%22:true%7D,%22value%22:%22click_me_123%22,%22action_id%22:%22actionId-0%22%7D%5D%7D,%7B%22type%22:%22input%22,%22element%22:%7B%22type%22:%22static_select%22,%22placeholder%22:%7B%22type%22:%22plain_text%22,%22text%22:%22Show%20All%20Open%22,%22emoji%22:true%7D,%22options%22:%5B%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22*this%20is%20plain_text%20text*%22,%22emoji%22:true%7D,%22value%22:%22value-0%22%7D,%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22*this%20is%20plain_text%20text*%22,%22emoji%22:true%7D,%22value%22:%22value-1%22%7D,%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22*this%20is%20plain_text%20text*%22,%22emoji%22:true%7D,%22value%22:%22value-2%22%7D%5D,%22action_id%22:%22static_select-action%22%7D,%22label%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%20%22,%22emoji%22:true%7D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22plain_text%22,%22text%22:%22%20%22,%22emoji%22:true%7D%5D%7D,%7B%22type%22:%22divider%22%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22*%3Cfakelink.toUrl.com%7CMarketing%20weekly%20sync%3E*%5CnSome%20details...%5CnStatus:%20%E2%AD%95%20*Open*%22%7D,%22accessory%22:%7B%22type%22:%22overflow%22,%22options%22:%5B%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%E2%9C%85%20Mark%20as%20done%22,%22emoji%22:true%7D,%22value%22:%22view_event_details%22%7D,%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%F0%9F%96%8B%EF%B8%8F%20Edit%22,%22emoji%22:true%7D,%22value%22:%22change_response%22%7D%5D%7D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg%22,%22alt_text%22:%22cute%20cat%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*from*%20@Test%20User%22%7D%5D%7D,%7B%22type%22:%22divider%22%7D,%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22*%3Cfakelink.toUrl.com%7CTry%20to%20get%20Slack%20discount%20-%20@Anastasia%20Sobkanyuk%20%F0%9F%91%A4%3E*%5CnSome%20details...%5CnStatus:%20%E2%AD%95%20*Open*%22%7D,%22accessory%22:%7B%22type%22:%22overflow%22,%22options%22:%5B%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%E2%9C%85%20Mark%20as%20done%22,%22emoji%22:true%7D,%22value%22:%22view_event_details%22%7D,%7B%22text%22:%7B%22type%22:%22plain_text%22,%22text%22:%22%F0%9F%96%8B%EF%B8%8F%20Edit%22,%22emoji%22:true%7D,%22value%22:%22change_response%22%7D%5D%7D%7D,%7B%22type%22:%22context%22,%22elements%22:%5B%7B%22type%22:%22image%22,%22image_url%22:%22https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg%22,%22alt_text%22:%22cute%20cat%22%7D,%7B%22type%22:%22mrkdwn%22,%22text%22:%22*from*%20@Test%20User%22%7D%5D%7D%5D%7D */
    view: {
      type: "home",
      blocks: [
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "➕ Add to-do",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "add_todo",
            },
          ],
        },

        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: " ",
          },
          accessory: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Show All Open",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Show All Open",
                  emoji: true,
                },
                value: "open",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Completed tasks",
                  emoji: true,
                },
                value: "done",
              },
            ],
            initial_option: {
              text: {
                type: "plain_text",
                text: status === "open" ? "Show All Open" : "Completed tasks",
                emoji: true,
              },
              value: status,
            },
            action_id: "set_home_filter",
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "plain_text",
              text: " ",
              emoji: true,
            },
          ],
        },
        
      ],
    },
  };

  // add tasks to the app home
  const taskBlockList = await tasksBlock(status);
  taskBlockList.map((taskListItem) => appHome.view.blocks.push(taskListItem));

  return appHome;
};

const tasksBlock = async function (status = "open") {
  const block = [];

  // fetch all tasks
  const tasks = await fetchTasks(status);

  if (tasks.length === 0) {
    block.push({
      type: "section",
      text: {
        type: "plain_text",
        text: " ",
      },
    });
    block.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `👀 Nothing here for now... `,
      },
    });

    return block;
  }

  // loop through every task and add
  tasks.map((task, index) => {
    // add task self
    block.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: " ",
      },
    });

    // add task self
    block.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*<fakelink.com|${task.summary}>*  ${
          task.notes ? `\n ${task.notes}` : ""
        }\n${
          task.assigned_user ? `Assigned to: 👤<@${task.assigned_user}>` : " "
        } `,
      },
    });

    // add overflow menu when status is open
    if (status === "open") {
      block[block.length - 1]["accessory"] = {
        type: "overflow",

        options: [
          {
            text: {
              type: "plain_text",
              text: "✅ Mark as done",
              emoji: true,
            },
            value: `complete_todo-${task._id}`,
          },
          {
            text: {
              type: "plain_text",
              text: "🖋️ Edit",
              emoji: true,
            },
            value: `edit_todo-${task._id}`,
          },
          {
            text: {
              type: "plain_text",
              text: "🗑️ Delete",
              emoji: true,
            },
            value: `delete_todo-${task._id}`,
          },
        ],
        action_id: "menu_todo_selected",
      };
    }

    

    // add divider (if not last item)
    if (index + 1 < tasks.length) {
      block.push({
        type: "divider",
      });
    }
  });

  return block;
};

module.exports = { appHomeOpened, getAppHome };
