const { CorrectiveMaintenance, Acquisition, Provider } = require('../models');

exports.getAll = async () => {
  const result = await Provider.findAll({
    include: [CorrectiveMaintenance, Acquisition],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Provider.findAll({
    where: { id },
    include: [CorrectiveMaintenance, Acquisition],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Provider.findAll({
    where: condition,
    include: [CorrectiveMaintenance, Acquisition],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Provider.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Provider.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Provider.create(body);
  return response;
};
