const { Provider, Device, AcquisitionType, Acquisition } = require('../models');

exports.getAll = async () => {
  const result = await Acquisition.findAll({
    include: [Provider, Device, AcquisitionType],
    attributes: ['code', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Acquisition.findAll({
    where: { id },
    include: [Provider, Device, AcquisitionType],
    attributes: ['code', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Acquisition.findAll({
    where: condition,
    include: [Provider, Device, AcquisitionType],
    attributes: ['code', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Acquisition.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Acquisition.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Acquisition.create(body);
  return response;
};
