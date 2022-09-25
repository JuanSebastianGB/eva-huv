const express = require('express');
const DeviceController = require('../controllers/DeviceController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], DeviceController.getCount);
router.get('', [verifyToken], DeviceController.getAll);
router.get('/:id', [verifyToken], DeviceController.getOne);
router.post('', [verifyToken], DeviceController.create);
router.put('/:id', [verifyToken], DeviceController.update);
router.delete('/:id', [verifyToken], DeviceController.deleteOne);

module.exports = router;
