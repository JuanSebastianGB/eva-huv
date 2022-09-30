const { Device, Technology } = require('../models');

exports.getAll = async () => {
  const result = await Technology.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Technology.findAll({
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
  const result = await Technology.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Technology.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Technology.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Technology.create(body);
  return response;
};
