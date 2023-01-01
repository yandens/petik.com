const { google } = require("googleapis");

const { GOOGLE_REDIRECT_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

const generateAuthURL = () => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    response_type: "code",
    scope: scopes,
  });

  return authUrl;
};

const setCredentials = async (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      return resolve(tokens);
    } catch (err) {
      return reject(err);
    }
  });
};

const getUserData = () => {
  return new Promise(async (resolve, rejects) => {
    try {
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });

      oauth2.userinfo.get((err, res) => {
        if (err) {
          return rejects(err);
        } else {
          return resolve(res);
        }
      });
    } catch (err) {
      return rejects(err);
    }
  });
};

module.exports = { generateAuthURL, setCredentials, getUserData };
