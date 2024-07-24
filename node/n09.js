const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

app.use(logger("tiny")); //tiny

app.get("/", (req, res) => {
  res.send("반가워요");
});
// 형식 1
// app.get("/book", (req, res) => {
//   //    let u_name = req.param("uname");
//   //    let b_name = req.param("bname");
//   //    let date = req.param("date");
//   let u_name = req.query.uname;
//   let b_name = req.query.bname;
//   let date = req.query.date;
//   console.log(u_name, b_name, date);
//   res.send(
//     "<h2>저자:" +
//       u_name +
//       "</h2><h2>도서명:" +
//       b_name +
//       "</h2>" +
//       "<h2>출판일:" +
//       date +
//       "</h2>"
//   );
// });

// -- 형식1 끝

// 형식 2) http://localhost:3000/book/김첨지/대박날/2020.2.11 형식
app.get("/book/:uname/:bname/:date", (req, res) => {
  console.log(req.params);
  res.send(
    "<h2>저자: " +
      req.params.uname +
      "</h2><h2>도서명:" +
      req.params.bname +
      "</h2><h2>출판일:" +
      req.params.date +
      "</h2>"
  );
});
// -- 형식2 끝
app.listen(port, () => {
  console.log(port + ` : 포트사용중 성공적으로 서버를 시작하였습니다.`);
});
