'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      oldCode: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      serial: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      acquisitionDate: {
        type: Sequelize.DATE
      },
      installationDate: {
        type: Sequelize.DATE
      },
      warehouseReceiptDate: {
        type: Sequelize.DATE
      },
      manufacturingDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      serviceId: {
        type: Sequelize.INTEGER
      },
      areaId: {
        type: Sequelize.STRING
      },
      manualId: {
        type: Sequelize.INTEGER
      },
      guideId: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      finalDispositionId: {
        type: Sequelize.INTEGER
      },
      riskTypeId: {
        type: Sequelize.INTEGER
      },
      biomedicalClassificationId: {
        type: Sequelize.INTEGER
      },
      deviceStatusId: {
        type: Sequelize.INTEGER
      },
      deviceTypeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};