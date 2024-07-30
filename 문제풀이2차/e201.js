const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser"); // 설치생략
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

const db = mysql.createConnection({
  host: "localhost",
  user: "pgj",
  port: 3306,
  password: "1234",
  database: "test_db",
});

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e201.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password == "1234") {
    req.session.loggedIn = true;
    req.session.username = username;
    // res.redirect("/mypage");
    res.send(
      `<script>alert('로그인이 되었습니다');window.location.href='/mypage'</script>`
    );
  }
});
app.get("/mypage", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/mypage.html");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});
app.get("/content", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/content.html");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.get("/list", (req, res) => {
  db.query("SELECT * from tb2", (err, results) => {
    const data = results;
    console.log(data);
    let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
    list += `    <title>리스트</title>`;
    list += `    <style>`;
    list += `        table {`;
    list += `            border-collapse: collapse;`;
    list += `            text-align: center;`;
    list += `            width: 80%;`;
    list += `            margin: auto;`;
    list += `        }`;
    list += ``;
    list += `        th,`;
    list += `        tr,`;
    list += `        td {`;
    list += `            border: 1px solid #ccc;`;
    list += `        }`;
    list += ``;
    list += `        td {`;
    list += `            width: 20%;`;
    list += `        }`;
    list += ``;
    list += `        h2 {`;
    list += `            text-align: center;`;
    list += `        }`;
    list += ``;
    list += `        th {`;
    list += `            background-color: lightblue;`;
    list += `        }`;
    list += `    </style>`;
    list += `</head>`;
    list += ``;
    list += `<body>`;
    list += `    <!-- table>tr>th*5^tr>td*5 -->`;
    list += `    <h2>데이터베이스 내용</h2>`;
    list += `<button type="button" onclick="location.href='/'">뒤로가기</button>`;

    list += `    <table>`;
    list += `        <tr>`;
    list += `            <th>글번호</th>`;
    list += `            <th>제목</th>`;
    list += `            <th>작성자</th>`;
    list += `            <th>작성일자</th>`;
    list += `            <th>조회수</th>`;
    list += `        </tr>`;

    data.forEach((v) => {
      list += `        <tr>`;
      list += `            <td>${v.num}</td>`;
      list += `            <td>${v.title}</td>`;
      list += `            <td>${v.name}</td>`;
      list += `            <td>${v.date}</td>`;
      list += `            <td>${v.count}</td>`;
      list += `        </tr>`;
    });

    // if (req.session.loggedIn)
    list += `    </table><button type="button" onclick="location.href='/content'">글쓰기</button>`;

    list += `</body>`;
    list += ``;
    list += `</html>`;
    res.send(list);
  });
});

app.post("/data", (req, res) => {
  const { title, name, date, content } = req.body;
  db.query(
    "INSERT INTO tb2 ( title, name, date, content,count) VALUES (?,?,?,?,?)",
    [title, name, date, content, 0],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
