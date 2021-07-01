const express = require("express");

const {
  posterFetch,
  posterDelete,
  posterCreate,
  posterUpdate,
} = require("./controllers");
const router = express.Router();

//Routes
router.get("/", posterFetch);

//Delete Route
router.delete("/:posterId", posterDelete);

//Create Route
router.post("/", posterCreate);

//Update Route
router.put("/:posterId", posterUpdate);

module.exports = router;
