require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

const css = path.resolve("node_modules/bootstrap/dist/css");

app.use("/css", express.static(css));
app.use(express.static(path.resolve("static")));

app.get("/api/:date?", (req, res) => {
  let str = req.params.date;
  let date = str == null ? new Date() : Number(str) > 0 ? new Date(Number(str)) : new Date(str);
  if (date == "Invalid Date") res.json({ error: "Invalid Date" });
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`listening on port:${port}`);
});
