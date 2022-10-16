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


module.exports = {
  formatState,
  formatMessageState,
  nthofMonth
};
