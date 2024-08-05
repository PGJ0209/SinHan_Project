const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const _path = path.join(__dirname, "/build/");

// app.get("/", (req, res) => {
//   res.sendFile(_path);
// });

app.use("/", express.static(_path));

app.listen(port, () => {
  console.log(`파일서버동작 http://localhost:${port}`);
});
