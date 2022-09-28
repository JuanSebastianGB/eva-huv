const { Device, Ticket } = require('../models');

exports.getAll = async () => {
  const result = await Ticket.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Ticket.findAll({
    where: { id },
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Ticket.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Ticket.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Ticket.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Ticket.create(body);
  return response;
};
