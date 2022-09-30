const multer = require('multer');
const { File } = require('../models');
const fileMethods = require('../services/files');
const makeMulterConfig = require('../utils/files');

class FileController {
  /**
   * It creates a new file if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const file = await fileMethods.getByParam('name', name);
      if (file.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await fileMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the files from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the files in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await fileMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a file by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the file with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await fileMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a file from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const file = await fileMethods.getById(id);
      if (file.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await fileMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a file by its id, updates it with the new data,
   * and returns the updated file
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async update(req, res) {
    let { id } = req.params;
    const { body } = req;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const file = await fileMethods.getById(id);
      if (file.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await fileMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of files in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of files in the database.
   */
  static async getCount(req, res) {
    const response = await File.count();
    return res.status(200).json({ response });
  }

  /**
   * It returns a middleware function that uploads a single file to the server
   * @param [dirName=uploads] - The name of the directory you want to upload the file to.
   * @param [myFile=myFile] - The name of the file you want to upload.
   * @returns A function that takes in a request and a response.
   */
  static uploadFile(dirName = 'uploads', myFile = 'myFile') {
    const storage = makeMulterConfig(dirName);
    const upload = multer({ storage });
    return upload.single(myFile);
  }
}

module.exports = FileController;
