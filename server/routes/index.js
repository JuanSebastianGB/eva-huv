import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UserController';
import AreaController from '../controllers/AreaController';
import ServiceController from '../controllers/ServiceController';

import { verifyToken } from '../middlewares/authJwt';

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

// router.get('/areas', [verifyToken], AreaController.getAll);
router.get('/areas', AreaController.getAll);
router.get('/areas/:id', [verifyToken], AreaController.getOne);
router.post('/areas', [verifyToken], AreaController.create);
router.put('/areas/:id', [verifyToken], AreaController.update);
router.delete('/areas/:id', [verifyToken], AreaController.deleteOne);

router.get('/services', [verifyToken], ServiceController.getAll);
router.get('/services/:id', [verifyToken], ServiceController.getOne);
router.post('/services', [verifyToken], ServiceController.create);
router.put('/services/:id', [verifyToken], ServiceController.update);
router.delete('/services/:id', [verifyToken], ServiceController.deleteOne);

export default router;
