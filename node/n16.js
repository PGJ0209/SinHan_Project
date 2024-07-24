const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("morgan");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/html");
app.use(logger("tiny"));
app.use("/", express.static(_path));

app.get("/data", (req, res) => {
  const title = req.query.title;
  const content = req.query.content;
  console.log(title, content);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
