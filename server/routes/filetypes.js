const express = require('express');
const FileTypeController = require('../controllers/FileTypeController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], FileTypeController.getCount);
router.get('', [verifyToken], FileTypeController.getAll);
router.get('/:id', [verifyToken], FileTypeController.getOne);
router.post('', [verifyToken], FileTypeController.create);
router.put('/:id', [verifyToken], FileTypeController.update);
router.delete('/:id', [verifyToken], FileTypeController.deleteOne);

module.exports = router;
