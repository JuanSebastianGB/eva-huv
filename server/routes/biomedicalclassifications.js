const express = require('express');
const BiomedicalClassificationController = require('../controllers/BiomedicalClassificationController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get(
  '/count',
  [verifyToken],
  BiomedicalClassificationController.getCount
);
router.get('', [verifyToken], BiomedicalClassificationController.getAll);
router.get('/:id', [verifyToken], BiomedicalClassificationController.getOne);
router.post('', [verifyToken], BiomedicalClassificationController.create);
router.put('/:id', [verifyToken], BiomedicalClassificationController.update);
router.delete(
  '/:id',
  [verifyToken],
  BiomedicalClassificationController.deleteOne
);

module.exports = router;
