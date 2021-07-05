const sequelizeSlugify = require("sequelize-Slugify");

module.exports = (sequelize, DataTypes) => {
  const Poster = sequelize.define("Poster", {
    name: { type: DataTypes.STRING, allowNull: false },
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
      unique: true,
    },
  });

  sequelizeSlugify.slugifyModel(Poster, { source: ["name"] });
  return Poster;
};
