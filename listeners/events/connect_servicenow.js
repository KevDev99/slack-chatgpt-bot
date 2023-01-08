const { formatState } = require("../../helper");
const axios = require("axios");

const connectServiceNow = async ({ body, client, logger, ack }) => {
  try {
    // format body state
    const state = formatState(body.view.state.values);

    try {
      // check if instance url is reachable
      const instanceRes = await axios(
        `${state.instance_url}/oauth_auth.do?response_type=code&redirect_uri=https://slack-servicenow.glitch.me/snow_oauth_redirect&client_id=a60633d0d2986110e6aad8c0b956804e&state=xyzABC123`
      );

      
    } catch (err) {
      if (err.code && err.code === "ENOTFOUND") {
        // return url is wrong
        return ack({
          response_action: "errors",
          errors: {
            instance_url: "The URL is not reachable. Please make sure it's valid.",
          },
        });
      }
      
      console.error(err);
    }

    // check if instance url + client id is correct

    // acknowledge request

    // refresh home screen

    //await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectServiceNow;
