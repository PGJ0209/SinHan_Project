// 안녕하세요
const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("안녕하세요! Express로 만든 서버입니다.");
});
app.get("/list", (req, res) => {
  fs.readdir(__dirname, "utf-8", (err, data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(port + "에서 서버가 열렸습니다.");
});
