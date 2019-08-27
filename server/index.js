const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response,next) => {
  if(request.headers["yesunmc"] === "yesunmc3ksth"){
    next();
  }else{
    throw new Error("Access Not Allowed!");
  }
})

app.post("/", (request, response) => {
  console.log(request.body);
  response.status(200).send();
});

app.listen(8080, () => {
  console.log("Express intro running on localhost:8080");
});
