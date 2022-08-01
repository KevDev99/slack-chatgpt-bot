// formats the incoming state object from slack to a useful object
const formatReminderState = (unformatted_state) => {
  const formatted_state = {};
  for (const [parentkey, _] of Object.entries(unformatted_state)) {
    for (const [key, value] of Object.entries(unformatted_state[parentkey])) {
      if (unformatted_state[parentkey][key].type === "plain_text_input") {
        formatted_state[key] = unformatted_state[parentkey][key].value;
      }
      if (unformatted_state[parentkey][key].type === "users_select") {
        formatted_state[key] = unformatted_state[parentkey][key].selected_user;
      }
    }
  }

  return formatted_state;
};

module.exports = {
  formatReminderState,
};
