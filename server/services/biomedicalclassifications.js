const { Device, BiomedicalClassification } = require('../models');

exports.getAll = async () => {
  const result = await BiomedicalClassification.findAll({
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.getById = async (id) => {
  const result = await BiomedicalClassification.findAll({
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
  const result = await BiomedicalClassification.findAll({
    where: condition,
    include: [Device],
    attributes: ['name', 'id'],
  });
  return result;
};
exports.delById = async (id) => {
  const result = await BiomedicalClassification.destroy({ where: { id } });
  return result;
};
exports.update = async (body, id) => {
  const response = await BiomedicalClassification.update(body, {
    where: { id },
  });
  return response;
};
exports.create = async (body) => {
  const response = await BiomedicalClassification.create(body);
  return response;
};
