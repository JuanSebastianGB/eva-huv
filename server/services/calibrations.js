const { Device, Calibration } = require('../models');

exports.getAll = async () => {
  const result = await Calibration.findAll({
    include: [Device],
    attributes: ['code', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await Calibration.findAll({
    where: { id },
    include: [Device],
    attributes: ['code', 'id'],
  });
  return result;
};
exports.getByParam = async (param, searched) => {
  const condition = {
    [param]: searched,
  };
  const result = await Calibration.findAll({
    where: condition,
    include: [Device],
    attributes: ['code', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await Calibration.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await Calibration.update(body, { where: { id } });
  return response;
};
exports.create = async (body) => {
  const response = await Calibration.create(body);
  return response;
};
