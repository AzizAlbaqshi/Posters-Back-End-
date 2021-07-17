const express = require("express");
const multer = require("multer");
const {
  storeFetch,
  createStore,
  createPoster,
  fetchStore,
} = require("./controllers");

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
router.param("storeId", async (req, res, next, storeId) => {
  const store = await fetchStore(storeId, next);
  if (store) {
    req.store = store;
    next();
  } else {
    const error = new Error("store Not Found");
    error.status = 404;
    next(error);
  }
});

//Routes
router.get("/", storeFetch);

//Create Route
router.post("/", upload.single("image"), createStore);

//create poster
router.post("/:storeId/posters", upload.single("image"), createPoster);

module.exports = router;
