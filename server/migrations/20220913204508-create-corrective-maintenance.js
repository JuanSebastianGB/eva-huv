'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CorrectiveMaintenances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reportDate: {
        type: Sequelize.DATE,
      },
      deadLineDate: {
        type: Sequelize.DATE,
      },
      deviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Devices' },
          key: 'id',
        },
      },
      providerId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Providers' },
          key: 'id',
        },
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
    await queryInterface.dropTable('CorrectiveMaintenances');
  },
};
