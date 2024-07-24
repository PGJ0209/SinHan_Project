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
  ];
  let list = "";

  list += `<h1>Select Link</h1>`;
  list += `  <h2>`;
  list += `    <ul>`;
  list += `      <li><a href="/story?id=0">pretty</a></li>`;
  list += `      <li><a href="/story?id=1">Egg</a></li>`;
  list += `      <li><a href="/story?id=2">Aiur</a></li>`;
  list += `      <li><a href="/story?id=3">RTX4090</a></li>`;
  list += `    </ul>`;
  list += `  </h2>`;
  list += arr[req.query.id] ?? " 선택하세요 ";
  // res.query.id
  res.send(list);
});

app.listen(port, () => {
  console.log("포트:" + port + " 서버가 동작하였습니다. ");
});
