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
    const foundStore = await Store.findOne({
      where: { userId: req.user.id },
    });
    if (foundStore) {
      const err = new Error("You already created Store!");
      err.status = 400;
      return next(err);
    }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newStore = await Store.create(req.body);
    res.status(201).json(newStore);
  } catch (error) {
    next(error);
  }
};

//Create poster
exports.createPoster = async (req, res, next) => {
  try {
    if (req.user.id === req.store.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.storeId = req.store.id;
      const newPoster = await Poster.create(req.body);
      res.status(201).json(newPoster);
    } else {
      const err = new Error("Unauthorized|!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

//Delete
exports.deleteStore = async (req, res, next) => {
  try {
    await req.store.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
