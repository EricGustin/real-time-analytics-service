const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const pool = require("./db");
const { path } = require("d3-path");

// middleware
app.use(cors());
app.use(express.json());

let numOfPosts = 0;

app.get("/events", async (req, res) => {
  try {
     // get the current page hits from postgreSQL
     const allData = await pool.query("SELECT * FROM events");

     res.json(allData.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/events", async (req, res) => {
  try {
    // Insert new Page_Hit event into the events table
    await pool.query("INSERT INTO events(event_name, time_stamp) VALUES ('Page_Hit', current_timestamp)");
  } catch (err) {
    console.log(err.message);
  }
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html');
});

app.get('/graph', function(req, res){
  res.sendFile(__dirname + '/graph.html');
})

app.get('/graph/*', function(req, res){
  const user_id = req.url.split('/').pop();
  res.sendFile(__dirname + '/graph.html');
})

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
