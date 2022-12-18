const { getUser, getUsers } = require("../database/db.js");

// formats the incoming state object from slack to a useful object
const formatState = (unformatted_state) => {
  const formatted_state = {};
  for (const [parentkey, _] of Object.entries(unformatted_state)) {
    for (const [key, value] of Object.entries(unformatted_state[parentkey])) {
      if (unformatted_state[parentkey][key].type === "plain_text_input") {
        formatted_state[key] = unformatted_state[parentkey][key].value;
      }
      if (unformatted_state[parentkey][key].type === "users_select") {
        formatted_state[key] = unformatted_state[parentkey][key].selected_user;
      }
      if (unformatted_state[parentkey][key].type === "conversations_select") {
        formatted_state[key] =
          unformatted_state[parentkey][key].selected_conversation;
      }

      for (const [subKey] of Object.entries(
        unformatted_state[parentkey][key]
      )) {
        if (unformatted_state[parentkey][key][subKey].type === "checkboxes") {
          formatted_state["checkboxes"] =
            unformatted_state[parentkey][key][subKey].selected_options;
        }
      }
    }
  }

  return formatted_state;
};

const formatMessageState = (state) => {
  const formattedObj = {};
  const keys = Object.keys(state.values);
  keys.map((key) => {
    const subKey = Object.keys(state.values[key])[0];

    console.log(state.values[key][subKey]);

    if (state.values[key][subKey].type === "channels_select") {
      formattedObj.channels_select = state.values[key][subKey].selected_channel;
    }

    if (state.values[key][subKey].type === "static_select") {
      formattedObj.static_select =
        state.values[key][subKey].selected_option.value;
    }
    if (state.values[key][subKey].type === "plain_text_input") {
      formattedObj.plain_text_input = state.values[key][subKey].value;
    }
  });

  return formattedObj;
};

const insertAt = (array, index, ...elementsArray) => {
  array.splice(index, 0, ...elementsArray);
};

function nth(weekday) {
  var n = Math.round(weekday),
    t = Math.abs(n % 100),
    i = t % 10;
  return n;
}

function nthofMonth(date) {
  var today = date.getDate(),
    m = date.getMonth(),
    day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][date.getDay()],
    month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][m];
  return nth(Math.ceil(today / 7));
}

function isEven(n) {
  return n % 2 == 0;
}

function isOdd(n) {
  return Math.abs(n % 2) == 1;
}

async function getUserFromTextBody(textParts, client) {
  let user;

  const {members} = await client.users.list();
  
  textParts.map((textPart) => {
    

    const handledByFields = textPart.split(" ");

    const validFilterField = [];

    handledByFields.map((field) => {
      const filteredMembers = members.filter((member) =>
        member.profile.real_name.includes(field)
      );

      if (filteredMembers.length >= 1) {
        return validFilterField.push(field);
      }
    });

    const foundMembers = [];

    members.map((member) => {
      let matchYN = new RegExp(validFilterField.join("|")).test(
        member.profile.real_name
      );

      if (matchYN) {
        foundMembers.push(member);
      }
    });
    user = foundMembers[0];
  });

  return user;
}

async function setUserStatus(client, user, statusText, statusEmoji) {
  try {
    // check if user exists in db
    const dbUser = await getUser(user.id);

    // if user is not in db - send notification to authenticate the app
    if (!dbUser) {
      console.log("User not in db", user);
      // TODO: send notification to authenticate the app
    }

    // set status for user
    const { ok, error, profile } = await client.users.profile.set({
      token: dbUser.user.token,
      profile: {
        status_text: statusText,
        status_emoji: statusEmoji,
      },
    });

    if (!ok) throw error;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  formatState,
  formatMessageState,
  nthofMonth,
  isEven,
  isOdd,
  getUserFromTextBody,
  setUserStatus,
};
