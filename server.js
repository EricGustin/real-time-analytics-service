const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

let numOfPosts = 0;

app.get("/pagehits", async (req, res) => {
  try {
    // get the current page hits from postgreSQL
    const allData = await pool.query("SELECT * FROM pagedata");
    const pageHits = allData.rows[0]["pagehits"]

    // update the pagehits column... should this be in its own app.put function?
    await pool.query("UPDATE pagedata SET pagehits = $1", [pageHits+1]);

    // Display the new number of page hits
    res.send("Page hits: " + (pageHits+1));
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html');
});

app.put("/", async (req, res) => {
  try {
    const pageHits = 0;
    const updatePageHits = await pool.query("UPDATE pagedata SET pagehits = $1", [pageHits]);
    res.json("Updated Page Hits!");
  } catch (err) {
    console.log(err.message);
  }
})

app.post("/", (req, res) => {
  numOfPosts++;
  res.send("Total number of POST requests: " + numOfPosts);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});