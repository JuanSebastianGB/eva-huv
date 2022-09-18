const { Student } = require('../models');
const { ClassRoom } = require('../models');
// const { StudentClassRoom } = require('../models');

class StudentController {
  static async getAll(req, res) {
    try {
      // const students = await Student.findAll();
      const students = await Student.findAll({
        include: [ClassRoom],
      });
      return res.status(200).json({ students });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }
}

export default StudentController;
