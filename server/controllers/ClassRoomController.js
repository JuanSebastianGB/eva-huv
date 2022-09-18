const { ClassRoom, Student } = require('../models');

class ClassRoomController {
  static async getAll(req, res) {
    try {
      const classRooms = await ClassRoom.findAll({ include: [Student] });
      return res.status(200).json({ classRooms });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }
}
export default ClassRoomController;
