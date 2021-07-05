const slugify = require("slugify");
const { Poster } = require("../../db/models");

exports.posterFetch = async (req, res) => {
  try {
    const posters = await Poster.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(posters);
  } catch (error) {
    res.status(500);
  }
};

exports.posterDelete = (req, res) => {
  const { posterId } = req.params;
  const foundPoster = posters.find((poster) => poster.id === +posterId);
  if (foundPoster) {
    posters = posters.filter((poster) => poster.id !== +posterId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Poster not Found." });
  }
};

exports.posterCreate = (req, res) => {
  const id = posters.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newPoster = {
    id,
    slug,
    ...req.body,
  };
  posters.push(newPoster);
  res.status(201).json(newPoster);
};

exports.posterUpdate = (req, res) => {
  const { posterId } = req.params;
  const foundPoster = posters.find((poster) => poster.id === +posterId);
  if (foundPoster) {
    for (const key in req.body) foundPoster[key] = req.body[key];
    foundPoster.slug = slugify(foundPoster.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Poster not Found." });
  }
};
