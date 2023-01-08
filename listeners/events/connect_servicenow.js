const { formatState } = require("../../helper");
const axios = require("axios");

const connectServiceNow = async ({ body, client, logger, ack }) => {
  try {
    // format body state
    const state = formatState(body.view.state.values);

    try {
      // check if instance url is reachable
      // check if instance url + client id is correct
      const instanceRes = await axios(
        `${state.instance_url}/oauth_auth.do?response_type=code&redirect_uri=${process.env.REDIRECT_URL}&client_id=${state.client_id}&state=xyzABC123`
      );

      // acknowledge request
      await ack();
      
      // update values in db
      
      
    } catch (err) {
      if (err.code) {
        if (err.code === "ENOTFOUND") {
          // return url is wrong
          return ack({
            response_action: "errors",
            errors: {
              instance_url:
                "The URL is not reachable. Please make sure it's valid.",
            },
          });
        }
        if (err.code === "ERR_BAD_REQUEST") {
          // return url is wrong
          return ack({
            response_action: "errors",
            errors: {
              client_id:
                "The Client ID doesn't seem to be correct. Please check it again.",
            },
          });
        }
      }

      console.error(err);
    }

  } catch (err) {
    console.error(err);
  }
};

module.exports = connectServiceNow;
