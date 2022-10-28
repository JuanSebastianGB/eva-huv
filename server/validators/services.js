const { check } = require('express-validator');
const { validateResults } = require('../utils/validateResults');

const validatorCreateService = [
  check('name').exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorCreateService };
