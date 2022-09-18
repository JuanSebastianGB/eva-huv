module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentClassRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Students' },
          key: 'id',
        },
      },
      classRoomId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'ClassRooms' },
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
    await queryInterface.dropTable('StudentClassRooms');
  },
};
