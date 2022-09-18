const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FileType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FileType.hasMany(models.File);
    }
  }
  FileType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'FileType',
    }
  );
  return FileType;
};
