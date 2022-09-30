const { Calibration } = require('../models');
const calibrationMethods = require('../services/calibrations');

class CalibrationController {
  /**
   * It creates a new calibration if the code doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { code } = req.body;
    if (!code) res.status(400).json({ err: 'missing code' });
    try {
      const calibration = await calibrationMethods.getByParam('code', code);
      if (calibration.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await calibrationMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the calibrations from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the calibrations in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await calibrationMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a calibration by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The code of the calibration with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await calibrationMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a calibration from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const calibration = await calibrationMethods.getById(id);
      if (calibration.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await calibrationMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a calibration by its id, updates it with the new data,
   * and returns the updated calibration
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
      const calibration = await calibrationMethods.getById(id);
      if (calibration.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await calibrationMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of calibrations in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of calibrations in the database.
   */
  static async getCount(req, res) {
    const response = await Calibration.count();
    return res.status(200).json({ response });
  }
}

module.exports = CalibrationController;
