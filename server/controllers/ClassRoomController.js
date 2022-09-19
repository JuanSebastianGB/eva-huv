const { ClassRoom, Student } = require('../models');

class ClassRoomController {
  /**
   * It gets all the class rooms and their students
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of classRooms with their students
   */
  static async getAll(req, res) {
    try {
      const classRooms = await ClassRoom.findAll({ include: [Student] });
      return res.status(200).json({ classRooms });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }
}
module.exports = ClassRoomController;
