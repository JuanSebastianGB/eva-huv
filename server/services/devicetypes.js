const { Device, DeviceType } = require('../models');

exports.getAll = async () => {
  const result = await DeviceType.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await DeviceType.findAll({
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
  const result = await DeviceType.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await DeviceType.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await DeviceType.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await DeviceType.create(body);
  return response;
};
