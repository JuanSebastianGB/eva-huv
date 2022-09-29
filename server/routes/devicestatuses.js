const express = require('express');
const DeviceStatusController = require('../controllers/DeviceStatusController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], DeviceStatusController.getCount);
router.get('', [verifyToken], DeviceStatusController.getAll);
router.get('/:id', [verifyToken], DeviceStatusController.getOne);
router.post('', [verifyToken], DeviceStatusController.create);
router.put('/:id', [verifyToken], DeviceStatusController.update);
router.delete('/:id', [verifyToken], DeviceStatusController.deleteOne);

module.exports = router;
