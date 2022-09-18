module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Areas',
      [
        {
          serviceId: 1,
          name: 'Cirugia Hombres',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serviceId: 1,
          name: 'Cirugia mujeres',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serviceId: 2,
          name: 'Uci 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serviceId: 2,
          name: 'Uci neurocirugia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Areas', null, {});
  },
};
