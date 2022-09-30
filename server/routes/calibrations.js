const express = require('express');
const CalibrationController = require('../controllers/CalibrationController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], CalibrationController.getCount);
router.get('', [verifyToken], CalibrationController.getAll);
router.get('/:id', [verifyToken], CalibrationController.getOne);
router.post('', [verifyToken], CalibrationController.create);
router.put('/:id', [verifyToken], CalibrationController.update);
router.delete('/:id', [verifyToken], CalibrationController.deleteOne);

module.exports = router;
