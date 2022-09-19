module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Modules',
      [
        {
          name: 'Area',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Calibration',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Device',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Guide',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Service',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};
