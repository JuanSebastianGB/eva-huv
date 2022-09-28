const { Owner } = require('../models');
const ownerMethods = require('../services/owners');

class OwnerController {
  /**
   * It creates a new owner if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const owner = await ownerMethods.getByParam('name', name);
      if (owner.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await ownerMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the owners from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the owners in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await ownerMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a owner by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the owner with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await ownerMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a owner from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const owner = await ownerMethods.getById(id);
      if (owner.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await ownerMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a owner by its id, updates it with the new data, and returns the updated owner
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
      const service = await ownerMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await ownerMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of owners in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of owners in the database.
   */
  static async getCount(req, res) {
    const response = await Owner.count();
    return res.status(200).json({ response });
  }
}

module.exports = OwnerController;
