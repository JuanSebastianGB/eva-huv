const multer = require('multer');

/**
 * It takes a directory name as an argument and returns a multer storage
 * object that will save files to that directory
 * @param dirName - The directory where the file will be saved.
 * @returns A function that takes in a dirName and returns an object with a storage property.
 */
const makeMulterConfig = (dirName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dirName),
    filename: (req, file, cb) => {
      console.log(file);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  return storage;
};

module.exports = makeMulterConfig;
