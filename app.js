const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const posterRoutes = require("./API/poster/routes");
const db = require("./db/models");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("TEST MIDDLEWARE");
  next();
});

// Poster Routes
app.use("/posters", posterRoutes);

// static method will save medias as a files
app.use("/media", express.static("media"));

// ERROR Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

//path Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
