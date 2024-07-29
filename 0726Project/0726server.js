const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // 파일 경로를 다루기 위해 추가

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

// Handle login form submission
app.post("/", (req, res) => {
  const { username, password } = req.body;
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username);
  const pwOK = /^[A-Za-z0-9]{1,8}$/g.test(password);
  console.log(idOK, pwOK);

  if (idOK && pwOK) {
    res.redirect("/board"); // Redirect to /board
  } else {
    res.send("형식에 맞도록 입력하세요.");
  }
});

// 서버에서 게시판 요청하는 코드
app.get("/board", (req, res) => {
  res.sendFile(path.join(__dirname, "/board.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
