const express = require('express');
const StudentController = require('../controllers/StudentController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('', [verifyToken], StudentController.getAll);

module.exports = router;
