const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const nid = process.env.nid;
const npw = process.env.npw;

//단축url서비스 프론트
app.get("/", (req, res) => {
  res.send(`
<html>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    #container {
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      text-align: center;
      width: 300px;
    }

    h1 {
      margin-bottom: 20px;
      text-align: center; /* 중앙 정렬 */
    }

    label {
      font-weight: bold;
    }

    input[type="text"] {
      width: 100%;
      padding: 8px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    input[type="submit"] {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    input[type="submit"]:hover {
      background-color: #45a049;
    }

    #result {
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
  <body>
    <div id="container">
      <h1> 단축 URL 서비스 </h1>
      <form action="/shorten" method="post">
        <label for="longurl">단축할 URL:</label><br />
        <input type="text" id="longurl" name="longurl" /><br /><br />
        <input type="submit" value="단축 URL 생성" />
      </form>
      <p id="result"></p>
    </div>
  </body>
</html>

  `);
});

// url 단축 네이버 api
app.post("/shorten", (req, res) => {
  const longUrl = req.body.longurl;
  const apiUrl = `https://openapi.naver.com/v1/util/shorturl.json`;
  const options = {
    url: apiUrl,
    form: { url: longUrl },
    headers: {
      "X-Naver-Client-Id": nid,
      "X-Naver-Client-Secret": npw,
    },
  };

  // 결과값 프론트에 보여주깅 안댈시 에러
  request.post(options, (err, response, body) => {
    if (err) {
      return res.send("에러 발생!");
    }

    const shortUrl = JSON.parse(body).result.url;
    res.send(`
<html>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    #container {
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 350px;
    }

    h1 {
      margin-bottom: 20px;
    }

    label {
      font-weight: bold;
    }

    input[type="text"] {
      width: 100%;
      padding: 8px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    input[type="submit"] {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #backbutton{
     background-color: #ff8585;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }    


    input[type="submit"]:hover {
      background-color: #45a049;
    }

    button {
      background-color: rgba(117, 200, 255, 0.975);
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #result {
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
  <body>
    <div id="container">
      <h1>단축이 완료되었습니다.</h1>
      <form action="/shorten" method="post">
        <label for="longurl">추가로 단축할 URL:</label><br />
        <input type="text" id="longurl" name="longurl" /><br /><br />
        <input type="submit" value="단축 URL 생성" />
        <button id="backbutton" type="button" onclick="location.href='/'">뒤로가기</button>
      </form>
      <p id="result">단축된 URL: <a href="${shortUrl}" id="shortUrl" target="_blank">${shortUrl}</a></p><br />
      <button onclick="copy()">링크복사</button><br /><br />
    </div>

    <script>
      function copy() {
        var shortUrl = document.getElementById("shortUrl").href;
        navigator.clipboard.writeText(shortUrl).then(function() {
          alert("복사되었습니다.");
        }, function(err) {
          console.error("복사 실패:", err);
        });
      }
    </script>
  </body>
</html>

    `);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
