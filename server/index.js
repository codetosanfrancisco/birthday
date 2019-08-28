const express = require("express");
const bodyParser = require("body-parser");
require("./src/database");
require("./src/Scheduler/Scheduler");
const User = require("./src/user_schema");
const app = express();
const moment = require("moment");
const cors = require("cors");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Authentication Header Verification Starts
app.use((request, response, next) => {
  if (request.headers["yesunmc"] === "yesunmc3ksth") {
    next();
  } else {
    throw new Error("Access Not Allowed!");
  }
});
//Authentication Header Verification End

app.get("/admin", (request, response) => {
  User.find({}, function(err, users) {
    response.send(users);
  });
});

app.post("/", (request, response) => {
  var { email, day, month, name } = request.body;
  if (day.trim().length < 2) {
    day = `0${day}`;
  }
  if (month.trim().length < 2) {
    month = `0${month}`;
  }
  const now = moment.utc();
  const birthday = moment.utc(`2019-${month}-${day}`);
  if (birthday < now) {
    birthday.add(1, "year");
  }

  const user = new User({
    email: email,
    birthday: birthday,
    name: name
  });

  user
    .save()
    .then(() => {
      response.status(200).send();
    })
    .catch(err => {
      response.status(404).send();
    });
});

io.on("connection", socket => {
  socket.on("joinAdmin", () => {
    socket.join("joinAdmin");
  });
  socket.on("newRecords", () => {
    //Using mongoose to get the latest records
    User.find({}, function(err, users) {
      io.to("joinAdmin").emit("users", users);
    });
  });
});

http.listen(8080, () => {
  console.log("Express intro running on localhost:8080");
});
