/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require('express');
const fs = require('fs');
const AppController = require('../controllers/AppController');
const FileController = require('../controllers/FileController');
// const verifyToken = require('../middlewares/authJwt');

const router = express.Router();

const ACTUAL_DIR_NAME = __dirname;

/**
 * Given a file name, return the file name without the extension.
 * @param fileName - The name of the file to be processed.
 */
const cleanFileName = (fileName) => fileName.split('.').shift();

/* Reading the files in the current directory and then requiring them. */
const dirFileNames = fs.readdirSync(ACTUAL_DIR_NAME);
dirFileNames.map((file) => {
  const cleanFile = cleanFileName(file);
  if (cleanFile !== 'index') {
    const routerParent = `/${cleanFile}`;
    const routerChild = require(`./${file}`);
    router.use(routerParent, routerChild);
  }
  return true;
});

// router.get('/email', MailController.emailEndpoint);

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

module.exports = router;
