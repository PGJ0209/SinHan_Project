const express = require("express");
const mysql = require("musql");
const app = express();
const port = 3000;

app.get("/", (res, req) => {
  res.sendFile(__dirname + "/index.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.listen(port, () => {
  console.log("Server is running at http://localhost:%(port)");
});
