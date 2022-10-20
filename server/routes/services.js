const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], ServiceController.getCount);
router.get('', ServiceController.getAll);
// router.get('', [verifyToken], ServiceController.getAll);
router.get('/:id', ServiceController.getOne);
// router.get('/:id', [verifyToken], ServiceController.getOne);
// router.post('', [verifyToken], ServiceController.create);
router.post('', ServiceController.create);
// router.put('/:id', [verifyToken], ServiceController.update);
router.put('/:id', ServiceController.update);
router.delete('/:id', ServiceController.deleteOne);
// router.delete('/:id', [verifyToken], ServiceController.deleteOne);

module.exports = router;
