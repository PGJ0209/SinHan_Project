const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "<h1>안녕하세요! Express로 만든 서버입니다.</h1><h2><a href='/list'>리스트이동</a></h2>"
  );
});
app.use("/list", express.static(__dirname));
app.get("/list", (req, res) => {
  fs.readdir(__dirname, "utf-8", (err, data) => {
    let list = `<h1>링크를 선택하세요</h1><h2><ul>`;
    data.forEach(
      (v) =>
        (list += `<li><a href="${v}">${v}</a><a href="${v}" 
          style="text-decoration-line:none;" download>[Download]</a></li>`)
    );
    list += `</ul></h2>`;
    res.send(list);
  });
});

app.listen(port, () => {
  console.log(port + "에서 서버가 시작되었습니다.");
});
