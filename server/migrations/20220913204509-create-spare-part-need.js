module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SparePartNeeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      preventiveMaintenanceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'PreventiveMaintenances' },
          key: 'id',
        },
      },
      ticketId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Tickets' },
          key: 'id',
        },
      },
      noteId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Notes' },
          key: 'id',
        },
      },
      correctiveMaintenanceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'CorrectiveMaintenances' },
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
    await queryInterface.dropTable('SparePartNeeds');
  },
};
