const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SparePartNeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SparePartNeed.belongsTo(models.CorrectiveMaintenance);
      SparePartNeed.belongsTo(models.Note);
      SparePartNeed.belongsTo(models.PreventiveMaintenance);
      SparePartNeed.belongsTo(models.Ticket);
    }
  }
  SparePartNeed.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      preventiveMaintenanceId: DataTypes.INTEGER,
      ticketId: DataTypes.INTEGER,
      noteId: DataTypes.INTEGER,
      correctiveMaintenanceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SparePartNeed',
    }
  );
  return SparePartNeed;
};
