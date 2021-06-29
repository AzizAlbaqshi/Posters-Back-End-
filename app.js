const express = require("express");
const posters = require("./posters");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());

//Routes
app.get("/posters", (req, res) => {
  //JSON
  res.json(posters);
});

app.listen(8000, () => {
  console.log("The application is running on location :8000");
});
