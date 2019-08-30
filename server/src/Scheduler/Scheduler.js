var schedule = require("cron").CronJob;
var Mailer = require("../Mailer/Mailer");
var User = require("../user_schema");
const moment = require("moment");
const Email = require("email-templates");
const email = new Email();

new schedule(
  "0 8 * * 0-6",
  //"* * * * *",
  function() {
    User.find({}, function(err, users) {
      if (!err) {
        users = users.filter(user => {
          var user_birthday = moment(user.birthday);
          return user_birthday.isSame(new Date(), "day");
        });
        for (let i = 0; i < users.length; i++) {
          email
            .render("birthday/template1", {
              name: users[i].name,
              date: moment(users[i].date).format("MMM Do")
            })
            .then(html => {
              const mailOptions = {
                from: process.env.GOOGLE_EMAIL_USER,
                to: users[i].email,
                subject: "YES UNMC testing",
                html: html
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
            });
        }
      }
    });
  },
  null,
  true,
  "Asia/Kuala_Lumpur"
);
