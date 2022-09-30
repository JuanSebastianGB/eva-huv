const { Module, User } = require('../models');

exports.getAll = async () => {
  const result = await Module.findAll({
    include: [User],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Module.findAll({
    where: { id },
    include: [User],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Module.findAll({
    where: condition,
    include: [User],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Module.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Module.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Module.create(body);
  return response;
};
