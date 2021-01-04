const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json())

let pageHits = 0;
let numOfPosts = 0

app.get("/", (req, res) => {
  pageHits++;
  res.send("page hits: " + pageHits);
});

app.post("/", (req, res) => {
  numOfPosts++;
  res.send("Total number of POST requests: " + numOfPosts);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});