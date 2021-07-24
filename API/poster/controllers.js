const { Poster, Store } = require("../../db/models");

exports.fetchPoster = async (posterId, next) => {
  try {
    const poster = await Poster.findByPk(posterId);
    return poster;
  } catch (error) {
    next(error);
  }
};

//Fetch
exports.posterFetch = async (req, res, next) => {
  try {
    const posters = await Poster.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "storeId"] },
      include: {
        model: Store,
        as: "store",
        attributes: ["name"],
      },
    });
    res.json(posters);
  } catch (error) {
    next(error);
  }
};

//Delete
exports.deletePoster = async (req, res, next) => {
  const foundStore = await Store.findByPk(req.poster.posterId);
  try {
    if (foundStore.userId === req.user.id) {
      await req.poster.destroy();
      res.status(204).end(); // no content
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

//Update
exports.updatePoster = async (req, res, next) => {
  const foundStore = await Store.findByPk(req.poster.storeId);
  try {
    if (foundStore.userId === req.user.id) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const updatedPoster = await req.poster.update(req.body);
      res.json(updatedPoster);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
