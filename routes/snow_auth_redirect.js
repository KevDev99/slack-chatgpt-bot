const { base64encode } = require("nodejs-base64");
const axios = require("axios");

const snowAuthRedirect = (receiver) => {
  // redirect for servicenow api
  receiver.router.get("/snow_oauth_redirect", async (req, res) => {
    try {
      res.writeHead(200);
      const code = req.param("code");
      const state = req.param("state");
      const clientId = "a60633d0d2986110e6aad8c0b956804e";
      const clientSecret = "A}bQmGj5vu";
      const redirectUri =
        "https://slack-servicenow.glitch.me/snow_oauth_redirect";

      const auth = base64encode(`${clientId}:${clientSecret}`);

      const axiosResponse = await axios.post(
        "https://dev107538.service-now.com/oauth_token.do",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + auth,
          },
        }
      );

      console.log(axiosResponse.data);

      res.end("Endpoint working OK");
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = snowAuthRedirect