const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");

let pageHits = 0;

app.get("/", (req, res) => {
  pageHits++;
  res.send("page hits: " + pageHits);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});