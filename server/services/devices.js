const {
  Acquisition,
  Area,
  Device,
  DeviceStatus,
  DeviceType,
  Guide,
  Owner,
  Service,
} = require('../models');

exports.getAll = async () => {
  const result = await Device.findAll({
    include: [
      Area,
      Acquisition,
      DeviceStatus,
      DeviceType,
      Owner,
      Service,
      Guide,
    ],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Device.findAll({
    where: { id },
    include: [
      Area,
      Acquisition,
      DeviceStatus,
      DeviceType,
      Guide,
      Owner,
      Service,
    ],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Device.findAll({
    where: condition,
    include: [
      Area,
      Acquisition,
      DeviceStatus,
      DeviceType,
      Guide,
      Owner,
      Service,
    ],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Device.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Device.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Device.create(body);
  return response;
};
