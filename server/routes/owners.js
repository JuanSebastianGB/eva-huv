const express = require('express');
const OwnerController = require('../controllers/OwnerController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], OwnerController.getCount);
router.get('', [verifyToken], OwnerController.getAll);
router.get('/:id', [verifyToken], OwnerController.getOne);
router.post('', [verifyToken], OwnerController.create);
router.put('/:id', [verifyToken], OwnerController.update);
router.delete('/:id', [verifyToken], OwnerController.deleteOne);

module.exports = router;
