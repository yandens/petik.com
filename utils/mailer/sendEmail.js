const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const {
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_SENDER_EMAIL,
  MAILER_REDIRECT_URI
} = process.env

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MAILER_REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })

const sendEmail = (to, subject, html) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await oauth2Client.getAccessToken()

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: GOOGLE_SENDER_EMAIL,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken: GOOGLE_REFRESH_TOKEN,
          accessToken: accessToken,
        }
      })

      const mailOptions = { to, subject, html }
      const response = await transport.sendMail(mailOptions);

      resolve(response)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = sendEmail
