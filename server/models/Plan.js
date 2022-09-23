const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plan.belongsTo(models.Contract);
    }
  }
  Plan.init(
    {
      scheduledDate: DataTypes.DATE,
      contractId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plan',
    }
  );
  return Plan;
};
