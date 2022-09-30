const { File, FileType } = require('../models');

exports.getAll = async () => {
  const result = await FileType.findAll({
    include: [File],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await FileType.findAll({
    where: { id },
    include: [File],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await FileType.findAll({
    where: condition,
    include: [File],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await FileType.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await FileType.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await FileType.create(body);
  return response;
};
