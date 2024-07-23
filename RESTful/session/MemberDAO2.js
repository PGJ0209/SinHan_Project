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
    res.send(`
          <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }
        .container {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          width: 300px;
          text-align: center;
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
        .button {
          width: 45%;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          color: white;
        }
        .logout-btn {
          background-color: #ADD8E6; /* 연한 파란색 */
        }
        .profile-btn {
          background-color: #F4A460; /* 연한 갈색 */
        }
        .button:hover {
          opacity: 0.8;
        }
      </style>
      <div class="container">
        <h2>성공적으로 로그인 되었습니다.</h2>
        <p>안녕하세요, ${req.session.username}님!</p>
        <div class="button-container">
          <button class="button logout-btn" onclick="location.href='/logout'">로그아웃</button>
          <button class="button profile-btn" onclick="location.href='/profile'">회원정보보기</button>
        </div>
      </div>
    `);
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login2.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body; // query 는 get 방식
  const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); // 방법1. true or false 반환
  const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
  console.log(idOK, pwOK, !!pwOK);

  if (idOK && !!pwOK) {
    if (username === "test" && password == "1234") {
      req.session.loggedIn = true;
      req.session.username = username;
      res.redirect("/");
    } else {
      res.send(`
        <h3>정상적인 로그인이 필요합니다.</h3>
        <button onclick="location.href='/'">뒤로가기</button>
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
