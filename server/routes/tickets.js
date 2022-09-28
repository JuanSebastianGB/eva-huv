const express = require('express');
const TicketController = require('../controllers/TicketController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('/count', [verifyToken], TicketController.getCount);
router.get('', [verifyToken], TicketController.getAll);
router.get('/:id', [verifyToken], TicketController.getOne);
router.post('', [verifyToken], TicketController.create);
router.put('/:id', [verifyToken], TicketController.update);
router.delete('/:id', [verifyToken], TicketController.deleteOne);

module.exports = router;
