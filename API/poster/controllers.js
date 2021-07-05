const slugify = require("slugify");
const { Poster } = require("../../db/models");

exports.posterFetch = async (req, res) => {
  try {
    const posters = await Poster.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(posters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.posterDelete = async (req, res) => {
  const { posterId } = req.params;
  try {
    const foundPoster = await Poster.findByPk(posterId);
    if (foundPoster) {
      await foundPoster.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Poster not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.posterCreate = async (req, res) => {
  try {
    const newPoster = await Poster.create(req.body);

    res.status(201).json(newPoster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.posterUpdate = async (req, res) => {
  const { posterId } = req.params;
  try {
    const foundPoster = await Poster.findByPk(posterId);
    if (foundPoster) {
      await foundPoster.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Poster not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
