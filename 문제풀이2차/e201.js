const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser"); // 설치생략
const path = require("path"); // path 모듈 추가
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
    if (!req.session.num1) {
      req.session.num1 = 1;
    } else {
      req.session.num1 += 1;
    }
    req.session.username = username;
    res.send(
      `<script>alert('${req.session.num1}번째 로그인이 되었습니다');window.location.href='/mypage'</script>`
    );
  }
  if (username === "admin" && password == "123456") {
    req.session.adminOk = true;
    res.send(
      `<script>alert('관리자로 로그인이 되었습니다');window.location.href='/mypage'</script>`
    );
  }
});
app.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  req.session.adminOk = false;
  res.send(
    `<script>alert('로그아웃 되었습니다.');window.location.href='/'</script>`
  );
});

app.get("/mypage", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + "/mypage.html");
  } else if (req.session.adminOk) {
    res.send(
      "<h1>관리자페이지</h1><script>window.location.href='/list'</script>"
    );
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
// 삭제 기능
app.get("/del", (req, res) => {
  const delItem = req.query.delitem;
  db.query(`DELETE FROM tb2 WHERE num = "${delItem}"`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(
        `<script>alert('삭제 중 오류가 발생했습니다');window.location.href='/list'</script>`
      );
      return;
    }
    res.send(
      `<script>alert('삭제가 완료되었습니다');window.location.href='/list'</script>`
    );
    console.log("Data deleted successfully");
  });
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
    list += `            width: 16%;`;
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
    list += `    <h2>게시판 입니다.</h2>`;
    if (req.session.adminOk) {
      list += `    <h2>[관리자 권한]</h2>`;
    }
    list += `<button type="button" onclick="location.href='/'">뒤로가기</button>`;

    list += `    <table>`;
    list += `        <tr>`;
    list += `            <th>글번호</th>`;
    list += `            <th>제목</th>`;
    list += `            <th>작성자</th>`;
    list += `            <th>작성일자</th>`;
    list += `            <th>조회수</th>`;
    if (req.session.adminOk) {
      list += `            <th>삭제</th>`;
    }

    list += `        </tr>`;

    data.forEach((v, i) => {
      list += `        <tr>`;
      list += `            <td>${v.num}</td>`;
      list += `           <td><a href="/detail?search=${v.num}">${v.title}</a></td>`;
      list += `            <td>${v.name}</td>`;
      list += `            <td>${v.date}</td>`;
      list += `            <td>${v.count}</td>`;
      /* 예1 */
      // list += `            <td><button id="del${i}">삭제</button></td>`;
      /* 예2 */

      if (req.session.adminOk) {
        list += `            <td><a href="/del?delitem=${v.num}">삭제</a></td>`;
      }
      list += `        </tr>`;
    });

    // console.log(1, req.session.loggedIn);
    // if (req.session.loggedIn) {
    list += `    </table><button type="button" onclick="location.href='/content'">글쓰기</button>`;
    // }
    list += `</body>`;
    list += ``;
    list += `</html>`;
    res.send(list);
  });
});
/* detail */
app.get("/detail", (req, res) => {
  const search = req.query.search;
  console.log(search);
  db.query(`SELECT * FROM tb2 WHERE num=${search}`, (err, results) => {
    console.log(results[0]);
    res.send(`
      <div>${results[0].num}</div>
      <div>${results[0].title}</div>
      <div>${results[0].name}</div>
      <div>${results[0].content}</div>
      <div>${results[0].date}</div>
      `);
  });
});
/* 게시판 */
app.post("/data", (req, res) => {
  const { title, name, date, content } = req.body;
  // db.query("INSERT INTO tb2 ( title, name, date, content,count) VALUES (?,?,?,?,?)", [title, name, date, content, 0], (err, result) => {
  db.query(
    `INSERT INTO tb2 ( title, name, date, content,count) VALUES ("${title}", "${name}", "${date}", "${content}",0)`,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(
        `<script>alert('내용이 저장 되었습니다');window.location.href='/list'</script>`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
