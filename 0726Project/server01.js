const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "pgj",
  password: "1234",
  database: "test_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// 서버실행시 로그인 화면 불러오기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Fetch all posts
app.get("/posts", (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Fetch a single post
app.get("/posts/:id", (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// 새로운 게시글 작성
app.post("/posts", (req, res) => {
  const { title, author } = req.body;
  const sql = "INSERT INTO posts (title, author) VALUES (?, ?)";
  db.query(sql, [title, author], (err, result) => {
    if (err) throw err;
    res.json({ message: "Post created", id: result.insertId });
  });
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Post deleted" });
  });
});

// Increment post views
app.post("/posts/:id/view", (req, res) => {
  const sql = "UPDATE posts SET views = views + 1 WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "View incremented" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
