'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          name: 'Hospitalizacion Cirugia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Unidad de terapia intensiva',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
