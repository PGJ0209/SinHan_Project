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
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/ToDoList.html");
  } else {
    res.send(` 
    <button onclick="window.location.href='/join'">회원가입</button>
    <button onclick="window.location.href='/login'">로그인</button>
    <hr />
    <h2>할 일 목록 (비회원 입니다.)</h2>
    <input type="text" />
    <button onclick="alert('로그인이 필요합니다.');window.location.href='/login'">추가하기</button>
    <div></div>`);
  }
});

app.get("/join", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// logout
app.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  req.session.adminOk = false;
  res.send(
    `<script>alert('로그아웃 되었습니다.');window.location.href='/'</script>`
  );
});

// login 유효성 검사 란
app.post("/login", (req, res) => {
  const { username, password } = req.body; // query 는 get 방식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); // 방법1. true or false 반환
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!pwOK);

  // login 로그인 조건
  if (idOK && !!pwOK) {
    if (username === "user" && password == "1234") {
      req.session.loggedIn = true;
      req.session.username = username;
      res.redirect("/");
    } else {
      res.send(`
        <h3>정상적인 로그인이 필요합니다.</h3>
        <button onclick="location.href='/'">뒤로가기</button>
        <button onclick="location.href='/join'">가입하기</button>
        `);
    }
  } else {
    res.send(`<script>
      alert('입력조건이 맞지 않습니다. 다시 작성해 주세요!');
      window.location.href='/login';
      </script>`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) console.error(e);
    res.send(
      `<script>alert('로그아웃이 되었습니다!!');window.location.href='/'</script>`
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
