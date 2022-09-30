const { Acquisition } = require('../models');
const acquisitionMethods = require('../services/acquisitions');

class AcquisitionController {
  /**
   * It creates a new acquisition if the code doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { code } = req.body;
    if (!code) res.status(400).json({ err: 'missing code' });
    try {
      const acquisition = await acquisitionMethods.getByParam('code', code);
      if (acquisition.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await acquisitionMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the acquisitions from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the acquisitions in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await acquisitionMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a acquisition by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The code of the acquisition with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await acquisitionMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a acquisition from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const acquisition = await acquisitionMethods.getById(id);
      if (acquisition.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await acquisitionMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a acquisition by its id, updates it with the new data,
   * and returns the updated acquisition
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
      const acquisition = await acquisitionMethods.getById(id);
      if (acquisition.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await acquisitionMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of acquisitions in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of acquisitions in the database.
   */
  static async getCount(req, res) {
    const response = await Acquisition.count();
    return res.status(200).json({ response });
  }
}

module.exports = AcquisitionController;
