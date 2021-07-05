const express = require("express");
const cors = require("cors");
const { json } = require("express");
const bodyParser = require("body-parser");
const posterRoutes = require("./API/poster/routes");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/posters", posterRoutes);
const db = require("./db/models");

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
