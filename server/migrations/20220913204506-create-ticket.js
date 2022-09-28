module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      reporterId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Users' },
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      ticketStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'TicketStatuses' },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      deviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Devices' },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      ticketFile: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Tickets');
  },
};
