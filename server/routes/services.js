const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], ServiceController.getCount);
router.get('', [verifyToken], ServiceController.getAll);
router.get('/:id', [verifyToken], ServiceController.getOne);
router.post('', [verifyToken], ServiceController.create);
router.put('/:id', [verifyToken], ServiceController.update);
router.delete('/:id', [verifyToken], ServiceController.deleteOne);

module.exports = router;
