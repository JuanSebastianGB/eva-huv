const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Acquisition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Acquisition.belongsTo(models.Provider);
      Acquisition.belongsTo(models.AcquisitionType);
    }
  }
  Acquisition.init(
    {
      code: DataTypes.STRING,
      file: DataTypes.STRING,
      providerId: DataTypes.INTEGER,
      acquisitionDate: DataTypes.DATE,
      acquisitionTypeId: DataTypes.INTEGER,
      externUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Acquisition',
    }
  );
  return Acquisition;
};
