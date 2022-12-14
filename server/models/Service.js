const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(models.Area);
      Service.hasMany(models.Device);
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  return Service;
};
