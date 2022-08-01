// formats the incoming state object from slack to a useful object
const formatReminderState = (unformatted_state) => {
  
  console.log(unformatted_state)
  const formatted_state = [];
  for (const [parentkey, _] of Object.entries(unformatted_state)) {
    console.log(unformatted_state[parentkey]);
    for (const [key, value] of Object.entries(unformatted_state[parentkey])) {
      formatted_state[key] =
        unformatted_state[parentkey][key].selected_option.value;
    }
  }

  return formatted_state;
};

module.exports = {
  formatReminderState,
};
