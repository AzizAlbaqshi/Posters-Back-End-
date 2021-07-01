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
app.listen(8000, () => {
  console.log("The application is running on location :8000");
});
