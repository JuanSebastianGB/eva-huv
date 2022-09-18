module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Calibrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },
      deviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Devices' },
          key: 'id',
        },
      },
      calibrationDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Calibrations');
  },
};
