'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserModules',
      [
        {
          moduleId: 1,
          userId: 1,
          read: true,
          update: true,
          delete: true,
          create: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleId: 2,
          userId: 1,
          read: true,
          update: true,
          delete: true,
          create: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
