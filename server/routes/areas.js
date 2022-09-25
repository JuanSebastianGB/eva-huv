const express = require('express');
const AreaController = require('../controllers/AreaController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], AreaController.getCount);
router.get('', [verifyToken], AreaController.getAll);
router.get('/:id', [verifyToken], AreaController.getOne);
router.post('', [verifyToken], AreaController.create);
router.put('/:id', [verifyToken], AreaController.update);
router.delete('/:id', [verifyToken], AreaController.deleteOne);

module.exports = router;
