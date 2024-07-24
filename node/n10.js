const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

app.use(logger("tiny")); //tiny

app.get("/", (req, res) => {
  res.send("반가워요");
});

app.get("/book/:uname/:bname/:date", (req, res) => {
  console.log(req.params);
  res.send("책조회");
});

app.listen(port, () => {
  console.log(port + ` : 포트사용중 성공적으로 서버를 시작하였습니다.`);
});
