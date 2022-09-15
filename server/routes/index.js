import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UserController';
import AreaController from '../controllers/AreaController';
import ServiceController from '../controllers/ServiceController';

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
router.put('/areas/:id', AreaController.update);
router.delete('/areas/:id', AreaController.deleteOne);

router.get('/services', ServiceController.getAll);
router.get('/services/:id', ServiceController.getOne);
router.post('/services', ServiceController.create);
router.delete('/services/:id', ServiceController.deleteOne);

export default router;
