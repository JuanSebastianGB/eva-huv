const { Area, Device, Service } = require('../models');

exports.getAll = async () => {
  const result = await Area.findAll({
    include: [Device, Service],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Area.findAll({
    where: { id },
    include: [Device, Service],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Area.findAll({
    where: condition,
    include: [Device, Service],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Area.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Area.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Area.create(body);
  return response;
};
