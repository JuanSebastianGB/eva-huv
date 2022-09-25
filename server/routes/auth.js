const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/permissions', AuthController.getPermission);
router.post('/signup', AuthController.signUp);

module.exports = router;
