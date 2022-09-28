const { Guide } = require('../models');
const guideMethods = require('../services/guides');

class GuideController {
  /**
   * It creates a new guide if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const guide = await guideMethods.getByParam('name', name);
      if (guide.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await guideMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the guides from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the guides in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await guideMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a guide by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the guide with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await guideMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a guide from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const guide = await guideMethods.getById(id);
      if (guide.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await guideMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a guide by its id, updates it with the new data, and returns the updated guide
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
      const service = await guideMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await guideMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of guides in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of guides in the database.
   */
  static async getCount(req, res) {
    const response = await Guide.count();
    return res.status(200).json({ response });
  }
}

module.exports = GuideController;
