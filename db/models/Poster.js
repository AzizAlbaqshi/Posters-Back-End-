module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Poster", {
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
};
