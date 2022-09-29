const { Provider } = require('../models');
const providerMethods = require('../services/providers');

class ProviderController {
  /**
   * It creates a new provider if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const provider = await providerMethods.getByParam('name', name);
      if (provider.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await providerMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the providers from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the providers in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await providerMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a provider by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the provider with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await providerMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a provider from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const provider = await providerMethods.getById(id);
      if (provider.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await providerMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a provider by its id, updates it with the new data, and returns the updated provider
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
      const provider = await providerMethods.getById(id);
      if (provider.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await providerMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of providers in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of providers in the database.
   */
  static async getCount(req, res) {
    const response = await Provider.count();
    return res.status(200).json({ response });
  }
}

module.exports = ProviderController;
