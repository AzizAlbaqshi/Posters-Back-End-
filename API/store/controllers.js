const { Store, Poster } = require("../../db/models");
const { posterFetch } = require("../poster/controllers");

exports.fetchStore = async (storeId, next) => {
  try {
    const store = await Store.findByPk(storeId);
    return store;
  } catch (error) {
    next(error);
  }
};

//Fetch
exports.storeFetch = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Poster,
        as: "posters",
        attributes: ["id"],
      },
    });
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

//Create store
exports.createStore = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newStore = await Store.create(req.body);
    res.status(201).json(newStore);
  } catch (error) {
    next(error);
  }
};

//Create poster
exports.createPoster = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.storeId = req.store.id;
    const newPoster = await Poster.create(req.body);
    res.status(201).json(newPoster);
  } catch (error) {
    next(error);
  }
};
