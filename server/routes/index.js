import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => res.json({ input: 'input point' }));
router.get('/status', AppController.getStatus);
router.get('/random', AppController.randomNumber);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

router.post('/users', UsersController.postNew);
router.get('/users', UsersController.getAll);
router.get('/users/:email', UsersController.getOne);

export default router;
