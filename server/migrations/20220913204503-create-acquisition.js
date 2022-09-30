module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Acquisitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },
      providerId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Providers' },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      acquisitionDate: {
        type: Sequelize.DATE,
      },
      acquisitionTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'AcquisitionTypes' },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      externUrl: {
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
    await queryInterface.dropTable('Acquisitions');
  },
};
