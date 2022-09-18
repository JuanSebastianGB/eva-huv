const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClassRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ClassRoom.belongsToMany(models.Student, {
        through: models.StudentClassRoom,
      });
    }
  }
  ClassRoom.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ClassRoom',
    }
  );
  return ClassRoom;
};
