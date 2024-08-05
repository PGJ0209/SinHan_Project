const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 루트 경로 설정
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/ToDoList.html");
});

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "pgj",
  port: 3306,
  password: "1234",
  database: "test_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공");
  }
});

// 할 일 목록 불러오기
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM todo_list", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// 할 일 추가하기
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO todo_list (task) VALUES (?)", [task], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, task });
  });
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
