const {submitChannel} = require('./submit_channel');


module.exports.register = (app) => {
    app.action("submit_channel", submitChannel);

};
