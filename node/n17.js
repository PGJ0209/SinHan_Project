const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("morgan");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/html");
app.use(logger("tiny"));
app.use("/", express.static(_path));

app.get("/data", (req, res) => {
  const title = req.query.title;
  const content = req.query.content;

  fs.writeFile(_path + title + ".txt", content, (e) => {
    if (e) console.log(e); // 에러시 에러 내용 출력
    console.log(__dirname + "/save.txt");
    console.log("파일 작성이 완료 되었습니다.");
  });

  console.log(title, content);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
