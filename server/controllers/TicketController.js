const { Ticket } = require('../models');
const ticketMethods = require('../services/tickets');

class TicketController {
  /**
   * It creates a new ticket if the name doesn't already exist
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A JSON object with the response from the database
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const ticket = await ticketMethods.getByParam('name', name);
      if (ticket.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }
      const response = await ticketMethods.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the tickets from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns An array of all the tickets in the database.
   */
  static async getAll(req, res) {
    try {
      const response = await ticketMethods.getAll();
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It gets a ticket by its id
   * @param req - The request object.
   * @param res - The response object.
   * @returns The name of the ticket with the id that was passed in the params.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await ticketMethods.getById(id);
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a ticket from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;
    try {
      const ticket = await ticketMethods.getById(id);
      if (ticket.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await ticketMethods.delById(id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It finds a ticket by its id, updates it with the new data, and returns the updated ticket
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
      const service = await ticketMethods.getById(id);
      if (service.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await ticketMethods.update(body, id);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of tickets in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The quantity of tickets in the database.
   */
  static async getCount(req, res) {
    const response = await Ticket.count();
    return res.status(200).json({ response });
  }
}

module.exports = TicketController;
