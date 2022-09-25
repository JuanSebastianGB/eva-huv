const express = require('express');
const ClassRoomController = require('../controllers/ClassRoomController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

router.get('', [verifyToken], ClassRoomController.getAll);

module.exports = router;
