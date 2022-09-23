module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      oldCode: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      serial: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      acquisitionDate: {
        type: Sequelize.DATE,
      },
      installationDate: {
        type: Sequelize.DATE,
      },
      warehouseReceiptDate: {
        type: Sequelize.DATE,
      },
      manufacturingDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      serviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Services' },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      areaId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Services' },
          key: 'id',
        },
        allowNull: true,
      },
      guideId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Guides' },
          key: 'id',
        },
        allowNull: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Owners' },
          key: 'id',
        },
        allowNull: true,
      },
      finalDispositionId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'FinalDispositions' },
          key: 'id',
        },
        allowNull: true,
      },
      riskTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'RiskTypes' },
          key: 'id',
        },
        allowNull: true,
      },
      biomedicalClassificationId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'BiomedicalClassifications' },
          key: 'id',
        },
        allowNull: true,
      },
      deviceStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'DeviceStatuses' },
          key: 'id',
        },
        allowNull: true,
      },
      deviceTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'DeviceTypes' },
          key: 'id',
        },
        allowNull: true,
      },
      technologyId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Technologies' },
          key: 'id',
        },
        allowNull: true,
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
    await queryInterface.dropTable('Devices');
  },
};
