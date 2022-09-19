const { Student, ClassRoom } = require('../models');

class StudentController {
  /**
   * It gets all the students from the database and returns them in the response
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all students and their associated classrooms.
   */
  static async getAll(req, res) {
    try {
      const students = await Student.findAll({
        include: [ClassRoom],
      });
      return res.status(200).json({ students });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }
}

module.exports = StudentController;
