const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const bodyParser = require("body-parser");

const nid = process.env.nid;
const npw = process.env.npw;
const request = require("request");

const query =
  "https://www.google.com/search?q=%EC%98%A4%EB%8A%98%EC%9D%98%EB%82%A0%EC%94%A8&oq=%EC%98%A4%EB%8A%98%EC%9D%98%EB%82%A0%EC%94%A8&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDIwMjVqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8";
const url = `https://openapi.naver.com/v1/util/shorturl.xml`;
const option = {
  url,
  form: { url: query },
  headers: {
    "X-Naver-Client-Id": nid,
    "X-Naver-Client-Secret": npw,
  },
};

app.get("/", (req, res) => {
  res.send(`
        <html>
      <body>
        <h1>단축 URL 서비스</h1>
        <form action="/shorten" method="post">
          <label for="longurl">긴 URL:</label><br>
          <input type="text" id="longurl" name="longurl"><br><br>
          <input type="submit" value="단축 URL 생성">
        </form>
        <p id="result"></p>
      </body>
    </html>
        
        
        `);
});

request.post(option, (err, res, body) => {
  console.log(body);
});
