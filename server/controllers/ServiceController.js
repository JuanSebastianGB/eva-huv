const { Service, Area } = require('../models');

class ServiceController {
  /**
   * It creates a new service if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const service = await Service.findAll({ where: { name } });
      if (service.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }

      const response = await Service.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * This function is used to get all the services from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the services in the database.
   */
  static async getAll(req, res) {
    try {
      const service = await Service.findAll({
        include: [{ model: Area }],
        attributes: ['name'],
      });
      return res.status(200).json(service);
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It gets a service by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the service with the id that was passed in the params.
   */
  static async getOne(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.findAll({
        where: { id },
        include: [{ model: Area }],
        attributes: ['name'],
      });
      if (!service) return res.status(401).json({ err: 'Not Found' });
      return res.status(200).json({ service: service[0] });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It deletes a service from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;

    try {
      const service = await Service.findAll({ where: { id } });
      if (service.length === 0) {
        return res.status(401).json({ err: 'Not Found' });
      }
      const response = await Service.destroy({ where: { id } });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It finds a service by its id, updates it with the new data, and returns the updated service
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async update(req, res) {
    const { id } = req.params;

    try {
      const service = await Service.findAll({ where: { id } });
      if (service.length === 0) {
        return res.status(401).json({ err: 'Not Found' });
      }
      const response = await Service.update(req.body, { where: { id } });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It returns the number of services in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of services in the database.
   */
  static async getCount(req, res) {
    const quantity = await Service.count();
    return res.status(200).json({ quantity });
  }
}

module.exports = ServiceController;
