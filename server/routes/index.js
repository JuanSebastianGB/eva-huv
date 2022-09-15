import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UserController';
import AreaController from '../controllers/AreaController';

const router = express.Router();

router.get('/', (req, res) => res.json({ input: 'input point' }));
router.get('/status', AppController.getStatus);
router.get('/random', AppController.randomNumber);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.post('/signup', AuthController.signUp);

router.post('/users', UsersController.postNew);
router.get('/users', UsersController.getAll);
router.get('/users/:email', UsersController.getOne);

router.get('/areas', AreaController.getAll);
router.get('/areas/:id', AreaController.getOne);
router.post('/areas', AreaController.create);
router.delete('/areas/:id', AreaController.deleteOne);

export default router;
