const express = require('express');
const AcquisitionController = require('../controllers/AcquisitionController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], AcquisitionController.getCount);
router.get('', [verifyToken], AcquisitionController.getAll);
router.get('/:id', [verifyToken], AcquisitionController.getOne);
router.post('', [verifyToken], AcquisitionController.create);
router.put('/:id', [verifyToken], AcquisitionController.update);
router.delete('/:id', [verifyToken], AcquisitionController.deleteOne);

module.exports = router;
