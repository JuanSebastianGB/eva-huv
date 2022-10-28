const { matchedData } = require('express-validator');
const { Service } = require('../models');
const serviceMethods = require('../services/services');
const { handleHttpError } = require('../utils/handleHttpError');

class ServiceController {
  /**
   * It creates a new service if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    try {
      const validatedRequest = matchedData(req);
      const { name } = validatedRequest;
      const service = await serviceMethods.getByParam('name', name);
      if (service.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await serviceMethods.create(validatedRequest);
      return res.status(201).json({ response });
    } catch (err) {
      return handleHttpError(res, 'ERROR_CREATE_SERVICE');
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
      const response = await serviceMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a service by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the service with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await serviceMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
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
      const service = await serviceMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await serviceMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a service by its id, updates it with the new data, and returns the updated service
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
      const service = await serviceMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await serviceMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of services in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of services in the database.
   */
  static async getCount(req, res) {
    const response = await Service.count();
    return res.status(200).json({ response });
  }
}

module.exports = ServiceController;
