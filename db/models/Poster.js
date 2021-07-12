const sequelizeSlugify = require("sequelize-Slugify");

module.exports = (sequelize, DataTypes) => {
  const Poster = sequelize.define("Poster", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
      defaultValue: 4,
    },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
    },
  });

  sequelizeSlugify.slugifyModel(Poster, { source: ["name"] });
  return Poster;
};
