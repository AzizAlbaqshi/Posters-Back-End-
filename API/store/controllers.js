const { Store, Poster } = require("../../db/models");

//Fetch
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
    });
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

//Create
exports.storeCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newStore = await Store.create(req.body);
    res.status(201).json(newStore);
  } catch (error) {
    next(error);
  }
};
