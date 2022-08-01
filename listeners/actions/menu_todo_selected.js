const menuTodoSelected = async ({ ack, say, body, client }) => {
  await ack();

  try {
    // check which option the user has choosen
    const [selected_option, selected_option_taskId] = body.actions[0].selected_option.value.split('-');
    
    // get affected todo item
    
    switch(selected_option) {
      case "":
        markTodoAsComplete()
    }
    
  } catch (error) {
    console.error(error);
  }
};

const markTodoAsComplete = async function (todoId, userId) {};

module.exports = { menuTodoSelected };
