module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Users' },
          key: 'id',
        },
      },
      noteDate: {
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
    await queryInterface.dropTable('Notes');
  },
};
