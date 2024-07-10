const express = require("express");
const path = require("path"); //경로모듈
const logger = require("morgan");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/dist");
console.log(__dirname);
console.log(__dirname + "/dist");
console.log(_path);

app.get("/", (req, res) => {
  res.send("홈페이지 입니다.");
});
app.get("/story", (req, res) => {
  const arr = [
    "My life is pretty",
    "Egg is life ",
    "My life for Aiur!",
    "I don't have RTX4090.. :( ",
    "kkkkkkkkkkkkkkkkkkkkkkkkkkk",
  ];
  let list = `<h1>Select Link</h1><h2><ul>`;
  const title = ["pretty", "Egg", "Aiur", "RTX4090", "kkkk"];
  title.forEach((v, i) => {
    list += `<li><a href="/story?id=${i}">${v}</a></li>`;
  });

  list += `</ul></h2>`;
  list += arr[req.query.id] ?? " 선택하세요 ";

  res.send(list);
});

app.listen(port, () => {
  console.log("포트:" + port + " 서버가 동작하였습니다. ");
});
