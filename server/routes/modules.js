const express = require('express');
const ModuleController = require('../controllers/ModuleController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], ModuleController.getCount);
router.get('', [verifyToken], ModuleController.getAll);
router.get('/:id', [verifyToken], ModuleController.getOne);
router.post('', [verifyToken], ModuleController.create);
router.put('/:id', [verifyToken], ModuleController.update);
router.delete('/:id', [verifyToken], ModuleController.deleteOne);

module.exports = router;
