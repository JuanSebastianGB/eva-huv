const express = require('express');
const TechnologyController = require('../controllers/TechnologyController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], TechnologyController.getCount);
router.get('', [verifyToken], TechnologyController.getAll);
router.get('/:id', [verifyToken], TechnologyController.getOne);
router.post('', [verifyToken], TechnologyController.create);
router.put('/:id', [verifyToken], TechnologyController.update);
router.delete('/:id', [verifyToken], TechnologyController.deleteOne);

module.exports = router;
