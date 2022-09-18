module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Students',
      [
        {
          name: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sebastian',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Aura',
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
