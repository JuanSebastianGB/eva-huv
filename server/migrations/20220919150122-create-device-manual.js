module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeviceManuals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Devices' },
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      manualId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Manuals' },
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('DeviceManuals');
  },
};
