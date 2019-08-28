var schedule = require('node-schedule');
var Mailer = require("../Mailer/Mailer");
var User = require("../user_schema");
const moment = require("moment");


var rule = new schedule.RecurrenceRule();
rule.second = 1;

schedule.scheduleJob(rule, function(){
    User.find({}, function(err, users) {
        if(!err){
            //Check for user where today is birthday
            //push user into an array
            //loop the array and send email accordingly
            const mailOptions = {
                from: process.env.GOOGLE_EMAIL_USER,
                to: "voonshunzhi@gmail.com",
                subject: 'YES UNMC testing',
                html: "<div>Hello World YES UNMC from Voon!</div>"
              }
            Mailer.smtpTransport.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log("Failed to send birthday email");
                } else {
                  console.log(`Succesfully sent to ${mailOptions.to}`, info.messageId, info.response);
                }
                Mailer.smtpTransport.close();
            });
        }
    });
});