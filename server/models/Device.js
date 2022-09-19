const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.belongsTo(models.Area);
      Device.belongsTo(models.BiomedicalClassification);
      Device.belongsTo(models.DeviceStatus);
      Device.belongsTo(models.DeviceType);
      Device.belongsTo(models.FinalDisposition);
      Device.belongsTo(models.Guide);
      Device.belongsTo(models.Owner);
      Device.belongsTo(models.Plan);
      Device.belongsTo(models.RiskType);
      Device.belongsTo(models.Technology);

      Device.hasMany(models.Calibration);
      Device.hasMany(models.CorrectiveMaintenance);
      Device.hasMany(models.File);
      Device.hasMany(models.Note);
      Device.hasMany(models.Ticket);

      Device.belongsToMany(models.Manual, {
        through: models.DeviceManual,
      });
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
      areaId: DataTypes.INTEGER,
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
