const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentClassRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  StudentClassRoom.init(
    {
      studentId: DataTypes.INTEGER,
      classRoomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'StudentClassRoom',
    }
  );
  return StudentClassRoom;
};
