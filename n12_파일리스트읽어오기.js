const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(logger("tiny"));

app.use("/", express.static(__dirname + "/html"));
app.get("/list", (req, res) => {
  fs.readdir(__dirname + "/html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(port + " 에서 서버가 시작되었습니다.");
});
