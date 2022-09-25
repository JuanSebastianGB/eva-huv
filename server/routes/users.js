const express = require('express');
const UsersController = require('../controllers/UserController');

const router = express.Router();

router.post('', UsersController.postNew);
router.get('/', UsersController.getAll);
router.get('/:email', UsersController.getOne);

module.exports = router;
