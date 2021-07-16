const { Poster } = require("../../db/models");

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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(posters);
  } catch (error) {
    next(error);
  }
};

//Delete
exports.deletePoster = async (req, res, next) => {
  try {
    await req.poster.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//Update
exports.updatePoster = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    await req.poster.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//Create
exports.createPoster = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newPoster = await Poster.create(req.body);
    res.status(201).json(newPoster);
  } catch (error) {
    next(error);
  }
};
