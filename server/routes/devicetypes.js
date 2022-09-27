const express = require('express');
const DeviceTypeController = require('../controllers/DeviceTypeController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], DeviceTypeController.getCount);
router.get('', [verifyToken], DeviceTypeController.getAll);
router.get('/:id', [verifyToken], DeviceTypeController.getOne);
router.post('', [verifyToken], DeviceTypeController.create);
router.put('/:id', [verifyToken], DeviceTypeController.update);
router.delete('/:id', [verifyToken], DeviceTypeController.deleteOne);

module.exports = router;
