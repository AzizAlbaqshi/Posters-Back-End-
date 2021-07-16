const express = require("express"); //import express from express

const {
  posterFetch,
  updatePoster,
  deletePoster,
  createPoster,
  fetchPoster,
} = require("./controllers");

const multer = require("multer");
const router = express.Router(); // import router method from express

//Parameter
router.param("posterId", async (req, res, next, posterId) => {
  const poster = await fetchPoster(posterId, next);
  if (poster) {
    req.poster = poster;
    next();
  } else {
    const error = new Error("Poster Not Found");
    error.status = 404;
    next(error);
  }
});

//multer
const storage = multer.diskStorage({
  destination: "./media", //path from app.js not from routes
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

//Fetch Route
router.get("/", posterFetch);

//Delete Route
router.delete("/:posterId", deletePoster);

//Update Route
router.put("/:posterId", upload.single("image"), updatePoster);

//create
router.post("/", upload.single("image"), createPoster);

module.exports = router;
