const { FileType } = require('../models');
const fileTypeMethods = require('../services/filetypes');

class FileTypeController {
  /**
   * It creates a new fileType if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const fileType = await fileTypeMethods.getByParam('name', name);
      if (fileType.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await fileTypeMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the fileTypes from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the fileTypes in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await fileTypeMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a fileType by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the fileType with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await fileTypeMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a fileType from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const fileType = await fileTypeMethods.getById(id);
      if (fileType.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await fileTypeMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a fileType by its id, updates it with the new data,
   * and returns the updated fileType
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
      const fileType = await fileTypeMethods.getById(id);
      if (fileType.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await fileTypeMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of fileTypes in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of fileTypes in the database.
   */
  static async getCount(req, res) {
    const response = await FileType.count();
    return res.status(200).json({ response });
  }
}

module.exports = FileTypeController;
