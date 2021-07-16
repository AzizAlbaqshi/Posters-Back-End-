const sequelizeSlugify = require("sequelize-Slugify");

module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  sequelizeSlugify.slugifyModel(Store, { source: ["name"] });
  return Store;
};
