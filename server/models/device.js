'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.Plan);
      Device.hasMany(models.Note);
    }
  }
  Device.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      code: DataTypes.STRING,
      oldCode: DataTypes.STRING,
      model: DataTypes.STRING,
      serial: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      location: DataTypes.STRING,
      acquisitionDate: DataTypes.DATE,
      installationDate: DataTypes.DATE,
      warehouseReceiptDate: DataTypes.DATE,
      manufacturingDate: DataTypes.DATE,
      status: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      areaId: DataTypes.STRING,
      manualId: DataTypes.INTEGER,
      guideId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      finalDispositionId: DataTypes.INTEGER,
      riskTypeId: DataTypes.INTEGER,
      biomedicalClassificationId: DataTypes.INTEGER,
      deviceStatusId: DataTypes.INTEGER,
      deviceTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Device',
    }
  );
  return Device;
};
