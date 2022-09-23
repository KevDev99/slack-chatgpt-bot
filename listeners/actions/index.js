const {submitChannel} = require('./submit_channel');

const {submitDailyHabit} = require('./submit_daily_habit')

module.exports.register = (app) => {
    app.action("submit_channel", submitChannel);
    app.action("submit_daily_habit-0", submitDailyHabit)
    app.action("submit_daily_habit-1", submitDailyHabit)
};
