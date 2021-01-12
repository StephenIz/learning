var express = require('express');
var app = express();
console.log("Hello World");

app.get("/", function(req, res) {
  res.send("Hello Express");
});

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

let absolutePath = __dirname + "/views/index.html";

process.env.MESSAGE_STYLE="uppercase";

app.get("/", function(req, res) {
  res.sendFile(absolutePath);
});

app.use(express.static(__dirname + "/public"));

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({"message": "Hello json".toUpperCase()})
  }
  else {
  res.json({"message": "Hello json"});
  }
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
});



























 module.exports = app;
