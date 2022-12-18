
const setDialPadStatus = async ({ message, cilent, say }) => {
  const {text} = message;
  const textParts = text.split('\n');
  textParts.map(textPart => {
    if(!textPart.includes("Handled by")) {
      return;
    }
    
    const handledByField = textPart.split(" ");
    
  })

};

module.exports = { setDialPadStatus };