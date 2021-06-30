const express = require("express");
let posters = require("./posters");
const cors = require("cors");
const { json } = require("express");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.get("/posters", (req, res) => {
  //JSON
  res.json(posters);
});

//Delete Route
app.delete("/posters/:posterId", (req, res) => {
  const { posterId } = req.params;
  const foundPoster = posters.find((poster) => poster.id === +posterId);
  if (foundPoster) {
    posters = posters.filter((poster) => poster.id !== +posterId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Poster not Found." });
  }
});

//Create Route
app.post("/posters", (req, res) => {
  const posterId = posters.length + 1;
  const posterSlug = slugify(req.body.name, { lower: true });
  const newPoster = {
    id: posterId,
    slug: posterSlug,
    ...req.body,
  };
  posters.push(newPoster);
  res.status(201).json(newPoster);
});

app.listen(8000, () => {
  console.log("The application is running on location :8000");
});
