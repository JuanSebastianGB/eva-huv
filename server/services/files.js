const { Device, File, FileType } = require('../models');

exports.getAll = async () => {
  const result = await File.findAll({
    include: [Device, FileType],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await File.findAll({
    where: { id },
    include: [Device, FileType],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await File.findAll({
    where: condition,
    include: [Device, FileType],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await File.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await File.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await File.create(body);
  return response;
};
