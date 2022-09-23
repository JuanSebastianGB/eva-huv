const { Device, Service } = require('../models');

class DeviceController {
  /**
   * It creates a new device in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns - A device object with the name and id
   */
  static async create(req, res) {
    const { name } = req.body;
    if (!name) res.status(400).json({ err: 'missing name' });
    try {
      const device = await Device.findAll({ where: { name } });
      if (device.length > 0) {
        return res.status(400).json({ err: 'Already exists' });
      }

      const response = await Device.create(req.body);
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * This function is used to get all the devices from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async getAll(req, res) {
    try {
      const response = await Device.findAll({
        include: [Service],
        attributes: ['name', 'id'],
      });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It takes the id from the request params, parses it to a number, and then uses that id to find a
   * device in the database. If it finds a device, it returns it.
   * If it doesn't find a device, it returns an error
   * @param req - The request object.
   * @param res - The response object.
   * @returns The device with the id that was passed in the request.
   */
  static async getOne(req, res) {
    let { id } = req.params;
    id = parseFloat(id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ err: 'id must be a number' });
    }
    try {
      const response = await Device.findAll({
        where: { id },
        attributes: ['name', 'id'],
        include: [Service],
      });
      if (!response) return res.status(400).json({ err: 'Not Found' });
      return res.status(200).json({ response: response[0] });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It deletes a device from the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async deleteOne(req, res) {
    const { id } = req.params;

    try {
      const device = await Device.findAll({ where: { id } });
      if (device.length === 0) {
        return res.status(400).json({ err: 'Not Found' });
      }
      const response = await Device.destroy({ where: { id } });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It updates a device in the database
   * @param req - The request object.
   * @param res - The response object.
   * @returns The response is being returned.
   */
  static async update(req, res) {
    const { id } = req.params;
    const { serviceId } = req.body;

    try {
      const area = await Device.findAll({ where: { id } });
      if (area.length === 0) return res.status(400).json({ err: 'Not Found' });

      if (serviceId) {
        const service = await Service.findAll({ where: { id: serviceId } });
        if (service.length === 0) {
          return res.status(400).json({ err: "service doesn't exists" });
        }
      }

      const response = await Device.update(req.body, { where: { id } });
      return res.status(201).json({ response });
    } catch (err) {
      return res.status(400).json({ err });
    }
  }

  /**
   * It returns the number of devices in the database.
   * @param req - The request object.
   * @param res - The response object.
   * @returns The number of devices in the database.
   */
  static async getCount(req, res) {
    const response = await Device.count();
    console.log(req.userId);
    return res.status(200).json({ response });
  }
}

module.exports = DeviceController;
