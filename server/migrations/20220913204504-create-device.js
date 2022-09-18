'use strict';
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
        allowNull: false,
      },
      areaId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Services' },
          key: 'id',
        },
        defaultValue: 0,
      },
      manualId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Manuals' },
          key: 'id',
        },
        defaultValue: 0,
      },
      guideId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Guides' },
          key: 'id',
        },
        defaultValue: 0,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Owners' },
          key: 'id',
        },
      },
      finalDispositionId: {
        type: Sequelize.INTEGER,
      },
      riskTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'RiskTypes' },
          key: 'id',
        },
      },
      biomedicalClassificationId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'BiomedicalClassifications' },
          key: 'id',
        },
      },
      deviceStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'DeviceStatuses' },
          key: 'id',
        },
      },
      deviceTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'DeviceTypes' },
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
    await queryInterface.dropTable('Devices');
  },
};
