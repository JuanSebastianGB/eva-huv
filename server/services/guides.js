const { Device, Guide } = require('../models');

exports.getAll = async () => {
  const result = await Guide.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Guide.findAll({
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
  const result = await Guide.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Guide.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Guide.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Guide.create(body);
  return response;
};
