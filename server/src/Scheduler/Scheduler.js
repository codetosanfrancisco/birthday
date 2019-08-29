var schedule = require("cron").CronJob;
var Mailer = require("../Mailer/Mailer");
var User = require("../user_schema");
const moment = require("moment");

new schedule(
  "0 8 * * 0-6",
  function() {
    User.find({}, function(err, users) {
      if (!err) {
        var today = moment.utc();
        users = users.filter(user => {
          var user_birthday = moment(user.birthday);
          return user_birthday.diff(today, "days") === 0;
        });
        console.log(users);
        for (let i = 0; i < users.length; i++) {
          const mailOptions = {
            from: process.env.GOOGLE_EMAIL_USER,
            to: users[i].email,
            subject: "YES UNMC testing",
            html: `<div>Hello World YES UNMC from Voon to ${users[i].name}!</div>`
          };
          Mailer.smtpTransport.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log("Failed to send birthday email");
            } else {
              console.log(
                `Succesfully sent to ${mailOptions.to}`,
                info.messageId,
                info.response
              );
            }
            Mailer.smtpTransport.close();
          });
        }
      }
    });
  },
  null,
  true,
  "Asia/Kuala_Lumpur"
);
