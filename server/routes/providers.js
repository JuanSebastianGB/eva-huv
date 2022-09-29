const express = require('express');
const ProviderController = require('../controllers/ProviderController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], ProviderController.getCount);
router.get('', [verifyToken], ProviderController.getAll);
router.get('/:id', [verifyToken], ProviderController.getOne);
router.post('', [verifyToken], ProviderController.create);
router.put('/:id', [verifyToken], ProviderController.update);
router.delete('/:id', [verifyToken], ProviderController.deleteOne);

module.exports = router;
