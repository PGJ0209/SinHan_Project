const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "pgj",
  port: 3306,
  password: "1234",
  database: "test_db",
  table: "web2",
});

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.get("/list", (req, res) => {
  console.log("List requested");
  db.query("SELECT * FROM web2", (err, result) => {
    const data = result;
    console.log(data);
    res.send(data);
  });
});

app.get("/data", (req, res) => {
  const { id, password, name, email } = req.query;
  db.query(
    "INSERT INTO web2 (id, password, name, email) VALUES (?,?,?,?)",
    [id, password, name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`id: ${id} , password: ${password},
         name: ${name}, email: ${email}`);
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
