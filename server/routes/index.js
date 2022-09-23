const express = require('express');
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UserController');
const AreaController = require('../controllers/AreaController');
const ServiceController = require('../controllers/ServiceController');
const DeviceController = require('../controllers/DeviceController');
const FileController = require('../controllers/FileController');
const StudentController = require('../controllers/StudentController');
const ClassRoomController = require('../controllers/ClassRoomController');
const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

/** Many To Many implementation */
router.get('/students', [verifyToken], StudentController.getAll);
router.get('/classrooms', ClassRoomController.getAll);

router.post(
  '/upload',
  FileController.uploadFile('uploads'),
  (req, res, next) => {
    const response = req.file;
    res.status(200).json({ response });
    next();
  }
);

router.get('/', (req, res) => res.json({ input: 'input point' }));
router.get('/status', AppController.getStatus);
router.get('/random', AppController.randomNumber);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/permissions', AuthController.getPermission);
router.post('/signup', AuthController.signUp);

router.post('/users', UsersController.postNew);
router.get('/users', UsersController.getAll);
router.get('/users/:email', UsersController.getOne);

router.get('/areas/count', [verifyToken], AreaController.getCount);
router.get('/areas', [verifyToken], AreaController.getAll);
router.get('/areas/:id', [verifyToken], AreaController.getOne);
router.post('/areas', [verifyToken], AreaController.create);
router.put('/areas/:id', [verifyToken], AreaController.update);
router.delete('/areas/:id', [verifyToken], AreaController.deleteOne);

router.get('/services/count', [verifyToken], ServiceController.getCount);
router.get('/services', [verifyToken], ServiceController.getAll);
router.get('/services/:id', [verifyToken], ServiceController.getOne);
router.post('/services', [verifyToken], ServiceController.create);
router.put('/services/:id', [verifyToken], ServiceController.update);
router.delete('/services/:id', [verifyToken], ServiceController.deleteOne);

router.get('/devices/count', [verifyToken], DeviceController.getCount);
router.get('/devices', [verifyToken], DeviceController.getAll);
router.get('/devices/:id', [verifyToken], DeviceController.getOne);
router.post('/devices', [verifyToken], DeviceController.create);
router.put('/devices/:id', [verifyToken], DeviceController.update);
router.delete('/devices/:id', [verifyToken], DeviceController.deleteOne);
module.exports = router;
