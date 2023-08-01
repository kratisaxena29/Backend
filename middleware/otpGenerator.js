const sgMail = require('@sendgrid/mail');

async function sendMail(params) {
  console.log('params ::::::::::', params);
  return new Promise(async (res, rej) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      from: 'krati123saxena@gmail.com',
      to: params.to,
      subject: 'OTP verification',
      html: `
            <div
              class="container"
              style="max-width: 90%; margin: auto; padding-top: 20px"
            >
              <h2>Welcome to the club.</h2>
              <h4>This is the OTP you required</h4>
              <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.otp}</h1>
         </div>
          `,
    };
    try {
      await sgMail.send(msg);
      res(true);
    } catch (error) {
      console.error(error);
      rej(false);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  });
}

module.exports = { sendMail };
