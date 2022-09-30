const { Device, User, Note } = require('../models');

exports.getAll = async () => {
  const result = await Note.findAll({
    include: [Device, User],
    attributes: ['description', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Note.findAll({
    where: { id },
    include: [Device, User],
    attributes: ['description', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Note.findAll({
    where: condition,
    include: [Device, User],
    attributes: ['description', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Note.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Note.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Note.create(body);
  return response;
};
