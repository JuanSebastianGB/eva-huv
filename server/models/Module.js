const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Module.belongsToMany(models.User, {
        through: models.UserModule,
      });
    }
  }
  Module.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Module',
    }
  );
  return Module;
};