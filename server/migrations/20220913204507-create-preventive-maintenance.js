module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PreventiveMaintenances', {
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
      preventiveMaintenanceDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('PreventiveMaintenances');
  },
};
