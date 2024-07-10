const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  const path = __dirname + "./html/index.html";
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end("HTML 읽을 때 에러가 났어요.");
    } else {
      res.end(data);
    }
  });
  // console.log(fs.readFile);  //nodejs\index.html
});

server.listen(port, () => console.log(`${port}에서 서버가 가동됨`));
