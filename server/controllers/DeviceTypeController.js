const { Service } = require('../models');
const deviceTypeMethods = require('../services/devicetypes');

class DeviceTypeController {
  /**
   * It creates a new device type
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A function that takes in a request and response object
   *   - The function will create a new device type
   *   - The function will return a 201 status code if successful
   *   - The function will return a 400 status code if unsuccessful
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const service = await deviceTypeMethods.getByParam('name', name);
      if (service.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await deviceTypeMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It's a static method that's called getAll, it's an async function that takes in a request and a
   * response, and it tries to get all the device types from the
   * database. If it succeeds, it returns a
   * 200 status code and the response. If it fails, it returns a 400 status code and the error
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response from the database.
   */
  static async getAll(req, res) {
    try {
      const response = await deviceTypeMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It takes in a request and a response, and returns
   * a response with the device type with the given id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned as a JSON object.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await deviceTypeMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a device type by id.
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response from the database.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const service = await deviceTypeMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await deviceTypeMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It takes the id of the device type to be updated,
   * and the body of the request, which contains the
   * new values for the device type. It then updates the device type with the new values
   * @param req - The request object.
   * @param res - The response object.
   */
  static async update(req, res) {
    let { id } = req.params;
    const { body } = req;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const service = await deviceTypeMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await deviceTypeMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It's a static function that returns a promise that resolves to the number of documents in the
   * database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async getCount(req, res) {
    const response = await Service.count();
    return res.status(200).json({ response });
  }
}

module.exports = DeviceTypeController;
