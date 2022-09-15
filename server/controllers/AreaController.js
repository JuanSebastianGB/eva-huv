const { Area } = require('../models');
const { Service } = require('../models');

class AreaController {
  /**
   * It creates a new area if the name doesn't already exist
   * @param req - The request object. This contains information about the HTTP request that raised the
   * event.
   * @param res - The response object.
   * @returns The area is being returned.
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const area = await Area.findAll({ where: { name } });
      if (area.length > 0)
        return res.status(400).json({ err: 'Already exists' });

      const response = await Area.create(req.body);
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It's a function that returns a JSON object of all the areas in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns All the areas in the database.
   */
  static async getAll(req, res) {
    try {
      const area = await Area.findAll({
        include: [{ model: Service }],
        attributes: ['name'],
      });
      return res.status(200).json(area);
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * This function is used to get a single area from the database
   * @param req - The request object.
   * @param res - The response object.
   */
  static async getOne(req, res) {
    const { id } = req.params;
    try {
      const area = await Area.findAll({ where: { id }, attributes: ['name'] });
      if (!area) return res.status(401).json({ err: 'Not Found' });
      return res.status(200).json({ area: area[0] });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It deletes a row from the database based on the id passed in the request
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;

    try {
      const area = await Area.findAll({ where: { id } });
      if (area.length === 0) return res.status(401).json({ err: 'Not Found' });
      const response = await Area.destroy({ where: { id } });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }

  /**
   * It finds an area by its id, and if it exists, it updates it with the new data
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async update(req, res) {
    const { id } = req.params;
    try {
      const area = await Area.findAll({ where: { id } });

      if (area.length === 0) return res.status(401).json({ err: 'Not Found' });
      const response = await Area.update(req.body, { where: { id } });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(401).json({ err });
    }
  }
}

export default AreaController;
