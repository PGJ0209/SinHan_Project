const express = require("express");
const logger = require("morgan");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 3000;
const uploadDir = path.join(__dirname, "/");

app.use(logger("tiny"));
app.use(express.static(__dirname + "/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    let fix = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, fix);
  },
});

let upload = multer({ storage });

app.post("/up", upload.single("ufile"), (req, res) => {
  // 파일업로드 후 알람창 뜨고 뒤로가기 나오는거
  console.log(req.file);
  res.send(`<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>파일 업로드 성공</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    />
  </head>
  <body>
    <!-- 모달 시작 -->
    <div
      class="modal fade"
      id="successModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">파일 전송 완료</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onclick="window.location.href='/'"
            ></button>
          </div>
          <div class="modal-body">파일이 정상적으로 전송되었습니다!</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              onclick="history.back()"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 끝 -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var myModal = new bootstrap.Modal(
          document.getElementById("successModal"),
          {
            backdrop: "static",
          }
        );
        myModal.show();
      });
    </script>
  </body>
</html>
`);
});

app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(files);
  });
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  res.download(filePath);
});

app.listen(port, () => {
  console.log(`파일서버동작 http://localhost:${port}`);
});
