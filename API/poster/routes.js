const express = require("express");

const {
  posterFetch,
  posterDelete,
  posterCreate,
  posterUpdate,
} = require("./controllers");

const multer = require("multer");

const router = express.Router();

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

//Parameter
router.param("posterId", async (req, res, next, posterId) => {
  const poster = await posterFetch(posterId, next);
  if (poster) {
    req.poster = poster;
    next();
  } else {
    const error = new Error("Poster Not Found");
    error.status = 404;
    next(error);
  }
});

//Routes
router.get("/", posterFetch);

//Delete Route
router.delete("/:posterId", posterDelete);

//Create Route
router.post("/", upload.single("image"), posterCreate);

//Update Route
router.put("/:posterId", upload.single("image"), posterUpdate);

module.exports = router;
