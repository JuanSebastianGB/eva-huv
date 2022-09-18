import multer from 'multer';
import makeMulterConfig from '../utils/files';

class FileController {
  /**
   * It returns a middleware function that uploads a single file to the server
   * @param [dirName=uploads] - The name of the directory you want to upload the file to.
   * @param [myFile=myFile] - The name of the file you want to upload.
   * @returns A function that takes in a request and a response.
   */
  static uploadFile(dirName = 'uploads', myFile = 'myFile') {
    const storage = makeMulterConfig(dirName);
    const upload = multer({ storage });
    return upload.single(myFile);
  }
}

export default FileController;
