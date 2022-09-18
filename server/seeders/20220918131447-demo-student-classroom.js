module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'StudentClassRooms',
      [
        {
          studentId: 1,
          classRoomId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          studentId: 1,
          classRoomId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          studentId: 3,
          classRoomId: 2,
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
