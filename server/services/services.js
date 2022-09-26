const { Area, Device, Service } = require('../models');

exports.getAll = async () => {
  const result = await Service.findAll({
    include: [Area, Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Service.findAll({
    where: { id },
    include: [Area, Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Service.findAll({
    where: condition,
    include: [Area, Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Service.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Service.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Service.create(body);
  return response;
};
