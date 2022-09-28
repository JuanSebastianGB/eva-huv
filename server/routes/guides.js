const express = require('express');
const GuideController = require('../controllers/GuideController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], GuideController.getCount);
router.get('', [verifyToken], GuideController.getAll);
router.get('/:id', [verifyToken], GuideController.getOne);
router.post('', [verifyToken], GuideController.create);
router.put('/:id', [verifyToken], GuideController.update);
router.delete('/:id', [verifyToken], GuideController.deleteOne);

module.exports = router;
