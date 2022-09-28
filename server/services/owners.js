const { Device, Owner } = require('../models');

exports.getAll = async () => {
  const result = await Owner.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Owner.findAll({
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
  const result = await Owner.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Owner.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Owner.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Owner.create(body);
  return response;
};
