module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ClassRooms',
      [
        {
          name: 'Mathematics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Science',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'English',
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
