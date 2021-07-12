const slugify = require("slugify");
const { Poster } = require("../../db/models");

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
exports.posterDelete = async (req, res, next) => {
  try {
    await req.poster.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//Create
exports.posterCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newPoster = await Poster.create(req.body);
    res.status(201).json(newPoster);
  } catch (error) {
    next(error);
  }
};

//Update
exports.posterUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    await req.poster.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
