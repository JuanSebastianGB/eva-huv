const express = require('express');
const NoteController = require('../controllers/NoteController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], NoteController.getCount);
router.get('', [verifyToken], NoteController.getAll);
router.get('/:id', [verifyToken], NoteController.getOne);
router.post('', [verifyToken], NoteController.create);
router.put('/:id', [verifyToken], NoteController.update);
router.delete('/:id', [verifyToken], NoteController.deleteOne);

module.exports = router;
