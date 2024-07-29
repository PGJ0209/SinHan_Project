const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); // 설치생략
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e201.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.get("/e202_react", function (req, res) {
  res.sendFile(path.join(__dirname, "e202_react.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password == "1234") {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect("/mypage");
  }
});

app.get("/mypage", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/mypage.html");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
