const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); //모듈 import. Express v4.16.0이상은 설치 생략 가능
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
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
        <body>
            <form action="/login" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                <label for="pw">Password:</label>
                <input type="text" id="pw" name="password">
                <button type="submit">Login</button>
            </form>
        </body>
    </html>`);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body; // query 는 get 방식

  if (username === "test" && password == "1234") {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect("/");
  } else {
    res.send(`
        <h3>정상적인 로그인이 필요합니다.</h3>
        <button onclick="location.href='/'>뒤로가기</button>
        `);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
