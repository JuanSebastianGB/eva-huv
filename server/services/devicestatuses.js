const { Device, DeviceStatus } = require('../models');

exports.getAll = async () => {
  const result = await DeviceStatus.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await DeviceStatus.findAll({
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
  const result = await DeviceStatus.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await DeviceStatus.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await DeviceStatus.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await DeviceStatus.create(body);
  return response;
};
