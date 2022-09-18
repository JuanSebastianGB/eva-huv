const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BiomedicalClassification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BiomedicalClassification.hasMany(models.Device);
    }
  }
  BiomedicalClassification.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'BiomedicalClassification',
    }
  );
  return BiomedicalClassification;
};
