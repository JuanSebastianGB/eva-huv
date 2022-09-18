const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.Device);
      Ticket.belongsTo(models.TicketStatus);

      Ticket.hasMany(models.SparePartNeed);
    }
  }
  Ticket.init(
    {
      name: DataTypes.STRING,
      reporterId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      ticketStatusId: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
      ticketFile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ticket',
    }
  );
  return Ticket;
};
