const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.User);
      Note.belongsTo(models.Device);

      Note.hasMany(models.SparePartNeed);
    }
  }
  Note.init(
    {
      description: DataTypes.STRING,
      file: DataTypes.STRING,
      deviceId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      noteDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Note',
    }
  );
  return Note;
};
