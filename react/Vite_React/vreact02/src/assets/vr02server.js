const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "\\vreact02\\dist"));

app.post("/data", (req, res) => {
  const { username, password } = req.body;
});

app.get("/api", (req, res) => {
  res.send("내가 서버에서 너에게 보낸다.");
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
